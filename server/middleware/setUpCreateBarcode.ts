import express, { Router } from 'express'
import session from 'express-session'
import flash from 'connect-flash'
import CreateBarcodeController from '../routes/createBarcode/CreateBarcodeController'
import PrisonerTransactionsService from '../services/prisonerTransactionsService'
import config from '../config'

export default function setUpCreateBarcode(prisonerTransactionService: PrisonerTransactionsService): Router {
  const router = express.Router()
  const createBarcodeController = new CreateBarcodeController(prisonerTransactionService)

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

  router.get('/create-barcode', (req, res) => createBarcodeController.createBarcode(req, res))
  router.post('/create-barcode', (req, res) => createBarcodeController.submitCreateBarcode(req, res))
  router.get('/display-barcode', (req, res) => createBarcodeController.displayBarcode(req, res))

  return router
}
