# Dispense Blueprint

![alt text](https://files.readme.io/3677bcb-blueprint-headless-commerce.png)

- [Api docs -](https://api-docs.dispenseapp.com/docs/blueprint) https://api-docs.dispenseapp.com/docs/blueprint

## Description

This sample app is built using:

- [React](https://react.dev/)
- [NextJS](https://nextjs.org/)
- [Styled Components](https://styled-components.com/)
- [TanStack Query](https://tanstack.com/query/latest)

You can use this as a starter template to build your own Next.js app, or use it as a reference to build your own custom retailer site on another platform (Wordpress, etc...)
This app follows the guidelines of the [Dispense Blueprint](https://api-docs.dispenseapp.com/docs/blueprint) docs to build a fully custom retailer site.

A live version of this repo can be found here <br />
https://www.highscore-cannabis.com

## Features

- Category, brand, cannabis type and effects landing pages.
- Product pages with product details, reviews, and related products.
- Cart and order complete pages.
- SEO meta data
- Structured Data (JSON+LD)

## Getting Started

Clone this repository, and run the following command to install the dependencies:

```bash
cd into the project directory
```

```bash
pnpm install
```

You will need to create a `.env.local` file in the root of the project and add the following environment variables:

```bash
NEXT_PUBLIC_ENV = dev
NEXT_PUBLIC_DISPENSE_BASE_URL = https://api.dispenseapp.com/2023-03
NEXT_PUBLIC_API_KEY = your dispense api key here
NEXT_PUBLIC_VENUE_ID = your dispense venue/retailer id here
NEXT_PUBLIC_AUTH_COOKIE = 'highscore-auth //use whatever name you'd like for the auth cookie
```

To start the development server, run the following command:

```bash
pnpm dev
```

Open [http://localhost:1313](http://localhost:1313) with your browser to see the result.
