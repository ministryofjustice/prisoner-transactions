import Page, { PageElement } from './page'

export default class CreateBarcodePage extends Page {
  constructor() {
    super('Create a barcode for secure mail')
  }

  prisoner = (): PageElement => cy.get('#prisoner')

  continueButton = (): PageElement => cy.contains('Continue')
}
