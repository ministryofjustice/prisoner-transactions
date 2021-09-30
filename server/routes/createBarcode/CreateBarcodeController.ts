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

  async verifyLink(req: Request, res: Response): Promise<void> {
    const secret = req.query.secret as string
    const token = await this.prisonerTransactionsService.verifyLink(secret)
    req.session.token = token
    res.redirect('/create-barcode')
  }

  async createBarcode(req: Request, res: Response): Promise<void> {
    const view = new CreateBarcodeView(req.session?.createBarcodeForm || {}, req.flash('errors'))
    res.render('pages/createBarcode', view.renderArgs)
  }

  async submitCreateBarcode(req: Request, res: Response): Promise<void> {
    req.session.createBarcodeForm = { ...req.body }
    res.redirect(
      await createBarcodeValidator(req.session.createBarcodeForm, req, form => {
        return this.prisonerTransactionsService.createBarcode(context(res), form.prisoner as string, req.session.token)
      })
    )
  }

  async displayBarcode(req: Request, res: Response): Promise<void> {
    const view = new DisplayBarcodeView(req.query.barcode as string)
    res.render('pages/displayBarcode', view.renderArgs)
  }
}
