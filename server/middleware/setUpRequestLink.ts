import express, { Router } from 'express'
import session from 'express-session'
import flash from 'connect-flash'
import RequestLinkController from '../routes/RequestLinkController'
import PrisonerTransactionsService from '../services/prisonerTransactionsService'

export default function setUpRequestLink(prisonerTransactionService: PrisonerTransactionsService): Router {
  const router = express.Router()
  const requestLinksController = new RequestLinkController(prisonerTransactionService)
  router.use(
    session({
      cookie: { maxAge: 60000 },
      store: new session.MemoryStore(),
      saveUninitialized: true,
      resave: true,
      secret: 'dfa9032knffvui340qla09453jutgbhsadf8qw34gdfow34t598e43',
    })
  )
  router.use(flash())
  router.use(express.json())
  router.use(express.urlencoded({ extended: true }))

  router.get('/request-link', (req, res) => requestLinksController.requestLink(req, res))
  router.post('/request-link', (req, res) => requestLinksController.submitLinkRequest(req, res))
  router.get('/email-sent', (req, res) => requestLinksController.emailSent(req, res))
  return router
}
