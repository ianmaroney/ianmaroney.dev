import { memo } from 'react'

import Meta from '@/partials/meta'
import Header from '@/layouts/header'
import Footer from '@/layouts/footer'

/**
 * Wrap page components with a site-wide template.
 * @param {object} page Page data.
 * @param {object} globals Site-wide global data.
 * @param {object} menus Menu data.
 * @param {node} page Page component from within `/src/pages`.
 * @return {node}
 */
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
