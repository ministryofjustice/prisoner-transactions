import Page from '../pages/page'
import IndexPage from '../pages'
import AuthSignInPage from '../pages/authSignIn'

context('Index Page', () => {
  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')
  })

  it('Unauthenticated user directed to auth', () => {
    cy.visit('/')
    Page.verifyOnPage(AuthSignInPage)
  })

  it('Authenticated user lands on index page', () => {
    cy.signIn()
    Page.verifyOnPage(IndexPage)
  })
})
