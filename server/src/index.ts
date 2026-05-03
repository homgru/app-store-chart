import express from 'express';
import cors from 'cors';
import path from 'path';
import appleRouter from './routes/apple';
import googleRouter from './routes/google';

const PORT = 3001;

interface StartOptions {
  serveStatic?: boolean;
  staticPath?: string;
}

export function startServer(opts: StartOptions = {}): Promise<void> {
  return new Promise((resolve, reject) => {
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use('/api/apple', appleRouter);
    app.use('/api/google', googleRouter);

    if (opts.serveStatic && opts.staticPath) {
      app.use(express.static(opts.staticPath));
      app.get('*', (_req, res) => {
        res.sendFile(path.join(opts.staticPath!, 'index.html'));
      });
    }

    const server = app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
      resolve();
    });

    server.on('error', reject);
  });
}

// tsx로 직접 실행할 때 자동 시작
if (require.main === module) {
  startServer();
}
