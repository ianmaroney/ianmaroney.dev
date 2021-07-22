import { getData } from '@/data'

import Main from '@/layouts/main'

/**
 * The `/experience/` page.
 * @param {object} props Page props.
 * @return {node}
 */
const Experience = (props) => {
  return (
    <Main {...props} />
  )
}

/**
 * Get all props for the `/experience/` page.
 * @param {object} props Page props.
 * @return {node}
 */
export async function getStaticProps (context) {
  return getData('experience', true)
}

export default Experience
