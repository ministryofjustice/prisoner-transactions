import { Request, Response } from 'express'

export default class CreateBarcodeController {
  async createBarcode(req: Request, res: Response): Promise<void> {
    res.render('pages/createBarcode')
  }
}
