import PrisonerTransactionsService, { Context } from '../../services/prisonerTransactionsService'

export default class MockPrisonerTransactionsService extends PrisonerTransactionsService {
  constructor() {
    super(undefined)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async requestLink(email: string): Promise<void> {
    return Promise.resolve()
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async createBarcode(context: Context, prisoner: string): Promise<string> {
    return Promise.resolve('12345678')
  }
}
