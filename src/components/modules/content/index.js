import HTMLRender from '@/partials/html-render'

import { stringToSlug } from '@/util'

const ModuleContent = ({ moduleData, children }) => {
  if (moduleData) {
    const headingTag = moduleData.hero ? 'h1' : 'h2'

    return (
      <section id={stringToSlug(moduleData.title)}>
        <header>
          <HTMLRender tag={headingTag} content={moduleData.heading} />
        </header>
        <HTMLRender content={moduleData.content} manipulateNodes />
        {children}
      </section>
    )
  }
  return null
}

export default ModuleContent
