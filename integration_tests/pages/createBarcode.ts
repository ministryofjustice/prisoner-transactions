import Page, { PageElement } from './page'

export default class CreateBarcodePage extends Page {
  constructor() {
    super('create-barcode')
  }

  prisoner = (): PageElement => cy.get('#prisoner')

  continueButton = (): PageElement => cy.contains('Continue')
}
