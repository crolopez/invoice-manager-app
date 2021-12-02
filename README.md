# Invoice Manager APP

Web application for managing an invoice API using **React**.

## Prerequisites

- [**Node.js**](https://nodejs.org/)
- [**Yarn**](https://classic.yarnpkg.com/)

## How to deploy

After executing the following commands a React.js server will be started on port `3000` by default.

``` bash
yarn install
yarn build
yarn start
```

## Configure

To configure the application you have to update the [appConfig.ts](./src/appConfig.ts) before compiling with the following values:

| Field | Description |
|-|-|
| **REACT_APP_API_ENDPOINT** `(required)` | API endpoint address |

In addition, you can create an `.env` file in the root path to change some default behaviors.

| Field | Description |
|-|-|
| **PORT** | React.js server port |
| **BROWSER** | You can set this value to `none` to avoid launching the browser on application startup |

