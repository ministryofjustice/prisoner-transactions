import RequestLinkPage from '../pages/requestLink'
import Page from '../pages/page'

context('Request Link Page', () => {
  beforeEach(() => {
    cy.task('reset')
  })

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
