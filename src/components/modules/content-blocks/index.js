import { memo } from 'react'

import HTMLRender from '@/partials/html-render'
import ContentRender from '@/partials/content-render'

import { stringToSlug } from '@/util'

import styles from './index.module.scss'

const Blocks = ({ blocks, hero, blockSize = '_12 md_6' }) => {
  if (blocks && blocks.length) {
    const headingTag = hero ? 'h2' : 'h3'

    return (
      <div className={`grid ${styles.blocks}`}>
        {blocks.map((block, i) => {
          return (
            <div className={`cell ${blockSize}`} key={block.title}>
              <header>
                <HTMLRender tag={headingTag} content={block.heading} />
                <ContentRender content={block.content} />
              </header>
            </div>
          )
        })}
      </div>
    )
  }
  return null
}

const ModuleContentBlocks = memo(({ moduleData }) => {
  if (moduleData) {
    const headingTag = moduleData.hero ? 'h1' : 'h2'

    return (
      <section id={stringToSlug(moduleData.title)}>
        <header>
          <HTMLRender tag={headingTag} content={moduleData.heading} />
          <ContentRender content={moduleData.content} />
          <Blocks blocks={moduleData.blocks} hero={moduleData.hero} blockSize={moduleData.blockSize} />
        </header>
      </section>
    )
  }
  return null
})

export default ModuleContentBlocks
