import HmppsAuthClient from '../data/hmppsAuthClient'
import RestClient from '../data/restClient'
import config from '../config'

export interface Context {
  username?: string
}
export default class PrisonerTransactionsService {
  constructor(private readonly hmppsAuthClient: HmppsAuthClient) {}

  private static restClient(token: string): RestClient {
    return new RestClient('Prisoner Transactions API Client', config.apis.prisonerTransactions, token)
  }

  async requestLink(email: string): Promise<void> {
    const token = await this.hmppsAuthClient.getSystemClientToken()
    await PrisonerTransactionsService.restClient(token).post({
      path: `/link/email/${email}`,
    })
  }
}
