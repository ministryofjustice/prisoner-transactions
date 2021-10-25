/* eslint-disable import/no-cycle */
import Page from './page'
import BarcodeOkPage from './barcodeOk'
import BarcodeInvalidPage from './barcodeInvalid'

export default class ScanBarcodePage extends Page {
  constructor() {
    super('scan-barcode')
  }

  barcode = (text: string): ScanBarcodePage => {
    cy.get('#barcode').type(text)
    return Page.verifyOnPage(ScanBarcodePage)
  }

  clickContinueButtonAndSucceed = (): BarcodeOkPage => {
    cy.get('[data-qa=continue-button]').click()
    return Page.verifyOnPage(BarcodeOkPage)
  }

  clickContinueButtonAndFail = (): BarcodeInvalidPage => {
    cy.get('[data-qa=continue-button]').click()
    return Page.verifyOnPage(BarcodeInvalidPage)
  }
}
