import Page, { PageElement } from './page'
import CreateBarcodePage from './createBarcode'

export default class IndexPage extends Page {
  constructor() {
    super('index-page')
  }

  headerUserName = (): PageElement => cy.get('[data-qa=header-user-name]')

  clickCreateBarcodeLink = (): CreateBarcodePage => {
    cy.contains('#create-barcode').click()
    return Page.verifyOnPage(CreateBarcodePage)
  }
}
