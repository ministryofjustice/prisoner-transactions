import IndexPage from '../pages/index'
import AuthSignInPage from '../pages/authSignIn'
import Page from '../pages/page'

context('Create Barcode', () => {
  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')
    cy.task('stubCreateBarcode')
  })

  it('Unauthenticated user directed to auth', () => {
    cy.visit('/')
    Page.verifyOnPage(AuthSignInPage)
  })

  it('Can create a barcode', () => {
    cy.signIn()
    const indexPage = Page.verifyOnPage(IndexPage)
    indexPage
      .clickCreateBarcodeLink()
      .prisoner('A1234BC')
      .clickContinueButtonAndSucceed()
      .barcodeResultContains('12345678')
  })
})
