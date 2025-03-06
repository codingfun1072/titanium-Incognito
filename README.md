<div align="center">

<img src="https://socialify.git.ci/titaniumnetwork-dev/incognito/image?description=1&font=Inter&forks=1&issues=1&language=1&name=1&owner=1&pattern=Circuit%20Board&pulls=1&stargazers=1&theme=Dark" alt="ruby" width="640" height="320" />

<img alt="repo size" src="https://img.shields.io/github/repo-size/titaniumnetwork-dev/incognito?style=for-the-badge"></img>
<img alt="website status" src="https://img.shields.io/website?url=https%3A%2F%2Fincog.nebula.christmas&style=for-the-badge"></img>
<img alt="commit a week" src="https://img.shields.io/github/commit-activity/w/titaniumnetwork-dev/incognito?style=for-the-badge"></img>
<a href="https://github.com/caracal-js/incognito" target="_blank" rel="noopener noreferer"><img alt="original repo" src="https://img.shields.io/badge/Original-Repo-gray?style=for-the-badge&link=https%3A%2F%2Fgithub.com%2Fcaracal-js%2Fincognito"></img></a>

</div>

<div align="center">
    <h2>Get Started</h2>
    <a>To get started, press one of the buttons below to deploy Incog</a>
    <br />
    <br />
    <a href="#terminal">
        <img src="https://img.shields.io/badge/terminal-%23121011.svg?style=for-the-badge&logo=gnu-bash&logoColor=white" alt="Terminal">
        </img>
    </a>
    <a href="#docker">
        <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white" alt="Docker">
        </img>
    </a>
</div>

## NOTE:

- This will **NOT** deploy on Github Pages, Netlify, Vercel, Gitlab Pages or any other _static_ host
- This will **NOT** work on Render

---

## How to get links

