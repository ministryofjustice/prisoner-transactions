import { FindRecipientsForm } from 'forms'

export default class FindRecipientsView {
  constructor(
    private readonly findRecipientsForm: FindRecipientsForm,
    private readonly errors?: Array<Record<string, string>>
  ) {}

  get renderArgs(): { form: FindRecipientsForm; errors: Array<Record<string, string>> } {
    return {
      form: this.findRecipientsForm,
      errors: this.errors || [],
    }
  }
}
