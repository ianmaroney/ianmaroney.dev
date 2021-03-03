import { memo } from 'react'

import Form from '@/partials/form'
import ModuleContent from '@/modules/content'

const ModuleForm = memo(({ moduleData }) => {
  if (moduleData) {
    return (
      <ModuleContent moduleData={moduleData}>
        <Form fields={moduleData.fields} success={moduleData.success} error={moduleData.error} />
      </ModuleContent>
    )
  }
  return null
})

export default ModuleForm
