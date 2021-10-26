import { Request } from 'express'
import type { RequestLinkForm } from 'forms'

export default async function validate(
  form: RequestLinkForm,
  req: Request,
  submitService: (requestLinkForm: RequestLinkForm) => Promise<void>
): Promise<string> {
  const errors: Array<Record<string, string>> = []

  if (!form.email) {
    errors.push({ href: '#email', text: 'Enter an email address' })
  } else if (!validateEmail(form.email)) {
    errors.push({ href: '#email', text: 'Enter a valid email address' })
  }

  if (errors.length > 0) {
    req.flash('errors', errors)
    return '/link/request-link'
  }

  try {
    await submitService(form)
  } catch (error) {
    req.flash('errors', [{ href: '', text: 'An error occurred sending the email - please try again' }])
    return '/link/request-link'
  }

  req.session.requestLinkForm = {}
  return '/link/email-sent'
}

function validateEmail(email: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email.toLowerCase())
}
