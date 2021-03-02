import { memo } from 'react'

import HTMLRender from '@/partials/html-render'
import ContentRender from '@/partials/content-render'

import { stringToSlug } from '@/util'

import styles from './index.module.scss'

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const Experience = memo(({ type, items }) => {
  if (items && items.length) {
    return (
      <div className={`grid ${styles.experience}`}>
        {items.map((item, i) => {
          const start = new Date(item.start)
          const end = item.end ? new Date(item.end) : undefined

          return (
            <div className={`cell _12 ${styles.block}`} key={`${item.company}-${item.role}`}>
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
        })}
      </div>
    )
  }
  return null
})

const ModuleExperience = memo(({ moduleData, experience }) => {
  if (moduleData) {
    const experienceType = stringToSlug(moduleData.title)

    return (
      <section id={stringToSlug(moduleData.title)}>
        <header>
          <HTMLRender tag='h1' content={moduleData.heading} />
          <ContentRender content={moduleData.content} />
          <Experience type={experienceType} items={experience[experienceType]} />
        </header>
      </section>
    )
  }
  return null
})

export default ModuleExperience
