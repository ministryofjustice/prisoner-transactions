import { Request, Response } from 'express'
import requestLinkValidator from './RequestLinkValidator'
import PrisonerTransactionsService from '../../services/prisonerTransactionsService'
import RequestLinkView from './RequestLinkView'

export default class RequestLinkController {
  constructor(private readonly prisonerTransactionsService: PrisonerTransactionsService) {}

  async requestLink(req: Request, res: Response): Promise<void> {
    const view = new RequestLinkView(req.session?.requestLinkForm || {}, req.flash('errors'))

    res.clearCookie('create_barcode_token').render('pages/requestLink', view.renderArgs)
  }

  async submitLinkRequest(req: Request, res: Response): Promise<void> {
    req.session.requestLinkForm = { ...req.body }
    req.session.barcodeUserEmail = req.session.requestLinkForm.email
    res.redirect(
      await requestLinkValidator(req.session.requestLinkForm, req, form =>
        this.prisonerTransactionsService.requestLink(form.email as string, req.sessionID)
      )
    )
  }

  async emailSent(req: Request, res: Response): Promise<void> {
    res.render('pages/emailSent')
  }

  async verifyLink(req: Request, res: Response): Promise<void> {
    const secret = req.query.secret as string
    const email = req.session.barcodeUserEmail
    try {
      const token = await this.prisonerTransactionsService.verifyLink(secret, req.sessionID, email)
      res.cookie('create_barcode_token', token).redirect('/link/prototype/find-recipients')
    } catch (error) {
      req.flash('errors', [{ href: '', text: 'An error occurred verifying your email - please try again' }])
      res.redirect('/link/request-link')
    }
  }
}
