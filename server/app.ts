import express from 'express'

import createError from 'http-errors'
import cookieParser from 'cookie-parser'

import indexRoutes from './routes'
import nunjucksSetup from './utils/nunjucksSetup'
import errorHandler from './errorHandler'
import standardRouter from './routes/standardRouter'
import type UserService from './services/userService'

import setUpWebSession from './middleware/setUpWebSession'
import setUpStaticResources from './middleware/setUpStaticResources'
import setUpWebSecurity from './middleware/setUpWebSecurity'
import setUpAuthentication from './middleware/setUpAuthentication'
import setUpHealthChecks from './middleware/setUpHealthChecks'
import setUpWebRequestParsing from './middleware/setupRequestParsing'
import authorisationMiddleware from './middleware/authorisationMiddleware'
import setUpRequestLink from './middleware/setUpRequestLink'
import PrisonerTransactionsService from './services/prisonerTransactionsService'
import setUpCreateBarcode from './middleware/setUpCreateBarcode'
import barcodeAuthorisationMiddleware from './middleware/barcodeAuthorisationMiddleware'

export default function createApp(
  userService: UserService,
  prisonerTransactionsService: PrisonerTransactionsService
): express.Application {
  const app = express()

  app.set('json spaces', 2)
  app.set('trust proxy', true)
  app.set('port', process.env.PORT || 3000)

  app.use(setUpHealthChecks())

  app.use(setUpWebSecurity())
  app.use(setUpWebSession())
  app.use(setUpWebRequestParsing())
  app.use(setUpStaticResources())
  nunjucksSetup(app)

  app.use('/link', setUpRequestLink(prisonerTransactionsService))

  app.use('/barcode', cookieParser())
  app.use('/barcode', barcodeAuthorisationMiddleware())
  app.use('/barcode', setUpCreateBarcode(prisonerTransactionsService))

  app.use('/', setUpAuthentication())
  app.use('/', authorisationMiddleware())
  app.use('/', indexRoutes(standardRouter(userService), prisonerTransactionsService))

  app.use((req, res, next) => next(createError(404, 'Not found')))
  app.use(errorHandler(process.env.NODE_ENV === 'production'))

  return app
}
