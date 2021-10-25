import { Request, Response } from 'express'
import CreateBarcodeView from './CreateBarcodeView'
import PrisonerTransactionsService, { Context } from '../../services/prisonerTransactionsService'
import createBarcodeValidator from './CreateBarcodeValidator'
import DisplayBarcodeView from './DisplayBarcodeView'

function context(res: Response): Context {
  return {
    username: res?.locals?.user?.username,
  }
}
export default class CreateBarcodeController {
  constructor(private readonly prisonerTransactionsService: PrisonerTransactionsService) {}

  async createBarcode(req: Request, res: Response): Promise<void> {
    const view = new CreateBarcodeView(req.session?.createBarcodeForm || {}, req.flash('errors'))
    res.render('pages/createBarcode', view.renderArgs)
  }

  async submitCreateBarcode(req: Request, res: Response): Promise<void> {
    req.session.createBarcodeForm = { ...req.body }
    res.redirect(
      await createBarcodeValidator(req.session.createBarcodeForm, req, form => {
        return this.prisonerTransactionsService.createBarcode(
          context(res),
          form.prisoner as string,
          req.session.barcodeUserEmail,
          req.session.createBarcodeToken
        )
      })
    )
  }

  async displayBarcode(req: Request, res: Response): Promise<void> {
    const view = new DisplayBarcodeView(req.session.barcodeImageUrl)
    res.render('pages/displayBarcode', view.renderArgs)
  }
}
