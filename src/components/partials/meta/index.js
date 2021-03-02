import { memo } from 'react'

import Head from 'next/head'

const Meta = memo(({ page, globals }) => {
  if (page) {
    return (
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' key='viewport' />
        <title key='title'>{`${page.title}${globals && globals.titleExtras ? ` - ${globals.titleExtras.join(' - ')}` : ''}`}</title>
        <meta name='robots' content='noindex, nofollow' key='robots' />
      </Head>
    )
  }
  return null
})

export default Meta
