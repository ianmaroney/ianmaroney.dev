import { memo } from 'react'
import fs from 'fs'

import Main from '@/layouts/main'

const Contact = memo((props) => {
  return (
    <Main {...props} />
  )
})

export async function getStaticProps (context) {
  const rawGlobalData = fs.readFileSync('./data/globals/index.json')
  const globalData = JSON.parse(rawGlobalData)

  const rawPageData = fs.readFileSync('./data/pages/contact/index.json')
  const pageData = JSON.parse(rawPageData)

  const rawMenusData = fs.readFileSync('./data/menus/index.json')
  const menusData = JSON.parse(rawMenusData)

  return {
    props: {
      globals: globalData,
      page: pageData,
      menus: menusData
    }
  }
}

export default Contact
