import { Request, Response } from 'express'

export default class RequestLinkController {
  async requestLink(req: Request, res: Response): Promise<void> {
    res.render('pages/requestLink')
  }
}
