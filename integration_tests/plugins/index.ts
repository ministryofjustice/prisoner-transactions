import { resetStubs } from '../mockApis/wiremock'

import auth from '../mockApis/auth'
import tokenVerification from '../mockApis/tokenVerification'
import prisonerTransactionsService from '../mockApis/prisonerTransactionsService'

export default (on: (task: string, tasks: Record<string, unknown>) => void): void => {
  on('task', {
    reset: resetStubs,

    getSignInUrl: auth.getSignInUrl,
    stubSignIn: auth.stubSignIn,

    stubAuthUser: auth.stubUser,
    stubAuthPing: auth.stubPing,
    stubAuthToken: auth.stubToken,

    stubTokenVerificationPing: tokenVerification.stubPing,

    stubCreateBarcode: prisonerTransactionsService.stubCreateBarcode,
    stubRequestLink: prisonerTransactionsService.stubRequestLink,
  })
}
