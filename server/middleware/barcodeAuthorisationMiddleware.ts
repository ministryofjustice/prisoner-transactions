import { RequestHandler } from 'express'

export default function barcodeAuthorisationMiddleware(): RequestHandler {
  return (req, res, next) => {
    // TODO validate token and check expiry
    if (!req.cookies.create_barcode_token) {
      return res.redirect('/link/request-link')
    }
    req.session.createBarcodeToken = req.cookies.create_barcode_token

    return next()
  }
}
