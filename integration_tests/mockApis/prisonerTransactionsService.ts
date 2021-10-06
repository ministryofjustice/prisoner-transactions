import { SuperAgentRequest } from 'superagent'
import { stubFor } from './wiremock'

const stubRequestLink = (): SuperAgentRequest =>
  stubFor({
    request: {
      method: 'POST',
      urlPattern: '/prisoner-transactions/link/email',
      bodyPatterns: [{ equalToJson: { email: 'amy.barnett@digital.justice.gov.uk' } }],
    },
    response: {
      status: 200,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    },
  })

const stubVerifyLink = (): SuperAgentRequest =>
  stubFor({
    request: {
      method: 'POST',
      urlPattern: '/prisoner-transactions/link/verify',
    },
    response: {
      status: 200,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      jsonBody: {
        token: 'some-token',
      },
    },
  })

const stubCreateBarcode = (): SuperAgentRequest =>
  stubFor({
    request: {
      method: 'POST',
      urlPattern: '/prisoner-transactions/barcode/prisoner/.*',
      headers: { CREATE_BARCODE_TOKEN: { equalTo: 'some-token' } },
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
  stubVerifyLink,
}
