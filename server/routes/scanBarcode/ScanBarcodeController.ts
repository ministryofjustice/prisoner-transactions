import { Request, Response } from 'express'
import PrisonerTransactionsService, { Context } from '../../services/prisonerTransactionsService'
import ScanBarcodeView from './ScanBarcodeView'
import scanBarcodeValidator from './ScanBarcodeValidator'

function context(res: Response): Context {
  return {
    username: res?.locals?.user?.username,
  }
}
export default class ScanBarcodeController {
  constructor(private readonly prisonerTransactionsService: PrisonerTransactionsService) {}

  async scanBarcode(req: Request, res: Response): Promise<void> {
    const view = new ScanBarcodeView(req.session?.scanBarcodeForm || {}, req.flash('errors'))
    res.render('pages/scanBarcode', view.renderArgs)
  }

  async submitScanBarcode(req: Request, res: Response): Promise<void> {
    req.session.scanBarcodeForm = { ...req.body }
    res.redirect(
      await scanBarcodeValidator(req.session.scanBarcodeForm, req, form => {
        return this.prisonerTransactionsService.verifyBarcode(context(res), form.barcode as string)
      })
    )
  }

  async barcodeOk(req: Request, res: Response): Promise<void> {
    res.render('pages/barcodeOk')
  }

  async barcodeInvalid(req: Request, res: Response): Promise<void> {
    res.render('pages/barcodeInvalid')
  }
}
