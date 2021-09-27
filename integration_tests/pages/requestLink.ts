import Page, { PageElement } from './page'

export default class RequestLinkPage extends Page {
  constructor() {
    super('Request link to access Prisoner Transactions')
  }

  email = (): PageElement => cy.get('#email')

  requestButton = (): PageElement => cy.contains('Request Link')

  errorSummary = (): PageElement => cy.get('.govuk-error-summary')
}
