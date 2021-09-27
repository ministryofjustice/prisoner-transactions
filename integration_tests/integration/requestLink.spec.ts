import RequestLinkPage from '../pages/requestLink'
import Page from '../pages/page'
import EmailSentPage from '../pages/emailSent'
import { getRequests } from '../mockApis/wiremock'

type WireMockRequest = { request: { url: string; method: string; body: string } }
type AllWireMockRequest = { requests: WireMockRequest[] }

context('Request Link Page', () => {
  beforeEach(() => {
    cy.task('reset')
    cy.task('stubAuthToken')
    cy.task('stubRequestLink')
  })

  describe('layout', () => {
    it('Can access request Link page without a login', () => {
      cy.visit('/request-link')
      Page.verifyOnPage(RequestLinkPage)
    })

    it('Has an email input field', () => {
      cy.visit('/request-link')
      const requestLinkPage = Page.verifyOnPage(RequestLinkPage)
      requestLinkPage.email().should('exist')
    })

    it('Has a request link button', () => {
      cy.visit('/request-link')
      const requestLinkPage = Page.verifyOnPage(RequestLinkPage)
      requestLinkPage.requestButton().should('exist')
    })
  })

  describe('submit email', () => {
    it('should show email sent page for a valid email', () => {
      cy.visit('/request-link')
      const requestLinkPage = Page.verifyOnPage(RequestLinkPage)
      requestLinkPage.email().type('amy.barnett@digital.justice.gov.uk')
      requestLinkPage
        .requestButton()
        .click()
        .then(requestLinkRequests)
        .then(requests => {
          expect(requests).to.have.lengthOf(1)
          expect(requests[0].request.url).to.equal(
            '/prisoner-transactions/link/email/amy.barnett@digital.justice.gov.uk'
          )
          Page.verifyOnPage(EmailSentPage)
        })
    })
    it('should show errors for an invalid email', () => {
      cy.visit('/request-link')
      const requestLinkPage = Page.verifyOnPage(RequestLinkPage)
      requestLinkPage.email().type('invalid-email')
      requestLinkPage.requestButton().click()
      const requestLinkPageResult = Page.verifyOnPage(RequestLinkPage)
      requestLinkPageResult.errorSummary().contains('Enter a valid email address')
    })
  })
})

const getRequestsFor = (filter: (request: WireMockRequest) => boolean) =>
  getRequests().then((response: { body: AllWireMockRequest }) => response.body.requests.filter(filter))

const isRequestLinkRequest = (request: WireMockRequest) =>
  // request.request.url.match('/link/email/.*') && request.request.method === 'POST'
  request.request.url.match('.*') && true

const requestLinkRequests = () => getRequestsFor(isRequestLinkRequest)
