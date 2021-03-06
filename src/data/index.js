import fs from 'fs'

export async function getData (pageSlug, hasExtras = false) {
  const rawGlobalData = fs.readFileSync('./data/globals/index.json')
  const globals = JSON.parse(rawGlobalData)

  const rawMenusData = fs.readFileSync('./data/menus/index.json')
  const menus = JSON.parse(rawMenusData)

  const rawPageData = fs.readFileSync(`./data/pages${pageSlug ? `/${pageSlug}` : ''}/index.json`)
  const page = JSON.parse(rawPageData)

  if (page && hasExtras) {
    const rawExtraData = fs.readFileSync(`./data/${pageSlug}/index.json`)
    if (rawExtraData) {
      const extras = JSON.parse(rawExtraData)
      page.extras = { [pageSlug]: extras }
    }
  }

  // console.log('getData page', page)

  return {
    props: {
      globals,
      page,
      menus
    }
  }
}
