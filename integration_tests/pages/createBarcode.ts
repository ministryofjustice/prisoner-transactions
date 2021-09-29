import Page from './page'
import DisplayBarcodePage from './displayBarcode'

export default class CreateBarcodePage extends Page {
  constructor() {
    super('create-barcode')
  }

  prisoner = (text: string): CreateBarcodePage => {
    cy.get('#prisoner').type(text)
    return Page.verifyOnPage(CreateBarcodePage)
  }

  clickContinueButtonAndSucceed = (): DisplayBarcodePage => {
    cy.get('[data-qa=continue-button]').click()
    return Page.verifyOnPage(DisplayBarcodePage)
  }
}
