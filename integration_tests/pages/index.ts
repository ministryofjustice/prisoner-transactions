import Page, { PageElement } from './page'

export default class IndexPage extends Page {
  constructor() {
    super('index-page')
  }

  headerUserName = (): PageElement => cy.get('[data-qa=header-user-name]')

  createBarcodeLink = (): PageElement => cy.contains('Create a barcode')
}
