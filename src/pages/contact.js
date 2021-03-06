import { getData } from '@/data'

import Main from '@/layouts/main'

const Contact = (props) => {
  return (
    <Main {...props} />
  )
}

export async function getStaticProps (context) {
  return getData('contact')
}

export default Contact
