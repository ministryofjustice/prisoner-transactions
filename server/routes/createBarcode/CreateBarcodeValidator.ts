import { Request } from 'express'
import type { CreateBarcodeForm } from 'forms'

export default async function validate(
  form: CreateBarcodeForm,
  req: Request,
  submitService: (createBarcodeForm: CreateBarcodeForm) => Promise<Buffer>
): Promise<string> {
  const errors: Array<Record<string, string>> = []

  if (!form.prisoner) {
    errors.push({ href: '#prisoner', text: 'Enter a prisoner number' })
  }

  if (errors.length > 0) {
    req.flash('errors', errors)
    return '/barcode/create-barcode'
  }

  try {
    const barcodeImageBuffer = await submitService(form)
    req.session.barcodeImageUrl = `data:image/png;base64,${barcodeImageBuffer.toString('base64')}`
  } catch (error) {
    if (error.status === 401) {
      req.flash('errors', [{ href: '', text: 'Your session has expired - please request a new link' }])
      return '/link/request-link'
    }
    req.flash('errors', [{ href: '', text: 'An unexpected error occurred: $error' }])
    return '/barcode/create-barcode'
  }

  return `/barcode/display-barcode`
}
