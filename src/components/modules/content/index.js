import HTMLRender from '@/partials/html-render'
import ContentRender from '@/partials/content-render'

import { stringToSlug } from '@/util'

const ModuleContent = ({ moduleData, children }) => {
  if (moduleData) {
    const headingTag = moduleData.hero ? 'h1' : 'h2'

    return (
      <section id={stringToSlug(moduleData.title)}>
        <header>
          <HTMLRender tag={headingTag} content={moduleData.heading} />
        </header>
        <ContentRender content={moduleData.content} />
        {children}
      </section>
    )
  }
  return null
}

export default ModuleContent
