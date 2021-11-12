import express, { Router } from 'express'
import session from 'express-session'
import flash from 'connect-flash'
import config from '../config'
import FindRecipientsController from '../routes/createBarcode/recipients/FindRecipientsController'

export default function setupFindRecipients(): Router {
  const router = express.Router()
  const controller = new FindRecipientsController()

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

  router.get('/find-recipients', (req, res) => controller.getFindRecipientsView(req, res))
  router.post('/find-recipients', (req, res) => controller.submitFindRecipientsForm(req, res))
  router.post('/select-recipient', (req, res) => controller.selectRecipient(req, res))

  return router
}
