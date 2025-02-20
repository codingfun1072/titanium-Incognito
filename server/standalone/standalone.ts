import { Hono } from '@hono/hono';
import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static'
import { compress } from '@hono/hono/compress';
import { listeningMessage } from '../message.ts';
import { config } from '../config/config.ts';
import { fromFileUrl } from '@std/path';

const startServer = async (configPath: string, seo?: boolean) => {
    const parsedDoc = await config(configPath);
    const app = new Hono();
    const distPath = fromFileUrl(new URL('../../dist', import.meta.url));

    app.use(compress({
        encoding: 'gzip',
    }));

    app.use('/*', (ctx, next) => {
        if (new URL(ctx.req.url).host === new URL(process.env['DOMAIN'] || parsedDoc.seo.domain).host && seo || parsedDoc.seo.enabled) {
            return serveStatic({ root: `${distPath}/seo` })(ctx, next);
        }
        else {
            return serveStatic({ root: `${distPath}/noseo` })(ctx, next);
        }
    });

    serve({
        fetch: app.fetch,
        hostname: '0.0.0.0',
        port: parseInt(process.env['PORT'] as string) || parsedDoc.server.port || 8000,
    }, () => {
        listeningMessage(parseInt(process.env['PORT'] as string) || parsedDoc.server.port || 8000, 'hono');
    });
}

export { startServer }
