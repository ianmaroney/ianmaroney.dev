import HTMLRender from '@/partials/html-render'
import ModuleContent from '@/modules/content'

import styles from './index.module.scss'

/**
 * A block element.
 * @param {array} block The block's data.
 * @param {string} headingTag The HTML element to be used to set the heading in.
 * @param {string} blockSize The className to set the block's grid sizing.
 * @return {node}
 */
const Block = ({ block, headingTag, blockSize }) => {
  return (
    <div className={`cell ${styles.block} ${blockSize}`}>
      <header>
        <HTMLRender tag={headingTag} content={block.heading} />
      </header>
      <HTMLRender content={block.content} />
    </div>
  )
}

/**
 * Check for blocks data and return a grid of blocks.
 * @param {array} blocks The array of block objects.
 * @param {bool} hero A flag to set the wrapping element used for the block's heading.
 * @param {string} blockSize The class names to be applied to the block.
 * @return {node}
 */
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

/**
 * Adding to `<ModuleContent />`, this adds in a set of simple similarly structured blocks in a mostly two-up grid.
 * @param {object} moduleData The module's data.
 * @return {node}
 */
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
