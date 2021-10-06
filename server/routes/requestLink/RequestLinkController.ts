import { Request, Response } from 'express'
import requestLinkValidator from './RequestLinkValidator'
import PrisonerTransactionsService from '../../services/prisonerTransactionsService'
import RequestLinkView from './RequestLinkView'

export default class RequestLinkController {
  constructor(private readonly prisonerTransactionsService: PrisonerTransactionsService) {}

  async requestLink(req: Request, res: Response): Promise<void> {
    const view = new RequestLinkView(req.session?.requestLinkForm || {}, req.flash('errors'))

    res.render('pages/requestLink', view.renderArgs)
  }

  async submitLinkRequest(req: Request, res: Response): Promise<void> {
    req.session.requestLinkForm = { ...req.body }
    res.redirect(
      await requestLinkValidator(req.session.requestLinkForm, req, form =>
        this.prisonerTransactionsService.requestLink(form.email as string)
      )
    )
  }

  async emailSent(req: Request, res: Response): Promise<void> {
    res.render('pages/emailSent')
  }

  async verifyLink(req: Request, res: Response): Promise<void> {
    const secret = req.query.secret as string
    try {
      const token = await this.prisonerTransactionsService.verifyLink(secret)
      res.cookie('create_barcode_token', token).redirect('/barcode/create-barcode')
    } catch (error) {
      req.flash('errors', [{ href: '', text: 'An error occurred verifying your email - please try again' }])
      res.redirect('/link/request-link')
    }
  }
}
