import { Request } from 'express'
import type { RequestLinkForm } from 'forms'

export default async function validate(
  form: RequestLinkForm,
  req: Request,
  submitService: (requestLinkForm: RequestLinkForm) => Promise<void>
): Promise<string> {
  const errors: Array<Record<string, string>> = []

  if (!form.email) {
    errors.push({ '#email': 'Enter an email address' })
  }

  if (errors.length > 0) {
    req.flash('errors', errors)
    return '/request-link'
  }

  submitService(form)

  // TODO need a new "link sent to email" page to redirect to
  return '/request-link'
}
