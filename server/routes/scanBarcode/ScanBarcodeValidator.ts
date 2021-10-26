import { Request } from 'express'
import type { ScanBarcodeForm } from 'forms'

export default async function validate(
  form: ScanBarcodeForm,
  req: Request,
  submitService: (scanBarcodeForm: ScanBarcodeForm) => Promise<void>
): Promise<string> {
  const errors: Array<Record<string, string>> = []

  if (!form.barcode) {
    errors.push({ href: '#barcode', text: 'Please scan a barcode' })
  }

  if (errors.length > 0) {
    req.flash('errors', errors)
    return '/scan-barcode'
  }

  try {
    await submitService(form)
  } catch (error) {
    if (error.status === 401) {
      req.flash('errors', [{ href: '', text: 'Your session has expired - please sign-in again' }])
      return '/'
    }
    if (error.status === 404) {
      return '/barcode-invalid'
    }
    req.flash('errors', [{ href: '', text: 'An unexpected error occurred: $error' }])
    return '/scan-barcode'
  }

  req.session.scanBarcodeForm = {}
  return `/barcode-ok`
}
