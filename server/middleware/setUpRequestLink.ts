import express, { Router } from 'express'
import RequestLinkController from '../routes/RequestLinkController'

export default function setUpRequestLink(): Router {
  const router = express.Router()
  const requestLinksController = new RequestLinkController()

  router.get('/request-link', (req, res) => requestLinksController.requestLink(req, res))

  return router
}
