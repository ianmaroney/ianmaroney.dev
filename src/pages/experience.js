import { memo } from 'react'

import { getData } from '@/data'

import Main from '@/layouts/main'

const Experience = memo((props) => {
  return (
    <Main {...props} />
  )
})

export async function getStaticProps (context) {
  return getData('experience', true)
}

export default Experience
