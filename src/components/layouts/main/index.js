import ModuleGroups from '@/partials/module-groups'

import styles from './index.module.scss'

const Main = ({ page }) => {
  if (page && page.moduleGroups) {
    return (
      <main className={`${styles.main} ${page.slug}`}>
        <div className='container'>
          <ModuleGroups page={page} />
        </div>
      </main>
    )
  }
  return null
}

export default Main
