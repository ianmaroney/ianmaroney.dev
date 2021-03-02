import { memo } from 'react'
import fs from 'fs'

import Main from '@/layouts/main'

const Work = memo((props) => {
  return (
    <Main {...props} />
  )
})

export async function getStaticProps (context) {
  const rawGlobalData = fs.readFileSync('./data/globals/index.json')
  const globalData = JSON.parse(rawGlobalData)

  const rawPageData = fs.readFileSync('./data/pages/works/index.json')
  const pageData = JSON.parse(rawPageData)

  const rawMenusData = fs.readFileSync('./data/menus/index.json')
  const menusData = JSON.parse(rawMenusData)

  const rawWorksData = fs.readFileSync('./data/works/index.json')
  const worksData = JSON.parse(rawWorksData)

  return {
    props: {
      globals: globalData,
      page: {
        extras: {
          works: worksData
        },
        ...pageData
      },
      menus: menusData,
      works: worksData
    }
  }
}

export default Work
