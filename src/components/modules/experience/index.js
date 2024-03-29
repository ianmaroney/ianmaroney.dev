import HTMLRender from '@/partials/html-render'
import ModuleContent from '@/modules/content'

import { stringToSlug } from '@/util'

import styles from '../content-blocks/index.module.scss'
import experienceStyles from './index.module.scss'

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

/**
 * An experience record in the grid of experience records.
 * @param {item} object The experience record data.
 * @param {string} type The type of experience record.
 * @return {node}
 */
const Experience = ({ item, type }) => {
  const start = new Date(item.start)
  const end = item.end ? new Date(item.end) : undefined
  const slug = stringToSlug(item.company)

  return (
    <article id={`${type}-${slug}`} className={`cell _12 ${styles.block} ${experienceStyles.experience}`}>
      <div className='inner'>
        <header>
          <HTMLRender tag='h2' content={item.company} />
          <HTMLRender tag='p' content={item.role} />
          <HTMLRender tag='p' content={`<em class='soft'>${item.location} | ${`${monthNames[start.getMonth()]} ${start.getFullYear()} - ${end ? `${monthNames[end.getMonth()]} ${end.getFullYear()}` : 'Current'}`}</em>`} />
        </header>

        <HTMLRender content={item.content} />
      </div>
    </article>
  )
}

/**
 * The grid of experience records.
 * @param {string} type The experience type to render within the grid.
 * @param {object} experience All experience data.
 * @return {node}
 */
const Experiences = ({ type, experience }) => {
  if (type && experience) {
    const items = experience[type]

    return (
      <div className={`grid ${styles.blocks}`}>
        {items.map((item, i) => <Experience key={`${item.company}-${item.role}`} item={item} type={type} />)}
      </div>
    )
  }
  return null
}

/**
 * Adding to `<ModuleContent />`, this adds a configurable grid of experience records.
 * @param {object} moduleData The module's data.
 * @param {object} experience All experience data.
 * @return {node}
 */
const ModuleExperience = ({ moduleData, experience }) => {
  if (moduleData) {
    const experienceType = stringToSlug(moduleData.title)

    return (
      <ModuleContent moduleData={moduleData}>
        <Experiences type={experienceType} experience={experience} />
      </ModuleContent>
    )
  }
  return null
}

export default ModuleExperience
