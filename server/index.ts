import createApp from './app'
import HmppsAuthClient from './data/hmppsAuthClient'
import TokenStore from './data/tokenStore'
import UserService from './services/userService'
import PrisonerTransactionsService from './services/prisonerTransactionsService'

const hmppsAuthClient = new HmppsAuthClient(new TokenStore())
const userService = new UserService(hmppsAuthClient)
const prisonerTransactionService = new PrisonerTransactionsService(hmppsAuthClient)

const app = createApp(userService, prisonerTransactionService)

export default app
