import { RequestHandler } from 'express'
import type { VerifyErrors, JwtPayload } from 'jsonwebtoken'
import { verify } from 'jsonwebtoken'
import config from '../config'

export default function barcodeAuthorisationMiddleware(): RequestHandler {
  return (req, res, next) => {
    req.session.createBarcodeToken = undefined
    res.locals.barcodeUser = undefined
    if (!req.cookies.create_barcode_token) {
      return res.redirect('/link/request-link')
    }
    return verify(
      req.cookies.create_barcode_token,
      config.barcodeTokenPublicKey,
      { algorithms: ['RS256'] },
      (err: VerifyErrors, payload: JwtPayload) => {
        if (err) {
          return res.redirect('/link/request-link')
        }
        req.session.barcodeUserEmail = payload.sub
        req.session.cookie.expires = new Date(payload.exp * 1000)
        req.session.createBarcodeToken = req.cookies.create_barcode_token
        return next()
      }
    )
  }
}
