# api-demo

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

- First, run the commonwealth application locally and point the environment variable `HOST` to the address of the commonwealth API v1. The default configuration is set to `localhost:3000` and will be updated to the production url once the new API is deployed.

- Make sure you generate an API key associated with your address. You can do this from the `Edit Profile` page in the commonwealth application.

- Copy the API key and configure your environment variables in a local `.env` file. The `.env.example` file contains the required variables.

- Run the development server (it might start on port 3001 when the commonwealth app is running on port 3000):

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Using the Common API

To use the Common API, create a new instance of the `CommonApiClient` class by passing in your API key and address. API calls should be executed on the backend to protect your API keys. To achieve this, we wrap the calls in `async functions` and utilize the `use server` directive in lib/actions.ts.

```ts
import { CommonApiClient } from "@commonxyz/api-client"

const client = new CommonApiClient({
  environment: "dev",
  apiKey: "YOUR_API_KEY",
  address: "YOUR_ADDRESS",
})

const response = await client.user.getUserActivity()
```

## Remaining Issues

- The `getPost` function is not implemented yet, and will be used to refresh posts in the UI after mutations.
- Error handling middleware needs to be refined to repond with a proper error message.
- Request/Response schemas are camelized by the API generator. We should investigate is there is an option to keep them as snake_case.
- Scenarios with user addresses not owning the API key are not supported yet.
