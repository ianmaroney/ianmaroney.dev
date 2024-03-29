import Form from '@/partials/form'
import ModuleContent from '@/modules/content'

/**
 * Adding to `<ModuleContent />`, this adds a contact `<form />`.
 * @param {object} moduleData The module's data.
 * @return {node}
 */
const ModuleForm = ({ moduleData }) => {
  if (moduleData) {
    return (
      <ModuleContent moduleData={moduleData}>
        <Form fields={moduleData.fields} success={moduleData.success} error={moduleData.error} user={moduleData.user || 'user_5qUsnZBvRKWTm0OUW7SD9'} />
      </ModuleContent>
    )
  }
  return null
}

export default ModuleForm
