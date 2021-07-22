import { getData } from '@/data'

import Main from '@/layouts/main'

/**
 * The `/contact/` page.
 * @param {object} props Page props.
 * @return {node}
 */
const Contact = (props) => {
  return (
    <Main {...props} />
  )
}

/**
 * Get all props for the `/contact/` page.
 * @param {object} props Page props.
 * @return {node}
 */
export async function getStaticProps (context) {
  return getData('contact')
}

export default Contact
