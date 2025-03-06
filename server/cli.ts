import "deno_shim"; 
// A basic CLI to provide a custom config.toml & to choose between the two servers.
// Hono or Fastify
import chalk from 'chalk';
import gradient from 'gradient-string';
import { message, messageColors } from "./message.ts";
import { parseArgs } from "@std/cli";
import { startServer as HonoServer } from './standalone/standalone.ts';
import { startServer as FastifyServer } from './full/server.ts';
import { fromFileUrl } from '@std/path';
import ora, { Ora } from 'ora';

import packageJSON from "../package.json" with { type: 'json' };
const { version } = packageJSON;

interface CLIArgs {
    _: any[];
    help: boolean;
};

interface StartArgs extends CLIArgs {
    server: "full" | "standalone";
    config?: string;
    seo?: boolean;
};

interface UpgradeArgs extends CLIArgs {
    check: boolean;
};

interface DescriptionType {
    name: string;
    description: string;
    default?: string;
};

class CLI<T extends CLIArgs> {
    #args: T;
    constructor(config: { booleans: string[], strings: string[] }) {
        this.#args = parseArgs(Deno.args, {
            boolean: config.booleans,
            string: config.strings
        }) as T;    
    }

    #white(text: string) {
        return chalk.whiteBright.bold(text);
    }

    getArgs(): T {
        return this.#args;
    }

    help(descriptions?: DescriptionType[]) {
        console.log(chalk.whiteBright.bold('--help - Trigger this menu'));
        descriptions?.map((val) => console.log(`${this.#white('--')}${this.#white(val.name)} ${this.#white('-')} ${this.#white(val.description)} ${val.default ? this.#white(`(default: ${val.default})`) : ''}`))
        Deno.exit();
    }

    async start(fn: () => unknown) {
        await fn();
    }
}

console.log(gradient(Object.values(messageColors)).multiline(message));
console.log(chalk.hex('#34b874')(`Welcome to the Incognito CLI!\nVersion: ${version}\n`));

const cli = new CLI<CLIArgs>({
    booleans: [], strings: []
});

const args = cli.getArgs();

if (args._.length !== 0 && args._[0] !== "upgrade") {
    console.log(chalk.redBright.bold(`The command ${args._[0]} is not available.\nPlease use a valid command`))
    Deno.exit();
}

if (args._[0] === "upgrade") {
    const upgradeCLI = new CLI<UpgradeArgs>({ booleans: ["check"], strings: [] });
    const uArgs = upgradeCLI.getArgs();

    const checkForVersion = async (checkFlag: boolean) => {
        const res = await fetch("https://raw.githubusercontent.com/titaniumnetwork-dev/Incognito/refs/heads/main/package.json");
        const resp = await res.json();
        if (resp.version !== version) {
            checkFlag ? console.log(chalk.greenBright.bold(`A new version is available! Re-run this command without --check to upgrade!`)): '';
            return resp.version;
        }
        else {
            console.log(chalk.redBright.bold('A new version is not available at this moment, check back later'));
            Deno.exit();
        }
    }

    if (uArgs.help) {
        upgradeCLI.help([
            { name: 'check', description: 'Check for a new version' }
        ]);
    }
    
    if (uArgs.check) {
        await checkForVersion(true);
        Deno.exit();
    }

    const download = async (version: string, spinner: Ora) => {
        const os = Deno.build.os;
        const arch = Deno.build.arch;
        if (os === "aix" || os === "netbsd" || os === "android" || os === "freebsd" || os === "solaris" || os === "illumos") {
            spinner.fail('Your OS is NOT supported! Exiting...');
            Deno.exit();
        }
        if (os === "darwin") {
            const res = await fetch(`https://github.com/titaniumnetwork-dev/incognito/releases/download/v${version}/incognito-MacOS${arch === "aarch64" ? '-arm': ''}`);
            const resp = await res.bytes();
            await Deno.writeFile(`incognito-MacOS${arch === "aarch64" ? '-arm': ''}`, resp, { mode: 0o775 });
        }
        else {
            const res = await fetch(`https://github.com/titaniumnetwork-dev/incognito/releases/download/v${version}/incognito-${os}${arch === "aarch64" ? '-arm': ''}`);
            const resp = await res.bytes();
            await Deno.writeFile(`incognito-${os}${arch === "aarch64" ? '-arm': ''}`, resp, { mode: 0o775 });
        }
    };
    
    await upgradeCLI.start(async () => {
        const version = await checkForVersion(false);
        const spinner = ora('Downloading...').start();
        await download(version, spinner);
        spinner.succeed('Upgraded!');
    });

    Deno.exit();
}

const startCLI = new CLI<StartArgs>({ 
    booleans: ["help", "seo"], strings: ["config"] 
});

const startArgs = startCLI.getArgs();

if (startArgs.help || !startArgs.server) {
    startCLI.help([
        { name: "server [full|standalone]", description: "Select the server type", default: "full" },
        { name: "config [path]", description: "The path to a custom config", default: 'config.toml' },
        { name: "seo", description: "Enable SEO website regardless of the config file", default: 'false' }
    ]);
}

if (startArgs.config) {
    const path = await Deno.realPath(startArgs.config);
    startArgs.config = path;
}

if (startArgs.server !== "full" && startArgs.server !== "standalone") {
    console.log(chalk.redBright.bold(`Error with option --server!\nThe value: "${startArgs.server}" is not valid!\nThe only available options are: "full" or "standalone"`));
}

startCLI.start(async () => {
    startArgs.server === "standalone"
        ? await HonoServer(startArgs.config ?? fromFileUrl(new URL('../config.toml', import.meta.url)), startArgs.seo)
        : await FastifyServer(startArgs.config ?? fromFileUrl(new URL('../config.toml', import.meta.url)), startArgs.seo)
});
