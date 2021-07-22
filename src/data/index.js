import fs from 'fs'

/**
 * Get standardized data as static `pageProps` for a slug-referenced page in `/src/pages`.
 * @param {string} pageSlug The slug for the simple page path to get data for.
 * @param {bool} hasExtras Boolean flag to indicate this page has self-titled extras.
 * @return {object}
 */
export async function getData (pageSlug, hasExtras = false) {
  const rawGlobalData = fs.readFileSync('./data/globals/index.json')
  const globals = JSON.parse(rawGlobalData)

  const rawMenusData = fs.readFileSync('./data/menus/index.json')
  const menus = JSON.parse(rawMenusData)

  const rawPageData = fs.readFileSync(`./data/pages${pageSlug ? `/${pageSlug}` : ''}/index.json`)
  const page = JSON.parse(rawPageData)

  if (page && hasExtras) {
    const rawExtraData = fs.readFileSync(`./data/${pageSlug}/index.json`)
    const extras = JSON.parse(rawExtraData)
    page.extras = { [pageSlug]: extras }
  }

  return {
    props: {
      globals,
      page,
      menus
    }
  }
}
