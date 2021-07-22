import HTMLRender from '@/partials/html-render'

import { stringToSlug } from '@/util'

/**
 * The simplest module. Renders a `<Section />` containing a `<header />`, some HTML content, and possibly a child node.
 * @param {object} moduleData The module's data.
 * @param {node} children Any child node.
 * @return {node}
 */
const ModuleContent = ({ moduleData, children }) => {
  if (moduleData) {
    const headingTag = moduleData.hero ? 'h1' : 'h2'

    return (
      <section id={stringToSlug(moduleData.title)}>
        <header>
          <HTMLRender tag={headingTag} content={moduleData.heading} />
        </header>
        <HTMLRender content={moduleData.content} />
        {children}
      </section>
    )
  }
  return null
}

export default ModuleContent
