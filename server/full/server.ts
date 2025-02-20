import fastifyCompress from '@fastify/compress';
import fastifyCookie from '@fastify/cookie';
import fastifyHttpProxy from '@fastify/http-proxy';
import fastifyMiddie from '@fastify/middie';
import fastifyStatic from '@fastify/static';
import Fastify from 'fastify';
import { sFactory } from './serverFactory.ts';
import { listeningMessage } from "../message.ts";
import { config } from "../config/config.ts";
import { fromFileUrl } from "@std/path";

const startServer = async (configPath: string, seo?: boolean) => {
    const parsedDoc = await config(configPath);
    const serverFactory = await sFactory(configPath);
    const distPath = fromFileUrl(new URL('../../dist', import.meta.url));
    const app = Fastify({ logger: false, serverFactory: serverFactory });

    await app.register(fastifyCookie, {
        secret: process.env['COOKIE_SECRET'] || 'yes',
        parseOptions: {}
    });
    await app.register(fastifyCompress, {
        encodings: ['br', 'gzip', 'deflate']
    });

    await app.register(fastifyStatic, {
        root: `${distPath}/noseo`,
        etag: false,
        lastModified: false
    });
    if (seo || parsedDoc.seo.enabled) {
        await app.register(fastifyStatic, {
            root: `${distPath}/seo`,
            constraints: { host: new URL(process.env['DOMAIN'] || parsedDoc.seo.domain).host },
            etag: false,
            lastModified: false,
            decorateReply: false
        })
    }

    await app.register(fastifyMiddie);
    await app.register(fastifyHttpProxy, {
        upstream: 'https://rawcdn.githack.com/ruby-network/ruby-assets/main/',
        prefix: '/gms/',
        http2: false
    });

    const port = parseInt(process.env['PORT'] as string) || parsedDoc.server.port || 8000;

    app.listen({ port: port, host: '0.0.0.0' }).then(() => {
        listeningMessage(port, "fastify");
    });
}

export { startServer }
