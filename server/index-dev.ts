import express from 'express';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { createServer as createViteServer } from 'vite';

const app = express();
app.use(express.json({ limit: '10mb' }));

app.use('/attached_assets', express.static(path.join(process.cwd(), 'attached_assets')));

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
});

app.post('/dev/save-json', (req, res) => {
  try {
    const { filename, data } = req.body;
    if (!filename || data === undefined) {
      return res.status(400).json({ error: 'filename and data are required' });
    }
    const safeName = path.basename(filename);
    if (!safeName.endsWith('.json')) {
      return res.status(400).json({ error: 'Only .json files allowed' });
    }
    const filePath = path.join(process.cwd(), 'client/public/data', safeName);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    res.json({ success: true });
  } catch (error) {
    console.error('Save JSON error:', error);
    res.status(500).json({ error: 'Failed to save JSON' });
  }
});

app.post('/dev/upload', upload.single('file'), (req, res) => {
  try {
    const file = req.file;
    const category = req.body.category || 'misc';
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const allowedCategories = ['members', 'news', 'hero', 'programs'];
    const safeCategory = allowedCategories.includes(category) ? category : 'misc';
    const uploadDir = path.join(process.cwd(), 'client/public/uploads', safeCategory);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    const baseName = path.basename(file.originalname, path.extname(file.originalname)).replace(/[^a-zA-Z0-9._-]/g, '_');
    const finalName = `${baseName}_${Date.now()}.webp`;
    const filePath = path.join(uploadDir, finalName);
    fs.writeFileSync(filePath, file.buffer);
    res.json({ success: true, path: `/uploads/${safeCategory}/${finalName}` });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

app.delete('/dev/upload', (req, res) => {
  try {
    const { filePath } = req.body;
    if (!filePath || typeof filePath !== 'string') {
      return res.status(400).json({ error: 'filePath is required' });
    }
    if (!filePath.startsWith('/uploads/')) {
      return res.status(400).json({ error: 'Can only delete files in /uploads/' });
    }
    const fullPath = path.join(process.cwd(), 'client/public', filePath);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
    res.json({ success: true });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Failed to delete file' });
  }
});

async function startServer() {
  const vite = await createViteServer({
    mode: 'development',
    server: { middlewareMode: true },
    appType: 'spa',
  });

  app.use(vite.middlewares);

  app.listen(5000, '0.0.0.0', () => {
    console.log('Dev server running on http://localhost:5000');
  });
}

startServer();
