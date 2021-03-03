import { memo } from 'react'

import { getData } from '@/data'

import Main from '@/layouts/main'

const FourOhFour = memo((props) => {
  return (
    <Main {...props} />
  )
})

export async function getStaticProps (context) {
  return getData('404')
}

export default FourOhFour
