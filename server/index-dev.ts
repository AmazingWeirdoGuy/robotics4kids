import express from 'express';
import fs from 'fs';
import path from 'path';
import { createServer as createViteServer } from 'vite';

const app = express();
app.use(express.json({ limit: '10mb' }));

app.use('/attached_assets', express.static(path.join(process.cwd(), 'attached_assets')));

app.get('/api/admin/news', (req, res) => {
  try {
    const filePath = path.join(process.cwd(), 'client/src/data/newsData.ts');
    const content = fs.readFileSync(filePath, 'utf-8');
    res.json({ content });
  } catch (error) {
    res.status(500).json({ error: 'Failed to read news data' });
  }
});

app.post('/api/admin/news', (req, res) => {
  try {
    const { content } = req.body;
    const filePath = path.join(process.cwd(), 'client/src/data/newsData.ts');
    fs.writeFileSync(filePath, content, 'utf-8');
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save news data' });
  }
});

app.get('/api/admin/team', (req, res) => {
  try {
    const filePath = path.join(process.cwd(), 'client/src/pages/About.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');
    res.json({ content });
  } catch (error) {
    res.status(500).json({ error: 'Failed to read team data' });
  }
});

app.post('/api/admin/team', (req, res) => {
  try {
    const { content } = req.body;
    const filePath = path.join(process.cwd(), 'client/src/pages/About.tsx');
    fs.writeFileSync(filePath, content, 'utf-8');
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save team data' });
  }
});

app.post('/api/admin/upload', (req, res) => {
  try {
    const { filename, data } = req.body;
    const assetsDir = path.join(process.cwd(), 'attached_assets');
    if (!fs.existsSync(assetsDir)) {
      fs.mkdirSync(assetsDir, { recursive: true });
    }
    const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
    const timestamp = Date.now();
    const ext = path.extname(safeName);
    const base = path.basename(safeName, ext);
    const finalName = `${base}_${timestamp}${ext}`;
    const filePath = path.join(assetsDir, finalName);
    const base64Data = data.replace(/^data:image\/\w+;base64,/, '');
    fs.writeFileSync(filePath, base64Data, 'base64');
    res.json({ success: true, path: `/attached_assets/${finalName}` });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

app.get('/api/admin/images', (req, res) => {
  try {
    const assetsDir = path.join(process.cwd(), 'attached_assets');
    if (!fs.existsSync(assetsDir)) {
      return res.json({ images: [] });
    }
    const files = fs.readdirSync(assetsDir)
      .filter(f => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(f))
      .map(f => `/attached_assets/${f}`);
    res.json({ images: files });
  } catch (error) {
    res.status(500).json({ error: 'Failed to list images' });
  }
});

app.get('/api/admin/check', (req, res) => {
  const isReplit = !!process.env.REPL_ID || !!process.env.REPLIT_DEV_DOMAIN;
  res.json({ isReplit, canEdit: isReplit });
});

async function startServer() {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });

  app.use(vite.middlewares);

  app.listen(5000, '0.0.0.0', () => {
    console.log('Server running on http://localhost:5000');
  });
}

startServer();
