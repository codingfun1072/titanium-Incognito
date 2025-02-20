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

## Deployment

### Terminal

- There are multiple ways to deploy via the terminal.
    - Using a pre-built binary
    - Building & Running yourself

#### Pre Built Binary:

- Incognito has the ability to run completely within a single executable without you ever having to install or build anything.
- To do so, check the [Latest Release](https://github.com/titaniumnetwork-dev/incognito/releases/latest) and download the binary associated with your system.
- To run Incognito:
```bash
# This only has to be done once to make it executable
chmod +x ./incognito-linux

./incognito-linux --server full # Can also be standalone for a smaller server with no wisp server.
# OR:
./incognito-linux --server full --config yourconfighere.toml # This flag is completely optional but allows you to use your own config

# To see more about the command line flags:
./incog-linux OR ./incog-linux --help
```

#### Build & Run yourself

Prerequisites:
- NodeJS
- PNPM
- Git

1. Clone the repo
```bash
git clone --depth 1 -b switch-to-node --single-branch https://github.com/codingfun1072/titanium-Incognito.git
```

2. `cd` into the project
```bash
cd incognito
```

3. Install the required deps:
```bash
pnpm install
```

4. Create a config.toml file
```bash
cp config.example.toml config.toml
```

5. Edit the config file to your likinh

6. Build the frontend:
```bash
pnpm run build
```

7. Start the server!
```bash
pnpm start --server full # Can also be standalone for a smaller server with no wisp server.

# For help with the cli:
pnpm start --help 
# OR 
pnpm start
```

---

### Games

- By default, games are reverse proxied by the server
  - Game assets are located [here](https://github.com/ruby-network/ruby-assets)
- To turn off Games, and access to them see [#config](#config)

### Docker

- There are two ways to deploy with docker:
  - [Normal docker](#normal-docker)
  - [Docker Compose](#docker-compose)

#### Normal Docker

Prerequisites:

- Git
- Docker

1. Clone the repo (skip if using prebuilt image):

```bash
git clone https://github.com/titaniumnetwork/incognito && cd incognito
```

2. Create an config.toml file (if using prebuilt image, copy the example from the repo):

```bash
cp config.example.toml config.toml
```

3. Modify the .env file to your liking (docs [here](#config))

```bash
nano config.toml
```

4. Build the docker image (skip if using prebuilt):

```bash
docker build -t incog:latest
```

5. Run the docker images:

   - Prebuilt:
   ```bash
   docker run --volume ./config.toml:/app/config.toml motortruck1221/incognito:latest
   ```
   - Image you built yourself:
   ```bash
   docker run --volume ./config.toml:/app/config.toml incog:latest
   ```

#### Docker Compose

Prerequisites:

- Git
- Docker w/compose

1. Clone the repo (skip if using prebuilt image):

```bash
git clone https://github.com/titaniumnetwork-dev/incognito
```

2. Create an config.toml file (if using prebuilt image, copy the example from the repo):

```bash
cp config.example.toml config.toml
```

3. Modify the config.toml file to your liking (docs on that [here](#config)]

```bash
nano config.toml
```

4. Build the docker image (skip if using prebuilt):

```bash
docker compose -f ./docker-compose.build.yml build
```

5. Run the docker image:

   - Prebuilt:
   ```bash
   docker compose up
   ```
   - Image you built yourself:
   ```bash
   docker compose -f ./docker-compose.build.yml up
   ```

---

## Config

- The config is rather simple and quick, it's done in TOML and there are only two object:
- `buildOpts` & `server` below there will be 2 tables showcasing the possible values.
> [!NOTE]
> As it says, `buildOpts` will only apply when *building* the website. This can be changed in the docker-compose files.

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
| Type   | Default                 | Description                                                              | Can be overwritten by ENV var | Is used at build time |
---------|-------------------------|--------------------------------------------------------------------------|-------------------------------|-----------------------|
| SEO    | `false`                 | Change whether or not to enabled SEO                                     | - [x] - Yes - `SEO`           | - [x] - Yes           |
| DOMAIN | `http://localhost:8000` | When the `both` option is enable, only show the SEO stuff on this domain | - [x] - Yes - `DOMAIN`        | - [ ] - No            |
| BOTH   | `false`                 | Works in tandem with option `DOMAIN`                                     | - [x] - Yes - `BOTH`          | - [ ] - No            |
