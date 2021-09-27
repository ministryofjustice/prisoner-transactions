import type { Request, Response } from 'express'
import PrisonerTransactionsService from '../services/prisonerTransactionsService'
import RequestLinkController from './RequestLinkController'
import HmppsAuthClient from '../data/hmppsAuthClient'

jest.mock('../services/prisonerTransactionsService')

describe('Request Link Controller', () => {
  let prisonerTransactionService: jest.Mocked<PrisonerTransactionsService>
  let controller: RequestLinkController
  const req = {
    query: {},
    session: {},
    flash: jest.fn(),
  } as unknown as Request
  const res = {
    locals: {},
    render: jest.fn(),
    redirect: jest.fn(),
  } as unknown as Response
  afterEach(jest.resetAllMocks)

  beforeEach(() => {
    prisonerTransactionService = new PrisonerTransactionsService(
      {} as HmppsAuthClient
    ) as jest.Mocked<PrisonerTransactionsService>
    controller = new RequestLinkController(prisonerTransactionService)
  })

  describe('Submit link request', () => {
    it('should reject invalid email', async () => {
      req.body = {
        email: 'invalid',
      }
      await controller.submitLinkRequest(req, res)
      expect(prisonerTransactionService.requestLink).not.toBeCalled()
      expect(res.redirect).toHaveBeenCalledWith('/request-link')
    })
    it('should request link for valid email', async () => {
      req.body = {
        email: 'an.email@domain.com',
      }
      await controller.submitLinkRequest(req, res)
      expect(prisonerTransactionService.requestLink).toHaveBeenCalledWith('an.email@domain.com')
      expect(res.redirect).toHaveBeenCalledWith('/email-sent')
    })
  })
})
