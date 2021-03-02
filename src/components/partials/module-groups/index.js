import { memo } from 'react'

import ModuleGroup from '@/partials/module-group'

const ModuleGroups = memo(({ page }) => {
  if (page && page.moduleGroups && page.moduleGroups.length) {
    return (
      <>
        {page.moduleGroups.map((moduleGroup, i) => <ModuleGroup key={`module-group-${i}`} moduleGroup={moduleGroup} extras={page.extras} />)}
      </>
    )
  }
  return null
})

export default ModuleGroups
