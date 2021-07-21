# ianmaroney.dev

[![codecov](https://codecov.io/gh/ianmaroney/ianmaroney.dev/branch/master/graph/badge.svg?token=0J01LZAXS7)](https://codecov.io/gh/ianmaroney/ianmaroney.dev) [![CI - S3 Deploy & CloudFront Invalidation](https://github.com/ianmaroney/ianmaroney.dev/actions/workflows/main.yml/badge.svg)](https://github.com/ianmaroney/ianmaroney.dev/actions/workflows/main.yml)

## Composition 🤝

A statically exported Next.js app atop a `.json` mock database.

Fun little speedboat. 🤙

* [Next.js](https://github.com/vercel/next.js) 🖖
* [CSS Modules](https://github.com/css-modules/css-modules) in `.scss`
* [react-hook-form](https://github.com/react-hook-form/react-hook-form) <Form />
* [html-react-parser](https://github.com/peternewnham/react-html-parser) HTML rendering

## Getting started 👇

Install dependencies and then run the development server:

```bash
npm install
# ... 🤞 ... #
npm run dev
```

## Viewing 👋

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Editing ✍️

You can start editing the page by modifying `src/pages/index.js`.

Hot Module Replacement keeps things fresh. 🤌

## Testing 🙏

Quick and dirty [jest](https://github.com/facebook/jest) tests with code coverage reporting with [codecov](https://github.com/codecov/codecov-action/tree/1.1.0).

```bash
npm run test
# ... 🤞 ... #
```

## Deployment 🤲

The exported production build is deployed to an s3 bucket behind a CloudFront distribution each time the `master` branch is pushed/pulled via GitHub workflow.

```bash
git push origin master
# ... 🤞 ... #
```
[https://ianmaroney.dev](https://ianmaroney.dev) ✌️
