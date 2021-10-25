/* eslint-disable import/no-cycle */
import Page from './page'
import ScanBarcodePage from './scanBarcode'

export default class BarcodeOkPage extends Page {
  constructor() {
    super('barcode-ok')
  }

  clickContinueButton = (): ScanBarcodePage => {
    cy.get('[data-qa=continue-button]').click()
    return Page.verifyOnPage(ScanBarcodePage)
  }
}
