import Page from '../pages/page'
import CreateBarcodePage from '../pages/createBarcode'
import RequestLinkPage from '../pages/requestLink'

context('Create Barcode', () => {
  beforeEach(() => {
    cy.task('reset')
    cy.task('stubAuthToken')
    cy.task('stubRequestLink')
    cy.task('stubVerifyLink')
    cy.task('stubCreateBarcode')
  })

  it('Can create a barcode from a magic link signin', () => {
    cy.visit('/link/verify-link?secret=thisisasecret')
    const createBarcodePage = Page.verifyOnPage(CreateBarcodePage)
    createBarcodePage.prisoner('A1234BC').clickContinueButtonAndSucceed().barcodeResultContains('12345678')
  })

  it('Can create a barcode after redirecting to a magic link signin', () => {
    cy.visit('/barcode/create-barcode')
    const requestLinkPage = Page.verifyOnPage(RequestLinkPage)
    requestLinkPage.email('mike.halma@digital.justice.gov.uk').clickRequestLinkAndSucceed()
    cy.visit('/link/verify-link?secret=thisisasecret')
    const createBarcodePage = Page.verifyOnPage(CreateBarcodePage)
    createBarcodePage.prisoner('A1234BC').clickContinueButtonAndSucceed().barcodeResultContains('12345678')
  })
})
