import HmppsAuthClient from '../data/hmppsAuthClient'
import RestClient from '../data/restClient'
import config from '../config'

export interface Context {
  username?: string
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

  async verifyLink(secret: string, sessionID: string, email: string): Promise<string> {
    const token = await this.hmppsAuthClient.getSystemClientToken()
    const response = (await PrisonerTransactionsService.restClient(token).post({
      path: `/link/verify`,
      data: { email, secret, sessionID },
    })) as VerifyLinkResponse
    return response.token
  }

  async createBarcode(
    context: Context,
    prisonerId: string,
    userId: string,
    createBarcodeToken: string
  ): Promise<Buffer> {
    return (await PrisonerTransactionsService.restClient(createBarcodeToken).postCreateBarcode({
      path: `/barcode`,
      data: { userId, prisonerId },
    })) as Buffer
  }

  async verifyBarcode(context: Context, barcode: string): Promise<void> {
    const token = await this.hmppsAuthClient.getSystemClientToken()
    await PrisonerTransactionsService.restClient(token).post({
      path: `/barcode/${barcode}`,
    })
  }
}
