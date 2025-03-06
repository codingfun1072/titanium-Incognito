import { createServer } from 'node:http';
import { Socket } from 'node:net';
import {
    type FastifyServerFactory,
    FastifyServerFactoryHandler,
    RawServerDefault,
} from 'fastify';
import wisp from 'wisp-server-node';
import { config } from '../config/config.ts';

const sFactory = async (configPath: string): Promise<FastifyServerFactory> => {
    const parsedDoc = await config(configPath);
    const serverFactory: FastifyServerFactory = (handler: FastifyServerFactoryHandler): RawServerDefault => {
        return createServer()
            .on('request', (req, res) => {
                handler(req, res);
            })
            .on('upgrade', (req, socket, head) => {
                if (req.url?.endsWith('/wisp/') && parsedDoc.server.wisp === true) {
                    wisp.routeRequest(req, socket as Socket, head);
                }
            });
    };
    return serverFactory;
}

export { sFactory };
