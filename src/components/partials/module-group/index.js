import { memo } from 'react'

import dynamic from 'next/dynamic'

const moduleTypes = {
  content: dynamic(() => import('@/modules/content')),
  'content-blocks': dynamic(() => import('@/modules/content-blocks')),
  education: dynamic(() => import('@/modules/content')),
  experience: dynamic(() => import('@/modules/experience')),
  form: dynamic(() => import('@/modules/form')),
  works: dynamic(() => import('@/modules/works'))
}

const ModuleGroup = memo(({ moduleGroup, extras }) => {
  if (moduleGroup && moduleGroup.modules && moduleGroup.modules.length) {
    const modules = moduleGroup.modules

    return (
      <>
        {modules.map((module, i) => {
          const DynamicModule = moduleTypes[module.type]
          return <DynamicModule key={module.title} moduleData={module} {...extras} />
        })}
      </>
    )
  }
  return null
})

export default ModuleGroup
