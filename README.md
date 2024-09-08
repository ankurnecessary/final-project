# Introduction

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/create-next-app).

You can have a look at storybook @ <https://ankurnecessary.github.io/final-project>

## Tech Stack

**Client:** TypeScript, React, Next.js

**Server:** Node

## Libraries

Formik - Form
Yup - Form validation
NextAuth - Authentication
TailwindCSS - CSS Stling
Storybook - Component stories
Lucide-react - Font icons
Google recaptcha - Captcha validator
Jest - Testing JavaScript

## Getting Started

First, run the development server:

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

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## NPM Scripts

```bash
npm run dev
```

It helps in running the project in development mode.

```bash
npm run build
```

It helps in creating a build.

```bash
npm run build:stats
```

It helps in creating a build but while it is creating the build, it records the build statistics in terms of size. It records the build statistics in `build-stats.txt`

```bash
npm start
```

It helps in running the build. It will give a URL to run in browser which will run from the build made. There can be only one build in a project (ideally).

```bash
npm test
```

It runs the unit-test-cases against each of the components sitting in *.test.tsx.

```bash
npm run test:coverage
```

It runs the unit-test-cases against each of the components sitting in *.test.tsx and also find what percentage of code is covered under test-cases and what part is left.

```bash
npm run test:watch
```

It runs the unit-test-cases against each of the components sitting in *.test.tsx in watch mode. That means it will always rerun the tests when we make changes in the code.

```bash
npm run test:watch
```

It runs the unit-test-cases against each of the components sitting in *.test.tsx in watch mode. That means it will always rerun the tests when we make changes in the code.

```bash
npm run storybook
```

It will run storybook in development mode.

```bash
npm run test-storybook
```

It runs all the interaction test cases written in storybook.

```bash
npm run build-storybook
```

It makes a build for stroybook.
