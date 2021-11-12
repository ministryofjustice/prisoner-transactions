import { Request, Response } from 'express'

export default class ReviewRecipientsController {
  async getReviewRecipientsView(req: Request, res: Response): Promise<void> {
    const { recipients } = req.session
    res.render('pages/recipients/review-recipients', { recipients })
  }
}
