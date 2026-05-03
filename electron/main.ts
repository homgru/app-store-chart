import { app, BrowserWindow, shell } from 'electron';
import path from 'node:path';
import { startServer } from '../server/src/index';

const isDev = process.env.NODE_ENV === 'development';
const SERVER_PORT = 3001;
const VITE_PORT   = 5173;

function createWindow() {
  const win = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'default',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
    title: '앱스토어 순위',
  });

  const url = isDev
    ? `http://localhost:${VITE_PORT}`
    : `http://localhost:${SERVER_PORT}`;

  win.loadURL(url);

  // 앱 내 링크 클릭 시 시스템 브라우저로 오픈
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

app.whenReady().then(async () => {
  if (!isDev) {
    // 프로덕션: Express 서버가 API + React 정적 파일을 함께 서빙
    const staticPath = app.isPackaged
      ? path.join(process.resourcesPath, 'app', 'client', 'dist')
      : path.join(__dirname, '..', 'client', 'dist');

    await startServer({ serveStatic: true, staticPath });
  }

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
