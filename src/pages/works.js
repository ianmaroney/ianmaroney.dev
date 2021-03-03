import { memo } from 'react'

import { getData } from '@/data'

import Main from '@/layouts/main'

const Work = memo((props) => {
  return (
    <Main {...props} />
  )
})

export async function getStaticProps (context) {
  return getData('works', true)
}

export default Work
