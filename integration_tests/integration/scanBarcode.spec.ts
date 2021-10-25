import Page from '../pages/page'
import ScanBarcodePage from '../pages/scanBarcode'

context.only('Scan Barcode', () => {
  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')
  })

  it('Can verify a barcode', () => {
    cy.task('stubVerifyBarcodeSucceed')
    cy.signIn()
    cy.visit('/scan-barcode')
    const scanBarcodePage = Page.verifyOnPage(ScanBarcodePage)
    const barcodeOkPage = scanBarcodePage.barcode('210987654321').clickContinueButtonAndSucceed()
    barcodeOkPage.clickContinueButton()
  })

  it('Can try and fail to scan a barcode', () => {
    cy.task('stubVerifyBarcodeFail')
    cy.signIn()
    cy.visit('/scan-barcode')
    const scanBarcodePage = Page.verifyOnPage(ScanBarcodePage)
    const barcodeInvalidPage = scanBarcodePage.barcode('123456789012').clickContinueButtonAndFail()
    barcodeInvalidPage.clickContinueButton()
  })
})
