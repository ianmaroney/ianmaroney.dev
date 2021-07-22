import { getData } from '@/data'

import Main from '@/layouts/main'

/**
 * The 404 page.
 * @param {object} props Page props.
 * @return {node}
 */
const FourOhFour = (props) => {
  return (
    <Main {...props} />
  )
}

/**
 * Get all props for the 404 page.
 * @param {object} props Page props.
 * @return {node}
 */
export async function getStaticProps (context) {
  return getData('404')
}

export default FourOhFour
