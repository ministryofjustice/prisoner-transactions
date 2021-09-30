import nock from 'nock'
import HmppsAuthClient from '../data/hmppsAuthClient'
import config from '../config'
import PrisonerTransactionsService from './prisonerTransactionsService'
import TokenStore from '../data/tokenStore'

jest.mock('../data/hmppsAuthClient')

describe('Prisoner Transactions Service', () => {
  let hmppsAuthClient: jest.Mocked<HmppsAuthClient>
  let prisonerTransactionsService: PrisonerTransactionsService
  let fakePrisonerTransactions: nock.Scope

  beforeEach(() => {
    fakePrisonerTransactions = nock(config.apis.prisonerTransactions.url)
  })

  afterEach(() => {
    nock.cleanAll()
  })

  describe('requestLink', () => {
    beforeEach(() => {
      hmppsAuthClient = new HmppsAuthClient({} as TokenStore) as jest.Mocked<HmppsAuthClient>
      prisonerTransactionsService = new PrisonerTransactionsService(hmppsAuthClient)
    })
    it('should get a system token from the auth client', async () => {
      fakePrisonerTransactions.post('/link/email', { email: 'a.b@c.com' }).reply(200)

      await prisonerTransactionsService.requestLink('a.b@c.com')

      expect(hmppsAuthClient.getSystemClientToken).toHaveBeenCalled()
    })
  })
})
