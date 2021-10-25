import type { RequestHandler, Router } from 'express'

import asyncMiddleware from '../middleware/asyncMiddleware'
import PrisonerTransactionsService from '../services/prisonerTransactionsService'
import scanBarcodeRouter from './scanBarcode/scanBarcodeRouter'

export default function routes(router: Router, prisonerTransactionsService: PrisonerTransactionsService): Router {
  const get = (path: string, handler: RequestHandler) => router.get(path, asyncMiddleware(handler))

  get('/', (req, res) => {
    res.render('pages/index', {
      tiles: [
        {
          id: 'scan-barcode',
          heading: 'Scan a barcode',
          description: 'Scan a barcode for a secure item of mail',
          href: '/scan-barcode',
          roles: ['ROLE_SCAN_RULE39_BARCODE'],
          enabled: true,
        },
      ],
    })
  })

  scanBarcodeRouter(router, prisonerTransactionsService)
  return router
}
