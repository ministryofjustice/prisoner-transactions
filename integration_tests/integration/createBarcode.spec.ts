import IndexPage from '../pages/index'
import AuthSignInPage from '../pages/authSignIn'
import Page from '../pages/page'
import CreateBarcodePage from '../pages/createBarcode'

context('Create Barcode', () => {
  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')
  })

  it('Unauthenticated user directed to auth', () => {
    cy.visit('/')
    Page.verifyOnPage(AuthSignInPage)
  })

  it('Create barcode tile exists', () => {
    cy.signIn()
    const indexPage = Page.verifyOnPage(IndexPage)
    indexPage.createBarcodeLink().should('exist')
  })

  it('Can enter create barcode page', () => {
    cy.signIn()
    const indexPage = Page.verifyOnPage(IndexPage)
    indexPage.createBarcodeLink().click()
    Page.verifyOnPage(CreateBarcodePage)
  })

  it('Create barcode page has prisoner input', () => {
    cy.signIn()
    const indexPage = Page.verifyOnPage(IndexPage)
    indexPage.createBarcodeLink().click()
    const createBarcodePage = Page.verifyOnPage(CreateBarcodePage)
    createBarcodePage.prisoner().should('exist')
  })

  it('Create barcode page has continue button', () => {
    cy.signIn()
    const indexPage = Page.verifyOnPage(IndexPage)
    indexPage.createBarcodeLink().click()
    const createBarcodePage = Page.verifyOnPage(CreateBarcodePage)
    createBarcodePage.continueButton().should('exist')
  })
})
