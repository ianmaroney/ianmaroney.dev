import dynamic from 'next/dynamic'

const moduleTypes = {
  content: dynamic(() => import('@/modules/content')),
  'content-blocks': dynamic(() => import('@/modules/content-blocks')),
  education: dynamic(() => import('@/modules/content')),
  experience: dynamic(() => import('@/modules/experience')),
  form: dynamic(() => import('@/modules/form')),
  works: dynamic(() => import('@/modules/works'))
}

/**
 * Loop through and return an array of dynamically loaded page modules, within a module group.
 * @param {object} moduleGroup The moduleGroup data data.
 * @return {node}
 */
const ModuleGroup = ({ moduleGroup, extras }) => {
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
}

export default ModuleGroup
