import type { RequestHandler, Router } from 'express'

import asyncMiddleware from '../middleware/asyncMiddleware'
import setUpCreateBarcode from '../middleware/setUpCreateBarcode'

export default function routes(router: Router): Router {
  const get = (path: string, handler: RequestHandler) => router.get(path, asyncMiddleware(handler))

  get('/', (req, res) => {
    res.render('pages/index', {
      tiles: [
        {
          id: 'create-barcode',
          heading: 'Create a barcode',
          description: 'Create a barcode for a secure item of mail',
          href: '/create-barcode',
          roles: [],
          enabled: true,
        },
      ],
    })
  })

  setUpCreateBarcode(router)
  return router
}
