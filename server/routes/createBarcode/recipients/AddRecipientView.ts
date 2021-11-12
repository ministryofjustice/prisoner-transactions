import { AddRecipientForm } from 'forms'

export default class AddRecipientView {
  constructor(
    private readonly addRecipientForm: AddRecipientForm,
    private readonly errors?: Array<Record<string, string>>
  ) {}

  get renderArgs(): { form: AddRecipientForm; errors: Array<Record<string, string>> } {
    return {
      form: this.addRecipientForm,
      errors: this.errors || [],
    }
  }
}
