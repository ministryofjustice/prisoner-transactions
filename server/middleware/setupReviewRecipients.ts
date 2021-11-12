import express, { Router } from 'express'
import session from 'express-session'
import flash from 'connect-flash'
import ReviewRecipientsController from '../routes/createBarcode/recipients/ReviewRecipientsController'
import config from '../config'

export default function setupReviewRecipients(): Router {
  const router = express.Router()
  const controller = new ReviewRecipientsController()

  router.use(
    session({
      cookie: { maxAge: config.session.expiryMinutes * 60000 },
      store: new session.MemoryStore(),
      saveUninitialized: true,
      resave: true,
      secret: config.session.secret,
    })
  )
  router.use(flash())
  router.use(express.json())
  router.use(express.urlencoded({ extended: true }))

  router.get('/review-recipients', (req, res) => controller.getReviewRecipientsView(req, res))

  return router
}
