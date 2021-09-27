import RequestLinkPage from '../pages/requestLink'
import Page from '../pages/page'
import EmailSentPage from '../pages/emailSent'

context('Request Link Page', () => {
  beforeEach(() => {
    cy.task('reset')
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
      requestLinkPage.requestButton().click()
      Page.verifyOnPage(EmailSentPage)
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
