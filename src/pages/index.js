import { getData } from '@/data'

import Main from '@/layouts/main'

/**
 * The `/` page.
 * @param {object} props Page props.
 * @return {node}
 */
const Home = (props) => {
  return (
    <Main {...props} />
  )
}

/**
 * Get all props for the `/` page.
 * @param {object} props Page props.
 * @return {node}
 */
export async function getStaticProps (context) {
  return getData()
}

export default Home
