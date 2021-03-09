import HTMLRender from '@/partials/html-render'
import ModuleContent from '@/modules/content'

import styles from './index.module.scss'

const Block = ({ block, headingTag, blockSize }) => {
  return (
    <div className={`cell ${styles.block} ${blockSize}`}>
      <header>
        <HTMLRender tag={headingTag} content={block.heading} />
      </header>
      <HTMLRender content={block.content} manipulateNodes />
    </div>
  )
}

const Blocks = ({ blocks, hero, blockSize = '_12 md_6' }) => {
  if (blocks && blocks.length) {
    return (
      <div className={`grid ${styles.blocks}`}>
        {blocks.map((block, i) => <Block key={block.title} blockSize={blockSize} headingTag={hero ? 'h2' : 'h3'} block={block} />)}
      </div>
    )
  }
  return null
}

const ModuleContentBlocks = ({ moduleData }) => {
  if (moduleData) {
    return (
      <ModuleContent moduleData={moduleData}>
        <Blocks blocks={moduleData.blocks} hero={moduleData.hero} blockSize={moduleData.blockSize} />
      </ModuleContent>
    )
  }
  return null
}

export default ModuleContentBlocks
