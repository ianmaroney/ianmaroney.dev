import { getData } from '@/data'

import Main from '@/layouts/main'

const Work = (props) => {
  return (
    <Main {...props} />
  )
}

export async function getStaticProps (context) {
  return getData('works', true)
}

export default Work
