import { Router } from 'express'
import CreateBarcodeController from '../routes/CreateBarcodeController'

export default function setUpCreateBarcode(router: Router): Router {
  const createBarcodeController = new CreateBarcodeController()

  router.get('/create-barcode', (req, res) => createBarcodeController.createBarcode(req, res))

  return router
}
