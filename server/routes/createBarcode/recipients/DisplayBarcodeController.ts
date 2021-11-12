import { Request, Response } from 'express'

export default class DisplayBarcodeController {
  async getDisplayBarcodeView(req: Request, res: Response): Promise<void> {
    res.render('pages/recipients/display-barcode', {})
  }
}
