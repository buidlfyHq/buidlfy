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
Quickly set up Buidlfy through Docker by using the following commands:
- Clone this repo: `https://github.com/buidlfyHq/buidlfy.git`
- Refer the [ENV section](#env) to create a .env file in the `server` and `builder` directory
- Start all the services
  ```
  docker compose build --no-cache
  docker compose up -d
  ```

---

### Without Docker
You have to set up the server and the dev environment to run Buidlfy locally.

### Server
You can follow these steps to setup the server:
- Install Node 16.x either manually or using a tool like nvm (recommended)
- Clone this repo: `https://github.com/buidlfyHq/buidlfy.git`
- Go inside the `server` directory
- Run `npm i` to install dependencies
- Refer the [ENV section](#env) to create a .env file in the `server` directory
- Start the server
  ```
  npm run dev
  ```
You can access the server at: http://localhost:8000

### Builder
You can follow these steps to setup the builder:
- Install Node 18.x either manually or using a tool like nvm (recommended)
- Clone this repo: `https://github.com/buidlfyHq/buidlfy.git`
- Go inside the `builder` directory
- Run `npm i` to install dependencies
- Refer the [ENV section](#env) to Create a .env file in the `builder` directory
 
- Start the builder
  ```
  npm start
  ```
You can access the server at: http://localhost:3000

<a name="env"></a>
## ENV
Create a .env file in the `server` and `builder` directories with the following configuration after cloning the Buidlfy repository:

### Server
```
# PORT
PORT = 8000

# DATABASE
# DB_HOST = 127.0.0.1
DB_PORT = 27017
DB_DATABASE = buidlfy

#TWITTER
BEARER_TOKEN = xxxx
BUIDLFY_TWITTER_ID = 1565721219680600065
TWEET_TEXT = Build dapps within minutes without writing a single piece of code using Buidlfy. Follow Buidlfy on Twitter @BuidlfyHQ
MAX_RESULTS = 20

# LOG
LOG_FORMAT = dev
LOG_DIR = ../logs

# CORS
ORIGIN = http://localhost:3000
CREDENTIALS = true

# BUIDLFY CREDENTIALS
SPHERON_TOKEN = xxxx
ORGANIZATION_ID = xxxx
DECODER_GIT_URL = https://github.com/buidlfyHq/buidlfy.git
DECODER_GIT_BRANCH = dev
CORS_ADDRESS = *
SITE_DOMAIN_NAME = buidlfy.app

# SPHERON DETAILS
SPHERON_API_HOST = https://api-v2.spheron.network
DEPLOYMENT_ENDPOINT = /v1/deployment

# CLOUDFLARE DETAILS
CLOUDFLARE_KEY = xxxx
CLOUDFLARE_EMAIL = xxxx
CDN_CNAME = xxxx
CLOUDFLARE_ZONE_ID = xxxx

WEB3_STORAGE_ACCESS_TOKEN = xxxx
```

Refer the following documentation sections to generate missing credentials (xxxx):
- Twitter Documentation: [Twitter API](https://developer.twitter.com/en/docs/twitter-api/getting-started/getting-access-to-the-twitter-api)
- Spheron Documentation: [Spheron API](https://docs.spheron.network/api/rest-api-references), [Spheron Organization](https://docs.spheron.network/organization/overview)
- Cloudfare Documentation: [Cloudfare API](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/), [Cloudfare API Docs](https://cloudflare.github.io/node-cloudflare/)
- Web3 Storage Documentation: [Web3 Storage API](https://web3.storage/docs/how-tos/generate-api-token/)


### Builder
```
REACT_APP_TEMPLATE_LIST_TYPE="listed"
REACT_APP_TWITTER_TEXT="Build dapps within minutes without writing a single piece of code using Buidlfy. Follow Buidlfy on Twitter @BuidlfyHQ"
```

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
