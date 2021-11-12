import { Request, Response } from 'express'
import { Recipient } from 'forms'
import FindRecipientsView from './FindRecipientsView'

export default class FindRecipientsController {
  async getFindRecipientsView(req: Request, res: Response): Promise<void> {
    delete req.session.findRecipientsForm
    return this.produceFindRecipientsView(req, res)
  }

  private async produceFindRecipientsView(req: Request, res: Response): Promise<void> {
    const hasRecipients = ((req.session.recipients as Array<Recipient>) || []).length > 0
    const view = new FindRecipientsView(req.session?.findRecipientsForm || {}, req.flash('errors'))
    res.render('pages/recipients/find-recipients', { ...view.renderArgs, hasRecipients })
  }

  async submitFindRecipientsForm(req: Request, res: Response): Promise<void> {
    req.session.findRecipientsForm = { ...req.body }
    const form = { ...req.session.findRecipientsForm }
    const errors: Array<Record<string, string>> = []

    if (!form.prisoner) {
      errors.push({ href: '#prisoner', text: 'Enter a prisoner name or number' })
    }

    if (errors.length > 0) {
      req.flash('errors', errors)
      return this.produceFindRecipientsView(req, res)
    }

    const results = []

    const findByPrisonNumber = /^[a-z]\d{4}[a-z]{2}$/.test(form.prisoner.trim().toLowerCase())
    if (findByPrisonNumber) {
      if (form.prisoner.trim().toLowerCase() === 'a1234bc') {
        results.push({
          prisonerName: 'John Smith',
          prisonNumber: 'A1234BC',
        })
      }
    } else if (form.prisoner.trim().toLowerCase() === 'john smith') {
      Array.of(0, 1).forEach(i => {
        results.push({
          prisonerName: form.prisoner,
          prisonNumber: `A${1234 + i}BC`,
        })
      })
    }

    req.session.findRecipientsForm.results = results
    req.session.findRecipientsForm.findByPrisonNumber = findByPrisonNumber
    return this.produceFindRecipientsView(req, res)
  }

  async selectRecipient(req: Request, res: Response): Promise<void> {
    req.session.selectRecipientForm = { ...req.body }
    const errors: Array<Record<string, string>> = []

    const findByPrisonNumber = /^[a-z]\d{4}[a-z]{2}$/.test(req.session.findRecipientsForm.prisoner.trim().toLowerCase())

    if (!req.session.selectRecipientForm.prisonNumber) {
      errors.push({
        href: '#prisonNumber',
        text: `Select a prisoner${!findByPrisonNumber ? ' or choose to add a new entry' : ''}`,
      })
    }

    if (errors.length > 0) {
      req.flash('errors', errors)
      return this.produceFindRecipientsView(req, res)
    }

    if (req.session.selectRecipientForm.prisonNumber !== '--add--') {
      req.session.recipients = req.session.recipients || []
      req.session.recipients.push({
        prisonerName: !findByPrisonNumber ? req.session.findRecipientsForm.prisoner : 'John Smith',
        prisonNumber: req.session.selectRecipientForm.prisonNumber,
        prisonName: 'HMP Preston',
      })

      res.redirect('review-recipients')
    } else {
      res.redirect('add-recipient')
    }

    return null
  }
}
