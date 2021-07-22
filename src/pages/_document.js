import Document, { Html, Head, Main, NextScript } from 'next/document'

/**
 * Customize the site-wide HTML template.
 * @return {node}
 */
class MyDocument extends Document {
  render () {
    return (
      <Html lang='en'>
        <Head>
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='true' />
          <link rel='apple-touch-icon' sizes='180x180' href='/images/apple-touch-icon.png' />
          <link rel='icon' type='image/png' sizes='32x32' href='/images/favicon-32x32.png' />
          <link rel='icon' type='image/png' sizes='16x16' href='/images/favicon-16x16.png' />
          <link rel='manifest' href='/site.webmanifest' />
          <link rel='mask-icon' href='/images/safari-pinned-tab.svg' color='#333333' />
          <link rel='shortcut icon' href='/favicon.ico' />
          <meta name='msapplication-TileColor' content='#ffffff' />
          <meta name='msapplication-config' content='/browserconfig.xml' />
          <meta name='theme-color' content='#ffffff' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
