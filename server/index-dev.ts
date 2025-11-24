// Frontend-only mode - just run Vite
import { spawn } from 'child_process';

const vite = spawn('npm', ['run', 'dev:client'], {
  stdio: 'inherit',
  shell: true,
});

vite.on('error', (error) => {
  console.error('Failed to start Vite:', error);
  process.exit(1);
});

vite.on('exit', (code) => {
  process.exit(code || 0);
});
