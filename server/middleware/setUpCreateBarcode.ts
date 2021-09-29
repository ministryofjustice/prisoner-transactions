import { Router } from 'express'
import CreateBarcodeController from '../routes/createBarcode/CreateBarcodeController'
import PrisonerTransactionsService from '../services/prisonerTransactionsService'

export default function setUpCreateBarcode(
  router: Router,
  prisonerTransactionService: PrisonerTransactionsService
): Router {
  const createBarcodeController = new CreateBarcodeController(prisonerTransactionService)

  router.get('/create-barcode', (req, res) => createBarcodeController.createBarcode(req, res))
  router.post('/create-barcode', (req, res) => createBarcodeController.submitCreateBarcode(req, res))
  router.get('/display-barcode', (req, res) => createBarcodeController.displayBarcode(req, res))

  return router
}
