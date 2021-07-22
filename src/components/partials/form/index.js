import { useState, useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import emailjs, { init } from 'emailjs-com'

import HTMLRender from '@/partials/html-render'

import { stringToSlug, nl2br } from '@/util'

import styles from './index.module.scss'

/**
 * A field within the contact `<form />` grid of fields.
 * @param {string} title The field's title.
 * @param {string} type The field's type attribute.
 * @param {string} size The field's container class. Controls grid sizing.
 * @param {object} control Object of methods for registering components from `react-hook-form`
 * @param {func} register Function for registering a field from `react-hook-form`
 * @param {object} errors Object containing validation errors.
 * @param {object} attributes Object additional attributes to pass to the field node.
 * @return {node}
 */
const Field = ({ title, type, size, control, register, errors, attributes }) => {
  const DyanmicField = type === 'textarea' ? 'textarea' : 'input'
  const typeAttr = type === 'textarea' ? undefined : type
  const name = stringToSlug(title, '_')
  const id = stringToSlug(`${title} Input`)
  const value = useWatch({ control, name, defaultValue: '' })

  const registerObj = Object.assign({}, attributes)
  if (type === 'email') {
    registerObj.pattern = {
      value: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
      message: 'A valid email address is required.'
    }
  }

  if (attributes.maxLength && typeof attributes.maxLength === 'object' && attributes.maxLength.value) attributes.maxLength = parseInt(attributes.maxLength.value)

  return (
    <div className={`cell ${size}${errors && errors[name] ? ' err' : ''} field`}>
      <DyanmicField type={typeAttr} className={value ? 'filled' : undefined} id={id} name={name} ref={register(registerObj)} {...attributes} aria-invalid={errors && errors[name] ? true : undefined} />
      <HTMLRender tag='label' content={title} tagAttr={{ htmlFor: id }} />
      {errors && errors[name] ? <ErrorMessage errors={errors} name={name} render={({ message }) => <p className='error'>{message}</p>}/> : null}
    </div>
  )
}

/**
 * Send the content of the `<form />` via `emailjs`. Handles errors as well.
 * @param {string} name The name field value.
 * @param {string} email The email field value.
 * @param {string} message The message field value.
 * @param {func} setSuccess setter from useState responsible for success state.
 * @param {func} setError setter from useState responsible for error state.
 * @return {promise}
 */
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

/**
 * The grid of fields within the contact `<form />`.
 * @param {array} fields Array of field objects.
 * @param {object} control Object of methods for registering components from `react-hook-form`
 * @param {func} register Function for registering a field from `react-hook-form`
 * @param {object} errors Object containing validation errors.
 * @return {node}
 */
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

/**
 * The outcome message for the `<form />`.
 * @param {string} emailError A single form validation error message.
 * @param {object} error An object of error outcome message data.
 * @param {object} success An object of success outcome message data.
 * @param {func} setEmailSuccess setter from useState responsible for success state.
 * @param {func} setEmailError setter from useState responsible for error state.
 * @param {func} reset The reset function from `react-hook-form`.
 * @return {node}
 */
const Outcome = ({ emailError, error, success, setEmailSuccess, setEmailError, reset }) => {
  const heading = emailError ? error.heading : success.heading
  const content = emailError ? `${error.content} <p class='error'>${emailError}</p>` : success.content
  const cta = emailError ? 'Try Again' : 'Send Another'

  return (
    <div className={styles.outcome}>
      <header>
        <HTMLRender tag='h2' content={heading} />
        <HTMLRender content={content} />
        <p><button className='button' onClick={() => { setEmailSuccess(undefined); setEmailError(undefined); reset() }}>{cta}</button></p>
      </header>
    </div>
  )
}

/**
 * The contact `<form />` on the `/contact/` page. Sends a email with the form data via emailjs.
 * @param {array} fields Array of form field objects.
 * @param {object} success An object of success outcome message data.
 * @param {object} error An object of error outcome message data.
 * @param {string} user The user id to initialize emailjs with.
 * @return {node}
 */
const Form = ({ fields, success, error, user }) => {
  const { control, register, handleSubmit, errors, reset } = useForm()
  const [emailSuccess, setEmailSuccess] = useState()
  const [emailError, setEmailError] = useState()

  useEffect(() => {
    init(user)
  }, [user])

  if (fields && fields.length) {
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
