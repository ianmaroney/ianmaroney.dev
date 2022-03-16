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
        <meta name='robots' content='noindex, nofollow' key='robots' />
        <link rel='preconnect' href='https://fonts.googleapis.com' key='gfont-apis' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='true' key='gfont-static' />
        <link rel='apple-touch-icon' sizes='180x180' href='/images/apple-touch-icon.png' key='icon-180x180' />
        <link rel='icon' type='image/png' sizes='32x32' href='/images/favicon-32x32.png' key='icon-32x32' />
        <link rel='icon' type='image/png' sizes='16x16' href='/images/favicon-16x16.png' key='icon-16x16' />
        <link rel='manifest' href='/site.webmanifest' key='webmanifest' />
        <link rel='mask-icon' href='/images/safari-pinned-tab.svg' color='#333333' key='mask-icon' />
        <link rel='shortcut icon' href='/favicon.ico' key='favicon' />
        <meta name='msapplication-TileColor' content='#ffffff' key='ms-tileColor' />
        <meta name='msapplication-config' content='/browserconfig.xml' key='ms-config' />
        <meta name='theme-color' content='#ffffff' key='theme-color' />
      </Head>
    )
  }
  return null
}

export default Meta
