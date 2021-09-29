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

const stubCreateBarcode = (): SuperAgentRequest =>
  stubFor({
    request: {
      method: 'POST',
      urlPattern: '/prisoner-transactions/barcode/prisoner/.*',
    },
    response: {
      status: 200,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      jsonBody: {
        barcode: '12345678',
      },
    },
  })

export default {
  stubRequestLink,
  stubCreateBarcode,
}
