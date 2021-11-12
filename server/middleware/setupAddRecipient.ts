import express, { Router } from 'express'
import session from 'express-session'
import flash from 'connect-flash'
import config from '../config'
import AddRecipientController from '../routes/createBarcode/recipients/AddRecipientController'

export default function setupAddRecipient(): Router {
  const router = express.Router()
  const controller = new AddRecipientController()

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

  router.get('/add-recipient', (req, res) => controller.getAddRecipientView(req, res))
  router.post('/add-recipient', (req, res) => controller.submitAddRecipient(req, res))

  return router
}
