import express from 'express';
import cors from 'cors';
import path from 'path';
import type { Server } from 'node:http';
import appleRouter from './routes/apple';
import googleRouter from './routes/google';

const PORT = 3001;

interface StartOptions {
  serveStatic?: boolean;
  staticPath?: string;
}

export function startServer(opts: StartOptions = {}): Promise<Server> {
  return new Promise((resolve, reject) => {
    const expressApp = express();

    expressApp.use(cors());
    expressApp.use(express.json());

    expressApp.use('/api/apple', appleRouter);
    expressApp.use('/api/google', googleRouter);

    if (opts.serveStatic && opts.staticPath) {
      expressApp.use(express.static(opts.staticPath));
      expressApp.get('*', (_req, res) => {
        res.sendFile(path.join(opts.staticPath!, 'index.html'));
      });
    }

    const server = expressApp.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
      resolve(server);
    });

    server.once('error', reject);
  });
}
