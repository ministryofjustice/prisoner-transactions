import Page, { PageElement } from './page'
import EmailSentPage from './emailSent'

export default class RequestLinkPage extends Page {
  constructor() {
    super('request-link')
  }

  email = (text: string): RequestLinkPage => {
    cy.get('#email').type(text)
    return Page.verifyOnPage(RequestLinkPage)
  }

  clickRequestLinkAndSucceed = (): EmailSentPage => {
    cy.get('[data-qa=request-link-button]').click()
    return Page.verifyOnPage(EmailSentPage)
  }

  clickRequestLinkAndFail = (): RequestLinkPage => {
    cy.get('[data-qa=request-link-button]').click()
    return Page.verifyOnPage(RequestLinkPage)
  }

  errorSummaryContains = (error: string): PageElement => cy.get('.govuk-error-summary').contains(error)
}
