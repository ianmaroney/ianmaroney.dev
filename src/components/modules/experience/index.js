import HTMLRender from '@/partials/html-render'
import ContentRender from '@/partials/content-render'
import ModuleContent from '@/modules/content'

import { stringToSlug } from '@/util'

import styles from '../content-blocks/index.module.scss'
import experienceStyles from './index.module.scss'

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const Experience = ({ item }) => {
  const start = new Date(item.start)
  const end = item.end ? new Date(item.end) : undefined

  return (
    <div className={`cell _12 ${styles.block} ${experienceStyles.experience}`}>
      <div className='inner'>
        <header>
          <HTMLRender tag='h2' content={item.company} />
          <HTMLRender tag='p' content={item.role} />
          <HTMLRender tag='p' content={`<em class='soft'>${item.location} | ${`${monthNames[start.getMonth()]} ${start.getFullYear()} - ${end ? `${monthNames[end.getMonth()]} ${end.getFullYear()}` : 'Current'}`}</em>`} />
        </header>

        <ContentRender content={item.content} />
      </div>
    </div>
  )
}

const Experiences = ({ type, items }) => {
  if (items && items.length) {
    return (
      <div className={`grid ${styles.blocks}`}>
        {items.map((item, i) => <Experience key={`${item.company}-${item.role}`} item={item} />)}
      </div>
    )
  }
  return null
}

const ModuleExperience = ({ moduleData, experience }) => {
  if (moduleData) {
    const experienceType = stringToSlug(moduleData.title)

    return (
      <ModuleContent moduleData={moduleData}>
        {experience && experienceType && experience[experienceType] ? <Experiences type={experienceType} items={experience[experienceType]} /> : null}
      </ModuleContent>
    )
  }
  return null
}

export default ModuleExperience
