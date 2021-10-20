import RequestLinkPage from '../pages/requestLink'
import Page from '../pages/page'
import { getRequests } from '../mockApis/wiremock'

type WireMockRequest = { request: { url: string; method: string; body: string } }
type AllWireMockRequest = { requests: WireMockRequest[] }

context('Request Link Page', () => {
  beforeEach(() => {
    cy.task('reset')
    cy.task('stubAuthToken')
    cy.task('stubRequestLink')
    cy.visit('/link/request-link')
  })

  it('should show email sent page for a valid email', () => {
    Page.verifyOnPage(RequestLinkPage).email('mike.halma@digital.justice.gov.uk').clickRequestLinkAndSucceed()
    cy.then(requestLinkRequests).then(requests => {
      expect(requests).to.have.lengthOf(1)
      expect(requests[0].request.url).to.equal('/prisoner-transactions/link/email')
    })
  })

  it('should show errors for an invalid email', () => {
    Page.verifyOnPage(RequestLinkPage)
      .email('invalid-email')
      .clickRequestLinkAndFail()
      .errorSummaryContains('Enter a valid email address')
  })
})

const getRequestsFor = (filter: (request: WireMockRequest) => boolean) =>
  getRequests().then((response: { body: AllWireMockRequest }) => response.body.requests.filter(filter))

const isRequestLinkRequest = (request: WireMockRequest) =>
  request.request.url.match('/prisoner-transactions/link/email') && request.request.method === 'POST'

const requestLinkRequests = () => getRequestsFor(isRequestLinkRequest)
