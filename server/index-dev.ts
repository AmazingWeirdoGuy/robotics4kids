import express from 'express';
import fs from 'fs';
import path from 'path';
import { createServer as createViteServer } from 'vite';

const app = express();
app.use(express.json());

// API endpoint to get news data
app.get('/api/admin/news', (req, res) => {
  try {
    const filePath = path.join(process.cwd(), 'client/src/data/newsData.ts');
    const content = fs.readFileSync(filePath, 'utf-8');
    res.json({ content });
  } catch (error) {
    res.status(500).json({ error: 'Failed to read news data' });
  }
});

// API endpoint to save news data
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

// API endpoint to get team data from About.tsx
app.get('/api/admin/team', (req, res) => {
  try {
    const filePath = path.join(process.cwd(), 'client/src/pages/About.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');
    res.json({ content });
  } catch (error) {
    res.status(500).json({ error: 'Failed to read team data' });
  }
});

// API endpoint to save team data
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

// Check if running on Replit
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
