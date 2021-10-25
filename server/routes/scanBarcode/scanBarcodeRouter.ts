import type { RequestHandler, Router } from 'express'

import asyncMiddleware from '../../middleware/asyncMiddleware'
import PrisonerTransactionsService from '../../services/prisonerTransactionsService'
import ScanBarcodeController from './ScanBarcodeController'

export default function routes(router: Router, prisonerTransactionsService: PrisonerTransactionsService): Router {
  const get = (path: string, handler: RequestHandler) => router.get(path, asyncMiddleware(handler))
  const post = (path: string, handler: RequestHandler) => router.post(path, asyncMiddleware(handler))

  const scanBarcodeController = new ScanBarcodeController(prisonerTransactionsService)

  get('/scan-barcode', (req, res) => scanBarcodeController.scanBarcode(req, res))
  post('/scan-barcode', (req, res) => scanBarcodeController.submitScanBarcode(req, res))
  get('/barcode-ok', (req, res) => scanBarcodeController.barcodeOk(req, res))
  get('/barcode-invalid', (req, res) => scanBarcodeController.barcodeInvalid(req, res))

  return router
}
