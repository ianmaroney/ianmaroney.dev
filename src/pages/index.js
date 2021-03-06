import { getData } from '@/data'

import Main from '@/layouts/main'

const Home = (props) => {
  return (
    <Main {...props} />
  )
}

export async function getStaticProps (context) {
  return getData()
}

export default Home
