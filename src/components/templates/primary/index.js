import { memo } from 'react'

import Meta from '@/partials/meta'
import Header from '@/layouts/header'
import Footer from '@/layouts/footer'

const Primary = memo(({ page, globals, menus, children }) => {
  return (
    <>
      <Meta page={page} globals={globals} />
      <Header menus={menus} />
      {children}
      <Footer />
    </>
  )
})

export default Primary
