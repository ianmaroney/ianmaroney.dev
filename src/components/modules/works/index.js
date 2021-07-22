// import Image from 'next/image'

import { stringToSlug } from '@/util'

import HTMLRender from '@/partials/html-render'
import ModuleContent from '@/modules/content'
import useSecretCode from '@/hooks/use-secret-code'

import styles from '../content-blocks/index.module.scss'
import workStyles from './index.module.scss'

/**
 * A titled link in element within a project.
 * @param {link} object The link data.
 * @return {node}
 */
const WorkLink = ({ link }) => {
  return (
    <div className='cell _12 smmd_6'>
      <HTMLRender tag='h3' content={link.title} />
      <p><a href={link.url} target='_blank' rel='noopener noreferrer'>{link.label}</a></p>
    </div>
  )
}

/**
 * A grid of titled links within a project in the grid of projects.
 * @param {array} links An array of link objects.
 * @return {node}
 */
const WorkLinks = ({ links }) => {
  if (links && links.length) {
    return (
      <div className='grid links'>
        {links.map((link, i) => <WorkLink key={link.title} link={link} />)}
      </div>
    )
  }
  return null
}

/**
 * A project in the grid of projects.
 * @param {item} object The project data.
 * @return {node}
 */
const Work = ({ work }) => {
  const slug = stringToSlug(`${work.client} ${work.project}`)

  return (
    <article id={slug} className={`cell _12 ${styles.block} ${workStyles.work}`}>
      <div className='inner'>
        <header>
          <HTMLRender tag='h2' content={work.client} />
          <HTMLRender tag='p' tagAttr={{ className: 'soft' }} content={work.project} />
        </header>
        <HTMLRender content={work.content} />
        <WorkLinks links={work.links} />
      </div>
    </article>
  )
}

/**
 * The grid of projects.
 * @param {object} experience The array of projects.
 * @return {node}
 */
const Works = ({ works }) => {
  const showSecret = useSecretCode(['KeyP', 'KeyS', 'KeyS', 'KeyT', 'Enter'])

  if (works && works.length) {
    return (
      <div className={`grid ${styles.blocks}`} aria-live='polite' aria-relevant='additions'>
        {works.map((work, i) => {
          if (!work.hidden || showSecret) {
            return <Work key={`${work.client}-${work.role}`} work={work} />
          }
          return null
        })}
      </div>
    )
  }
  return null
}

/**
 * Adding to `<ModuleContent />`, this adds a configurable flexbox grid of projects.
 * @param {object} moduleData The module's data.
 * @param {array} works An array of project objects.
 * @return {node}
 */
const ModuleWorks = ({ moduleData, works }) => {
  if (moduleData) {
    return (
      <ModuleContent moduleData={moduleData}>
        <Works works={works} />
      </ModuleContent>
    )
  }
  return null
}

export default ModuleWorks
