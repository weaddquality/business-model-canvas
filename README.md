# Business Model Canvas

## Description

A business model canvas is a tool to map and visualize a business model. The BMC is a great tool for
collaboration on building and understanding business models and making it a continuously ever
evolving piece of work in an agile way.

Read more about the concept of Business Model Canvas on wikipedia:
https://en.wikipedia.org/wiki/Business_Model_Canvas

See the application with backend live here: https://dec11evc3bzjf.cloudfront.net/

The backend for this repository: https://github.com/weaddquality/bmc-aws-lambda-serverless

## Prerequisites

- `node`, `git` and `aws cli` installed
- your own `iam user` created by owner
- credentials for the aws-backend given by owner

## Installation

- `cd <your_repositories_catalog>`
- `git clone git@github.com:weaddquality/business-model-canvas.git`
- run `aws configure` in terminal and configure with your `iam user`'s credentials
- create a `src/config.js` with backend credentials:

```
export default {
  s3: {
    REGION: "YOUR_S3_UPLOADS_BUCKET_REGION",
    BUCKET: "YOUR_S3_UPLOADS_BUCKET_NAME"
  },
  apiGateway: {
    REGION: "YOUR_API_GATEWAY_REGION",
    URL: "YOUR_API_GATEWAY_URL"
  },
  cognito: {
    REGION: "YOUR_COGNITO_REGION",
    USER_POOL_ID: "YOUR_COGNITO_USER_POOL_ID",
    APP_CLIENT_ID: "YOUR_COGNITO_APP_CLIENT_ID",
    IDENTITY_POOL_ID: "YOUR_IDENTITY_POOL_ID"
  }
}
```

- `npm install`

## Start application

- `npm start`

## Deploy workspace to aws

- `npm run deploy`

## Run cypress-tests

#### Open cypress

- `npm run cypress`

#### Run cypress tests headless

- `npm run cypress:ci`