[![Titanium Network Discord](https://invidget.switchblade.xyz/unblock?theme=dark)](https://discord.gg/unblock)

---

## Features

- Lots and lots of games

- Multiple Proxy "Backends":
  - [Ultraviolet](https://github.com/titaniumnetwork-dev/ultraviolet)
  - [Scramjet](https://github.com/mercuryworkshop/scramjet)

---

## Contributors

- [MotorTruck1221](https://motortruck1221.com) - Maintainer
- [Rifting](https://github.com/rifting) - Maintainer
- [caracal-js](https://github.com/caracal-js) - Original Creator

---

## Tech Stack

- [Astro](https://astro.build)
- [Fastify](https://fastify.dev)
- [Ultraviolet](https://github.com/titaniumnetwork-dev/ultraviolet)
- [Epoxy](https://github.com/mercuryworkshop/epoxy-tls)
- [Libcurl.js](https://github.com/ading2210/libcurl.js)
- [Hono](https://github.com/honojs) as a Deno native alternative to fastify. Run with command: `deno task start --server standalone`
- [Deno 2.0](https://github.com/denoland/deno)
- HTML, CSS, and JavaScript (DUH)

---

## Roadmap

- [x] - [Implement Scramjet](https://github.com/mercuryworkshop/scramjet)
- [ ] - Remove dependency on Fastify & switch completely to Hono
- [ ] - General codebase cleanup & remove all of the functions exisiting on `window`
- [ ] - Games page needs to be reworked due to more games
- [ ] - [i18n](https://github.com/alexandre-fernandez/astro-i18n)
- [ ] - More themes
- [ ] - Detatch from the [Original repo](https://github.com/caracal-js/incognito)

---

## Branches

- main - Latest stable branch & production ready
- dev - all major changes are made here before being merged into main

---

## Deployment

- Incognito is the easiest proxy to deploy!
- Currently, there are 3 ways to deploy Incognito
    - [Pre-built binaries](#Pre-built-binaries)
    - [Docker]()
    - [Building and running yourself]()

#### Pre-built Binaries

- When a new version is pushed, our CI automagically builds & uploads pre-built binaries to the release.
- This enables you to: 
    - A. Not install any extra runtime or install any new packages
    - B. Updates are easy and quick. Just download the new binary!

###### Usage:

- First grab the current binary for your system & OS [here](https://github.com/titaniumnetwork-dev/incognito/releases/latest)
- Then simply run the binary!
    - For example using linux:
    ```bash
    ./incognito-linux --server full
    ```

> [!NOTE]
> - You MAY have to make the binary executable on certain systems.
>    - For example in Linux:
>    ```bash
>    chmod +x ./incognito-linux
>    ```
>
> - To see all of the CLI options & usage see: [cli](#cli)

#### Docker

- Docker is the second easiest way to run Incognito.
- Currently, Docker images are built by [@motortruck1221](https://github.com/motortruck1221) manually per version update.
    - They can be located here: [https://hub.docker.com/r/motortruck1221/incognito](https://hub.docker.com/r/motortruck1221/incognito)
- This enables:
    - Automatic updates
    - Easier deployment then building yourself.
    - No dependencies besides docker w/compose

###### Usage:

- The Docker builds currently have 2 tags:
    - Latest
    - Or a pinned version of the build (eg: 1.1.7)
- Currently, only Docker compose is supported. Docker without compose *can be used* but it's highly discouraged.

- Prerequisites:
    - Docker w/compose

- First, create a `config.toml` file and copy the [example config from the repo](https://github.com/titaniumnetwork-dev/incognito/blob/main/config.example.toml)
- Then, copy and paste the contents of the [docker-compose.yml file](https://github.com/titaniumnetwork-dev/incognito/blob/main/docker-compose.yml) into your own docker-compose.yml file
- After that, edit the `docker-compose.yml` file to your liking.
- And finally:
```bash
docker compose up
```
- That should fire Incognito up and you should be good!

> [!NOTE]
> - To see all of the CLI options & usage see: [cli](#cli)
>
> - To see all of the `config.toml` options see: [config](#config)

#### Building & Running yourself

- This is the last way to run Incognito

###### Usage:

- Prerequisites:
    - Git
    - Recent Node.js
    - PNPM

1. Clone the repo
```bash
git clone --depth 1 -b node-0.1.0 --single-branch https://github.com/codingfun1072/titanium-Incognito.git
```

2. Install all of the dependencies:
```bash
pnpm install
```

3. Create a `config.toml` file
```bash
cp config.example.toml config.toml
```

4. Modify the `config.toml` file to your liking. See: [config](#config)

5. Build the frontend
```bash
pnpm run build
```

6. Start the server
```bash
pnpm start --server full
```

> [!NOTE]
> - To see all of the CLI options & usage see: [cli](#cli)

---

## CLI

- Incognito has a built in CLI for starting and running
- Currently, there are only 4 flags. And 1 extra command

- `--help` - This triggers the help prompt even when other flags are passed.
- `--server [full|standalone]` - Choose between the full or standalone server. This option is ***required*** otherwise, it will just show the help prompt.
    - Full - Uses Fastify has a built in Wisp server (via [wisp server node](https://github.com/mercuryworkshop/wisp-server-node)) *(recommended for self hosters)*
    - Standalone - Uses Hono as the server with no built in Wisp server. *(recommended for a huge production instance with an external wisp server)*
    - These are the only two options. Anything else passed here WILL throw an error.
- `--config <config path>` - Use a config located somewhere else.
    - Useful when using the [Pre-built binaries](#pre-built-binaries)
    - The path can either be absolute or relative.
- `--seo` - Currently the default is to only use the build with no seo enabled. This flag enables the seo build.
    - Domain must be set in the [config](#config)
    - Overrides the enabled option in the [config](#config)

- `upgrade` - Allows for the ability to self-update the binary. Run this to self upgrade
    - `--check` check for a new version. Tells you if one is available.

---

## Config

- Incognito currently uses a config file in the toml format.
- An example of this file can be found [here](https://github.com/titaniumnetwork-dev/incognito/blob/main/config.example.toml)

##### Build Opts
| Type | Default | Description                        | Can be overwritten by ENV var |
|------|---------|------------------------------------|-------------------------------|
| games | `true` | Disables or enables the games page | - [ ] - No |

##### Server
| Type | Default | Description                                                                                                     | Can be overwritten by ENV var |
|------|---------|-----------------------------------------------------------------------------------------------------------------|------------------------------|
| port | `8000`  | Change the default port. *Note: the environment var `PORT` takes precedence*                                    | - [x] - Yes |
| wisp | `true`  | Disable or enables the in built wisp server. *Note: when using the Hono server there is no built-in wisp server | - [ ] - No |

##### SEO
| Type   | Default                 | Description                                                              | Can be overwritten by ENV var |
---------|-------------------------|--------------------------------------------------------------------------|-------------------------------|
| SEO    | `false`                 | Change whether or not to enabled SEO                                     | - [x] - Yes - `SEO` (as well via a CLI flag `--seo` |
| DOMAIN | `http://localhost:8000` | When the `both` option is enable, only show the SEO stuff on this domain | - [x] - Yes - `DOMAIN`        |
