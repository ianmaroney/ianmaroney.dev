import ModuleGroup from '@/partials/module-group'

/**
 * Loop through and return an array of page module groups.
 * @param {object} page The Page data.
 * @return {node}
 */
const ModuleGroups = ({ page }) => {
  if (page && page.moduleGroups && page.moduleGroups.length) {
    return (
      <>
        {page.moduleGroups.map((moduleGroup, i) => <ModuleGroup key={`module-group-${i}`} moduleGroup={moduleGroup} extras={page.extras} />)}
      </>
    )
  }
  return null
}

export default ModuleGroups
