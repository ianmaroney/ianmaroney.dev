import { memo } from 'react'
import fs from 'fs'

import Main from '@/layouts/main'

const Experience = memo((props) => {
  return (
    <Main {...props} />
  )
})

export async function getStaticProps (context) {
  const rawGlobalData = fs.readFileSync('./data/globals/index.json')
  const globalData = JSON.parse(rawGlobalData)

  const rawPageData = fs.readFileSync('./data/pages/experience/index.json')
  const pageData = JSON.parse(rawPageData)

  const rawMenusData = fs.readFileSync('./data/menus/index.json')
  const menusData = JSON.parse(rawMenusData)

  const rawExperienceData = fs.readFileSync('./data/experience/index.json')
  const experienceData = JSON.parse(rawExperienceData)

  return {
    props: {
      globals: globalData,
      page: {
        extras: {
          experience: experienceData
        },
        ...pageData
      },
      menus: menusData
    }
  }
}

export default Experience
