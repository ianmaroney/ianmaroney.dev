import { memo, useRef } from 'react'

import { stringToSlug } from '@/util'

import HTMLRender from '@/partials/html-render'

const Field = memo(({ title, type, size, control, errors, attributes }) => {
  if (title && type && size) {
    const DyanmicField = type === 'textarea' ? 'textarea' : 'input'
    const register = useRef(null)
    const typeAttr = type === 'textarea' ? undefined : type
    const name = stringToSlug(title, '_')
    const id = stringToSlug(`${title} Input`)

    return (
      <div className={`cell ${size}${errors && errors[name] ? ' err' : ''} field`}>
        <DyanmicField type={typeAttr} id={id} name={name} ref={register} {...attributes} />
        <HTMLRender tag='label' content={title} tagAttr={{ htmlFor: id }} />
        {errors && errors[name] ? <p>{errors[name]}</p> : null}
      </div>
    )
  }
  return null
})

const Fields = memo(({ fields, control, register, errors }) => {
  return (
    <div className='grid fields'>
      {fields.map((field, i) => <Field key={field.title} control={control} register={register} errors={errors} {...field} />)}

      <div className='cell _12 field submit align-right'>
        <input type='submit' className='button' value='Send' />
      </div>
    </div>
  )
})

const Form = ({ fields, success, error }) => {
  if (fields && fields.length) {
    return (
      <form id='contact' onSubmit={() => console.log('submit')}>
        <fieldset>
          <legend>Hey Ian!</legend>

          <Fields fields={fields} control={() => {}} />
        </fieldset>
      </form>
    )
  }
  return null
}

module.exports = Form
