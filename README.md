# ianmaroney.dev

[![codecov](https://codecov.io/gh/ianmaroney/ianmaroney.dev/branch/master/graph/badge.svg?token=0J01LZAXS7)](https://codecov.io/gh/ianmaroney/ianmaroney.dev) [![CI - S3 Deploy & CloudFront Invalidation](https://github.com/ianmaroney/ianmaroney.dev/actions/workflows/main.yml/badge.svg)](https://github.com/ianmaroney/ianmaroney.dev/actions/workflows/main.yml)

## Getting Started

First, run the development server:

```bash
npm run dev
```

## Composition

A statically exported Next.js app composed upon a JSON mock database.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/pages/index.js`. The page auto-updates as you edit the file.

## Testing

The `preexport` script runs a suite of jest tests and outputs a coverage report.

## Deployment

The exported production build is deployed to an s3 bucket behind a CloudFront distribution each time the `master` branch is pushed/pulled via GitHub workflow.

Have a look: [https://ianmaroney.dev](https://ianmaroney.dev)
