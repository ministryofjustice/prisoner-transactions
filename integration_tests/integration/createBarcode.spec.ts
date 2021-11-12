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

  // TODO don't skip this test when we stop pointing the login at the prototype
  it.skip('Can create a barcode from a magic link signin', () => {
    cy.visit('/link/verify-link?secret=thisisasecret')
    const createBarcodePage = Page.verifyOnPage(CreateBarcodePage)
    createBarcodePage.prisoner('A1234BC').clickContinueButtonAndSucceed().barcodeResultExists()
  })

  // TODO don't skip this test when we stop pointing the login at the prototype
  it.only('Can create a barcode after redirecting to a magic link signin', () => {
    cy.visit('/barcode/create-barcode')
    const requestLinkPage = Page.verifyOnPage(RequestLinkPage)
    requestLinkPage.email('mike.halma@digital.justice.gov.uk').clickRequestLinkAndSucceed()
    cy.visit('/link/verify-link?secret=thisisasecret')
    const createBarcodePage = Page.verifyOnPage(CreateBarcodePage)
    createBarcodePage.prisoner('A1234BC').clickContinueButtonAndSucceed().barcodeResultExists()
  })
})
