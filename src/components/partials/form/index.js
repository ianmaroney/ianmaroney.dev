import { useState, useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import emailjs, { init } from 'emailjs-com'

import HTMLRender from '@/partials/html-render'

import { stringToSlug, nl2br } from '@/util'

import styles from './index.module.scss'

const Field = ({ title, type, size, control, register, errors, attributes }) => {
  if (title && type && size) {
    const DyanmicField = type === 'textarea' ? 'textarea' : 'input'
    const typeAttr = type === 'textarea' ? undefined : type
    const name = stringToSlug(title, '_')
    const id = stringToSlug(`${title} Input`)
    const value = useWatch({ control, name, defaultValue: '' })

    const registerObj = Object.assign({}, attributes)

    return (
      <div className={`cell ${size}${errors && errors[name] ? ' err' : ''} field`}>
        <DyanmicField type={typeAttr} className={value ? 'filled' : undefined} id={id} name={name} ref={register(registerObj)} {...attributes} aria-invalid={errors && errors[name] ? true : undefined} />
        <HTMLRender tag='label' content={title} tagAttr={{ htmlFor: id }} />
        {errors && errors[name] ? <p>{errors[name]}</p> : null}
      </div>
    )
  }
  return null
}

const sendFormEmail = (name, email, message, setSuccess, setError, reset) => {
  const templateParams = {
    from_name: name,
    from_email: email,
    reply_to: email,
    message
  }

  return emailjs.send('service_7h3iicl', 'template_lgsav5b', templateParams)
    .then(function (response) {
      setSuccess(true)
      reset()
    }, function (error) {
      setError(error)
      reset()
    })
}

const Fields = ({ fields, control, register, errors }) => {
  return (
    <div className='grid fields'>
      {fields.map((field, i) => <Field key={field.title} control={control} register={register} errors={errors} {...field} />)}

      <div className='cell _12 field submit align-right'>
        <input type='submit' className='button' value='Send' />
      </div>
    </div>
  )
}

const Outcome = ({ emailError, error, success, setEmailSuccess, setEmailError, reset }) => {
  const heading = emailError ? error.heading : success.heading
  const content = emailError ? `${error.content} <p class='error'>${emailError}</p>` : success.content
  const cta = emailError ? 'Try Again' : 'Send Another'

  if (heading && content) {
    return (
      <div className={styles.outcome}>
        <header>
          <HTMLRender tag='h2' content={heading} />
          <HTMLRender content={content} manipulateNodes />
          <p><button className='button' onClick={() => { setEmailSuccess(undefined); setEmailError(undefined); reset() }}>{cta}</button></p>
        </header>
      </div>
    )
  }
}

const Form = ({ fields, success, error }) => {
  const [emailSuccess, setEmailSuccess] = useState()
  const [emailError, setEmailError] = useState()

  useEffect(() => {
    init('user_5qUsnZBvRKWTm0OUW7SD9')
  }, [])

  if (fields && fields.length) {
    const { control, register, handleSubmit, errors, reset } = useForm()
    const onSubmit = ({ name, email, message }) => sendFormEmail(name, email, nl2br(message), setEmailSuccess, setEmailError, reset)

    if (emailSuccess || emailError) {
      return <Outcome emailError={emailError} error={error} success={success} setEmailSuccess={setEmailSuccess} setEmailError={setEmailError} reset={reset} />
    } else {
      return (
        <form id='contact' className={styles.form} onSubmit={handleSubmit(onSubmit)} role='form'>
          <fieldset>
            <legend>Hey Ian!</legend>

            <Fields fields={fields} register={register} errors={errors} control={control} />
          </fieldset>
        </form>
      )
    }
  }
  return null
}

export default Form
