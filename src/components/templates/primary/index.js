import { memo } from 'react'

import Meta from '@/partials/meta'
import Header from '@/layouts/header'
import Footer from '@/layouts/footer'

const Primary = ({ page, globals, menus, children }) => {
  if (page && children) {
    return (
      <>
        <Meta page={page} globals={globals} />
        <Header menus={menus} />
        {children}
        <Footer />
      </>
    )
  }
  return null
}

export default memo(Primary)
