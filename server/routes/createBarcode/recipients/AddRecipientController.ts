import { Request, Response } from 'express'
import { AddRecipientForm, Recipient } from 'forms'
import AddRecipientView from './AddRecipientView'

export default class AddRecipientController {
  async getAddRecipientView(req: Request, res: Response): Promise<void> {
    if (!req.session.findRecipientsForm) {
      res.redirect('find-recipients')
      return null
    }

    delete req.session.addRecipientForm
    return this.produceAddRecipientView(req, res)
  }

  private async produceAddRecipientView(req: Request, res: Response): Promise<void> {
    const { findRecipientsForm } = req.session
    const { findByPrisonNumber } = findRecipientsForm

    const prisonerName = findByPrisonNumber ? undefined : findRecipientsForm.prisoner
    const prisonNumber = findByPrisonNumber ? findRecipientsForm.prisoner : undefined

    const addRecipientForm =
      req.session.addRecipientForm ||
      ({
        prisonerName,
        prisonNumber,
        findByPrisonNumber,
      } as AddRecipientForm)
    const view = new AddRecipientView(addRecipientForm, req.flash('errors'))

    res.render('pages/recipients/add-recipient', view.renderArgs)
  }

  async submitAddRecipient(req: Request, res: Response): Promise<void> {
    req.session.addRecipientForm = { ...req.body }
    const form = { ...req.session.addRecipientForm }
    req.session.addRecipientForm.findByPrisonNumber =
      req.session.addRecipientForm.findByPrisonNumber.toString().toLowerCase() === 'true'
    const errors: Array<Record<string, string>> = []

    if (form.findByPrisonNumber) {
      if (!form.prisonerName) {
        errors.push({ href: '#prisonerName', text: "Enter a recipient's name" })
      }
    } else if (!form.prisonNumber) {
      errors.push({ href: '#prisonNumber', text: "Enter the recipient's prison number" })
    }

    if (!form.prisonName) {
      errors.push({ href: '#prisonName', text: "Enter the recipient's location" })
    }

    if (errors.length > 0) {
      req.flash('errors', errors)
      return this.produceAddRecipientView(req, res)
    }

    // at this point we have a fully populated recipient in the form
    req.session.recipients = req.session.recipients || []
    req.session.recipients.push({
      prisonerName: form.prisonerName,
      prisonNumber: form.prisonNumber,
      prisonName: form.prisonName,
    } as Recipient)

    res.redirect('review-recipients')
    return null
  }
}
