# ETH Wallet Scan

## API

A NestJS Application that exposes an API to get information about **Transactions** and **Balances** for a group of valid Ethereum wallets.

### Modules

| Name       | Description                                                   |
| ---------- | ------------------------------------------------------------- |
| Wallets    | CRUD operations for wallets, get transactions and ETH balance |
| Currencies | Get ETH price and FIAT currencies exchange rates              |

### Third-party Integrations

| Provider                                     | Description                                  |
| -------------------------------------------- | -------------------------------------------- |
| [Etherscan](docs.etherscan.io)               | Provide real-time blockchain information     |
| [Free Currency](https://freecurrencyapi.com) | Provider real-time Currencies exchange rates |

### Technical Decisions

#### Database

I choose **MongoDB** to persist the information as:

- Its implementation it's very straightforward and NestJS provides his own and well tested **Mongoose** client.
- The application doesn't need to make any ACID or transactional operation and there's no relations between entities.

#### Schemas

- I decided to not store transactions and balances into Wallet Schema to avoid issues trying to keep the information updated. Instead, the front-end fills that information dynamically for each Wallet.

## Client

A NextJS Application that takes advantage of server-side-rendering to provide a performant and stateless application.

### Technical Decisions

#### Framework

I use NextJS as its provides a set of useful tools, like routing or server-side-rendering that makes easier and faster the developing process, instead of make my own implementations for each one, for example, having to implement react-router from scratch.

#### URL as source of truth

Instead of store application state using Redux, React Context or even components state, I prefer to use the URL as source of truth and keep the application stateless since there's no information shared between components (like auth session).

## Run Project

### Docker

`docker-compose up --build`

Application should run at `http://localhost:3000`

### Manually (dev)

1. Replace `/client/.env` `API_HOST="http://api:3001"` with `API_HOST="http://localhost:3001"`

2. Go to `/api` folder and run `npm install && npm run start:dev`

3. Then, go to `/client` and run `npm install && npm run dev`