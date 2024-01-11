import { Hono } from 'hono';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CommonEngine } from '@angular/ssr';
import { serveStatic } from '@hono/node-server/serve-static';
import bootstrap from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { serve } from '@hono/node-server';

console.log(import.meta.url);
const serverDistFolder = dirname(fileURLToPath(import.meta.url));
console.log('serverDistFolder', serverDistFolder);
const browserDistFolder = resolve(serverDistFolder, '../browser');
console.log('browserDistFolder', browserDistFolder);
const indexHtml = join(serverDistFolder, 'index.server.html');
console.log('indexHtml', indexHtml);

const app = new Hono();

const commonEngine = new CommonEngine();

const staticDir = browserDistFolder.replace(process.cwd(), '');
console.log(staticDir);

app.get(
  '*.*',
  serveStatic({
    root: staticDir,
  })
);

app.get('*', async (c) => {
  console.log(c);
  const html = commonEngine.render({
    bootstrap,
    documentFilePath: indexHtml,
    url: c.req.raw.url,
    publicPath: browserDistFolder,
    providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
  });

  return c.html(html);
});

serve({
  fetch: app.fetch,
  port: 4000,
});
