import { RequestHandler } from 'express'

export default function barcodeAuthorisationMiddleware(): RequestHandler {
  return (req, res, next) => {
    // TODO validate token and check expiry
    if (!req.cookies.link_token) {
      return res.redirect('/link/request-link')
    }
    req.session.linkToken = req.cookies.link_token

    return next()
  }
}
