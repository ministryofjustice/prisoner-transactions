import type { CreateBarcodeForm } from 'forms'

export default class CreateBarcodeView {
  constructor(
    private readonly createBarcodeForm: CreateBarcodeForm,
    private readonly errors?: Array<Record<string, string>>
  ) {}

  get renderArgs(): { form: CreateBarcodeForm; errors: Array<Record<string, string>> } {
    return {
      form: this.createBarcodeForm,
      errors: this.errors || [],
    }
  }
}
