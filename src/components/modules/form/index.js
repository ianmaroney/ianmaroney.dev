import { memo } from 'react'

import HTMLRender from '@/partials/html-render'
import ContentRender from '@/partials/content-render'
import Form from '@/partials/form'

import { stringToSlug } from '@/util'

const ModuleForm = memo(({ moduleData }) => {
  if (moduleData) {
    const headingTag = moduleData.hero ? 'h1' : 'h2'

    return (
      <section id={stringToSlug(moduleData.title)}>
        <header>
          <HTMLRender tag={headingTag} content={moduleData.heading} />
          <ContentRender content={moduleData.content} />
          <Form fields={moduleData.fields} success={moduleData.success} error={moduleData.error} />
        </header>
      </section>
    )
  }
  return null
})

export default ModuleForm
