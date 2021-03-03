import { memo } from 'react'

import HTMLRender from '@/partials/html-render'
import ContentRender from '@/partials/content-render'

import { stringToSlug } from '@/util'

const ModuleContent = memo(({ moduleData, children }) => {
  if (moduleData) {
    const headingTag = moduleData.hero ? 'h1' : 'h2'

    return (
      <section id={stringToSlug(moduleData.title)}>
        <header>
          <HTMLRender tag={headingTag} content={moduleData.heading} />
          <ContentRender content={moduleData.content} />
          {children}
        </header>
      </section>
    )
  }
  return null
})

export default ModuleContent
