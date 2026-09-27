import { promises as fs } from "node:fs";
import type { IncomingMessage, ServerResponse } from "node:http";
import path from "node:path";
import multer from "multer";
import type { Plugin } from "vite";

const MAX_REQUEST_BYTES = 10 * 1024 * 1024;
const JSON_FILES = new Set([
  "members.json",
  "news.json",
  "heroImages.json",
  "programs.json",
]);
const UPLOAD_CATEGORIES = new Set(["members", "news", "hero", "programs"]);
const IMAGE_EXTENSIONS: Record<string, string> = {
  "image/avif": ".avif",
  "image/gif": ".gif",
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
};

function sendJson(res: ServerResponse, status: number, payload: unknown) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(payload));
}

async function readJsonBody(req: IncomingMessage): Promise<Record<string, unknown>> {
  const chunks: Buffer[] = [];
  let size = 0;

  for await (const chunk of req) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    size += buffer.length;
    if (size > MAX_REQUEST_BYTES) {
      throw new Error("Request body is too large");
    }
    chunks.push(buffer);
  }

  const parsed = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error("Expected a JSON object");
  }
  return parsed as Record<string, unknown>;
}

function hasLocalOrigin(req: IncomingMessage) {
  const origin = req.headers.origin;
  if (!origin) return true;

  try {
    const hostname = new URL(origin).hostname;
    return hostname === "127.0.0.1" || hostname === "localhost" || hostname === "[::1]";
  } catch {
    return false;
  }
}

export function localAdminPlugin(): Plugin {
  const clientPublic = path.resolve(import.meta.dirname, "client", "public");
  const dataDirectory = path.join(clientPublic, "data");
  const uploadsDirectory = path.join(clientPublic, "uploads");
  const receiveUpload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: MAX_REQUEST_BYTES, files: 1 },
    fileFilter: (_req, file, callback) => {
      callback(null, Object.hasOwn(IMAGE_EXTENSIONS, file.mimetype));
    },
  }).single("file");

  return {
    name: "local-admin-api",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const pathname = new URL(req.url ?? "/", "http://127.0.0.1").pathname;
        if (!pathname.startsWith("/dev/")) {
          next();
          return;
        }

        if (!hasLocalOrigin(req)) {
          sendJson(res, 403, { error: "The local editor only accepts local requests" });
          return;
        }

        try {
          if (pathname === "/dev/admin-status" && req.method === "GET") {
            sendJson(res, 200, { local: true, writable: true });
            return;
          }

          if (pathname === "/dev/save-json" && req.method === "POST") {
            const body = await readJsonBody(req);
            const filename = body.filename;
            if (typeof filename !== "string" || !JSON_FILES.has(filename) || !("data" in body)) {
              sendJson(res, 400, { error: "Invalid content file" });
              return;
            }

            await fs.mkdir(dataDirectory, { recursive: true });
            const destination = path.join(dataDirectory, filename);
            const temporary = `${destination}.${process.pid}.${Date.now()}.tmp`;
            await fs.writeFile(temporary, `${JSON.stringify(body.data, null, 2)}\n`, "utf8");
            await fs.rename(temporary, destination);
            sendJson(res, 200, { success: true, filename });
            return;
          }

          if (pathname === "/dev/upload" && req.method === "POST") {
            receiveUpload(req as never, res as never, async (error: unknown) => {
              if (error) {
                sendJson(res, 400, { error: error instanceof Error ? error.message : "Upload failed" });
                return;
              }

              try {
                const request = req as IncomingMessage & {
                  body?: { category?: string };
                  file?: Express.Multer.File;
                };
                const category = request.body?.category;
                const file = request.file;
                if (!category || !UPLOAD_CATEGORIES.has(category) || !file) {
                  sendJson(res, 400, { error: "Choose a valid category and image" });
                  return;
                }

                const extension = IMAGE_EXTENSIONS[file.mimetype];
                const originalBase = path.parse(file.originalname).name;
                const safeBase = originalBase
                  .replace(/[^a-zA-Z0-9_-]+/g, "-")
                  .replace(/^-+|-+$/g, "")
                  .slice(0, 60) || "image";
                const directory = path.join(uploadsDirectory, category);
                const filename = `${safeBase}_${Date.now()}${extension}`;
                await fs.mkdir(directory, { recursive: true });
                await fs.writeFile(path.join(directory, filename), file.buffer);
                sendJson(res, 200, {
                  success: true,
                  path: `/uploads/${category}/${filename}`,
                });
              } catch (uploadError) {
                server.config.logger.error(String(uploadError));
                sendJson(res, 500, { error: "Could not save the image" });
              }
            });
            return;
          }

          if (pathname === "/dev/upload" && req.method === "DELETE") {
            const body = await readJsonBody(req);
            const filePath = body.filePath;
            if (typeof filePath !== "string" || !filePath.startsWith("/uploads/")) {
              sendJson(res, 400, { error: "Invalid upload path" });
              return;
            }

            const relativePath = filePath.slice("/uploads/".length).replaceAll("/", path.sep);
            const destination = path.resolve(uploadsDirectory, relativePath);
            const insideUploads = destination.startsWith(`${path.resolve(uploadsDirectory)}${path.sep}`);
            if (!insideUploads) {
              sendJson(res, 400, { error: "Invalid upload path" });
              return;
            }

            await fs.unlink(destination).catch((error: NodeJS.ErrnoException) => {
              if (error.code !== "ENOENT") throw error;
            });
            sendJson(res, 200, { success: true });
            return;
          }

          sendJson(res, 405, { error: "Unsupported local editor request" });
        } catch (error) {
          server.config.logger.error(String(error));
          const message = error instanceof SyntaxError ? "Invalid JSON" : "Local editor request failed";
          sendJson(res, 400, { error: message });
        }
      });
    },
  };
}
