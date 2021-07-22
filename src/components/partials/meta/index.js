import Head from 'next/head'

/**
 * Dynamic `<meta />` tags for pages within `/src/pages`.
 * @param {object} page Page data.
 * @param {object} globals Global site-wide data.
 * @return {node}
 */
const Meta = ({ page, globals }) => {
  if (page && page.title) {
    return (
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' key='viewport' />
        <title key='title'>{`${page.title}${globals && globals.titleExtras ? ` - ${globals.titleExtras.join(' - ')}` : ''}`}</title>
        <meta name='robots' content='index, follow' key='robots' />
      </Head>
    )
  }
  return null
}

export default Meta
