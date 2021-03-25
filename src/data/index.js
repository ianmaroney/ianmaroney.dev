import { readFile } from 'fs/promises'

export async function getData (pageSlug, hasExtras = false) {
  const promises = [
    readFile('./data/globals/index.json').then(result => JSON.parse(result)),
    readFile('./data/menus/index.json').then(result => JSON.parse(result)),
    readFile(`./data/pages${pageSlug ? `/${pageSlug}` : ''}/index.json`).then(result => JSON.parse(result))
  ]

  if (pageSlug && hasExtras) {
    promises.push(readFile(`./data/${pageSlug}/index.json`).then(result => JSON.parse(result)))
  }

  const results = await Promise.all(promises)

  return {
    props: {
      globals: results[0],
      menus: results[1],
      page: { ...results[2], extras: (pageSlug && hasExtras ? { [pageSlug]: results[3] } : null) }
    }
  }
}
