import express, { Router } from 'express'
import flash from 'connect-flash'
import session from 'express-session'
import config from '../config'
import DisplayBarcodeController from '../routes/createBarcode/recipients/DisplayBarcodeController'

export default function setupDisplayBarcode(): Router {
  const router = express.Router()
  const controller = new DisplayBarcodeController()

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

  router.get('/display-barcode', (req, res) => controller.getDisplayBarcodeView(req, res))

  return router
}
