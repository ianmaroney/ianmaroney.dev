import { getData } from '@/data'

import Main from '@/layouts/main'

/**
 * The `/works` page.
 * @param {object} props Page props.
 * @return {node}
 */
const Work = (props) => {
  return (
    <Main {...props} />
  )
}

/**
 * Get all props for the `/works` page.
 * @param {object} props Page props.
 * @return {node}
 */
export async function getStaticProps (context) {
  return getData('works', true)
}

export default Work
