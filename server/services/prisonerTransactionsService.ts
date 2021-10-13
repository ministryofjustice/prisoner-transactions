import HmppsAuthClient from '../data/hmppsAuthClient'
import RestClient from '../data/restClient'
import config from '../config'

export interface Context {
  username?: string
}

export interface CreateBarcodeResponse {
  barcode: string
}

export interface VerifyLinkResponse {
  token: string
}

export default class PrisonerTransactionsService {
  constructor(private readonly hmppsAuthClient: HmppsAuthClient) {}

  private static restClient(token: string): RestClient {
    return new RestClient('Prisoner Transactions API Client', config.apis.prisonerTransactions, token)
  }

  async requestLink(email: string, sessionID: string): Promise<void> {
    const token = await this.hmppsAuthClient.getSystemClientToken()
    await PrisonerTransactionsService.restClient(token).post({
      path: `/link/email`,
      data: { email, sessionID },
    })
  }

  async verifyLink(secret: string, sessionID: string): Promise<string> {
    const token = await this.hmppsAuthClient.getSystemClientToken()
    const response = (await PrisonerTransactionsService.restClient(token).post({
      path: `/link/verify`,
      data: { secret, sessionID },
    })) as VerifyLinkResponse
    return response.token
  }

  async createBarcode(context: Context, prisoner: string, createBarcodeToken: string): Promise<string> {
    const response = (await PrisonerTransactionsService.restClient(createBarcodeToken).postCreateBarcode({
      path: `/barcode/prisoner/${prisoner}`,
    })) as CreateBarcodeResponse
    return response.barcode
  }
}
