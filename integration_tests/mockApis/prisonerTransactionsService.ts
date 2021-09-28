import { SuperAgentRequest } from 'superagent'
import { stubFor } from './wiremock'

const stubRequestLink = (): SuperAgentRequest =>
  stubFor({
    request: {
      method: 'POST',
      urlPattern: '/prisoner-transactions/link/email/.*',
    },
    response: {
      status: 200,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    },
  })

export default {
  stubRequestLink,
}
