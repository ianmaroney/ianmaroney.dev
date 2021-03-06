import { getData } from '@/data'

import Main from '@/layouts/main'

const Experience = (props) => {
  return (
    <Main {...props} />
  )
}

export async function getStaticProps (context) {
  return getData('experience', true)
}

export default Experience
