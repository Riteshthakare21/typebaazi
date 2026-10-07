// @ts-check
import { defineConfig } from 'astro/config';
import fs from 'node:fs';
import path from 'node:path';

// Custom Vite plugin to guarantee Android APK MIME type and attachment headers
function apkMimePlugin() {
  return {
    name: 'apk-mime-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const cleanUrl = req.url ? req.url.split('?')[0] : '';
        if (cleanUrl === '/typebaazi.apk' || cleanUrl.endsWith('.apk')) {
          const apkPath = path.resolve('public/typebaazi.apk');
          if (fs.existsSync(apkPath)) {
            const stat = fs.statSync(apkPath);
            res.setHeader('Content-Type', 'application/vnd.android.package-archive');
            res.setHeader('Content-Disposition', 'attachment; filename="typebaazi.apk"');
            res.setHeader('Content-Length', stat.size);
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Cache-Control', 'no-cache');
            const stream = fs.createReadStream(apkPath);
            stream.pipe(res);
            return;
          }
        }
        next();
      });
    }
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://typebaazi.com',
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  server: {
    host: '0.0.0.0',
    port: 4321,
  },
  vite: {
    plugins: [apkMimePlugin()],
    server: {
      host: '0.0.0.0',
      port: 4321,
      cors: true,
      strictPort: false,
      hmr: {
        clientPort: 4321,
      },
    },
  },
});
