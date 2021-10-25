/* eslint-disable import/no-cycle */
import Page from './page'
import ScanBarcodePage from './scanBarcode'

export default class BarcodeInvalidPage extends Page {
  constructor() {
    super('barcode-invalid')
  }

  clickContinueButton = (): ScanBarcodePage => {
    cy.get('[data-qa=continue-button]').click()
    return Page.verifyOnPage(ScanBarcodePage)
  }
}
