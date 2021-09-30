import Page from '../pages/page'
import CreateBarcodePage from '../pages/createBarcode'

context('Create Barcode', () => {
  beforeEach(() => {
    cy.task('reset')
    cy.task('stubAuthToken')
    cy.task('stubVerifyLink')
    cy.task('stubCreateBarcode')
  })

  it('Can create a barcode from a magic link signin', () => {
    cy.visit('/verify-link?secret=thisisasecret')
    const createBarcodePage = Page.verifyOnPage(CreateBarcodePage)
    createBarcodePage.prisoner('A1234BC').clickContinueButtonAndSucceed().barcodeResultContains('12345678')
  })
})
