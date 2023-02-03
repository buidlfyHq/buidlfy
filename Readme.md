<p align="center">
  <img src="https://github.com/buidlfyHq/buidlfy-landing/blob/main/public/logo.svg" width="250" />
</p>

<h2 align="center">No-code dapp builder</h2>

<p align="center">
  Buidlfy is a blazingly fast, totally extendable launcher. It lets you complete tasks, calculate, share common links, and much more. <br> Try Buidlfy Now at https://buidlfy.com/.
</p>

<p align="center">
  <img src="https://img.shields.io/static/v1?label=license&message=Apache%202.0&color=green" />
  <a href="https://discord.com/invite/vaHA8EnWND" target="_blank" rel="noreferrer">
    <img src="https://img.shields.io/static/v1?label=community&message=discord&color=blue" />
  </a>
  <img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg" />
  <a href="https://twitter.com/BuidlfyHq" target="_blank" rel="noreferrer">
    <img src="https://img.shields.io/twitter/url/https/twitter.com/cloudposse.svg?style=social&label=Follow%20%40BuidlfyHQ" />
  </a>
</p>

## Local Setup
### With Docker
Quickly set up Buidlfy through Docker by using the following commands.

```
git clone https://github.com/buidlfyHq/buidlfy.git
cd buidlfy
docker compose build --no-cache
docker compose up -d
```

---

### Without Docker
You have to setup the server and the dev environment to run Buidlfy locally.

### Server
You can follow these steps to setup the server:
- Install Node 16.x either manually or using a tool like nvm (recommended)
- Clone this repo: `https://github.com/buidlfyHq/buidlfy.git`
- Go inside the `server` directory
- Run `npm i` to install dependencies

#### Start the server
```
npm run dev
```
You can access the server at: http://localhost:8000

### Builder
You can follow these steps to setup the server:
- Install Node 18.x either manually or using a tool like nvm (recommended)
- Clone this repo: `https://github.com/buidlfyHq/buidlfy.git`
- Go inside the `builder` directory
- Run `npm i` to install dependencies

#### Start the builder
```
npm run dev
```
You can access the server at: http://localhost:3000

## Documentation
For details on how to use Buidlfy, checkout our documentation.

## Contribution
We encourage you to read the contribution guidelines to learn about our development process and how to propose bug fixes and improvements before submitting a pull request.

The Buidlfy community extends beyond issues and pull requests! You can support Buidlfy in many other ways as well.


## Community
For help, discussions or any other queries: [Join us on Discord](https://discord.com/invite/vaHA8EnWND)

## Reference
- Contribution Guidelines
- FAQ
