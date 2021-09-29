import { Request } from 'express'
import type { CreateBarcodeForm } from 'forms'

export default async function validate(
  form: CreateBarcodeForm,
  req: Request,
  submitService: (createBarcodeForm: CreateBarcodeForm) => Promise<string>
): Promise<string> {
  const errors: Array<Record<string, string>> = []

  if (!form.prisoner) {
    errors.push({ href: '#prisoner', text: 'Enter a prisoner number' })
  }

  if (errors.length > 0) {
    req.flash('errors', errors)
    return '/create-barcode'
  }

  const barcode = submitService(form)

  return `/display-barcode?barcode=${barcode}`
}
