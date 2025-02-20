import './polyfill.cts';

// A basic CLI to provide a custom config.toml & to choose between the two servers.
// Hono or Fastify
import chalk from 'chalk';
import gradient from 'gradient-string';
import { message, messageColors } from "./message.ts";
import { parseArgs } from "@std/cli";
import { startServer as HonoServer } from './standalone/standalone.ts';
import { startServer as FastifyServer } from './full/server.ts';
import { fromFileUrl } from '@std/path';
import * as fs from 'node:fs/promises';

interface CLIArgs {
    help: boolean;
    server?: "full" | "standalone";
    config?: string;
    seo?: boolean;
}

const args = parseArgs([...process.argv], {
    boolean: ["help", "seo"],
    string: ["server", "config"]
}) as CLIArgs;

console.log(gradient(Object.values(messageColors)).multiline(message));
console.log(chalk.hex('#34b874')('Welcome to the Incognito CLI!'));
if (args.help || (!args.server && !args.config)) {
    console.log(`
        ${chalk.whiteBright.bold('--help - Trigger this menu')}
        ${chalk.whiteBright.bold('--server <full|standalone> - Select the server type (default: full)')}
        ${chalk.whiteBright.bold('--config <path> - The path to a custom config. (default: config.toml)')}
        ${chalk.whiteBright.bold('--seo - Enable SEO website regardless of the config file (default: false)')}
    `)
    process.exit();
}

if (args.config) {
    const path = await fs.realpath(args.config);
    args.config = path;
}

if (args.server !== "standalone" && args.server !== "full") {
    console.log(chalk.redBright.bold('Error with options --server\n The only options available are: full or standalone'));
    process.exit();
}

args.server === "standalone" 
    ? await HonoServer(args.config ?? fromFileUrl(new URL('../config.toml', import.meta.url)), args.seo) 
    : await FastifyServer(args.config ?? fromFileUrl(new URL('../config.toml', import.meta.url)), args.seo);
