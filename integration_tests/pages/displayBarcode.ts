import Page from './page'

export default class DisplayBarcodePage extends Page {
  constructor() {
    super('display-barcode')
  }

  barcodeResultContains = (text: string): DisplayBarcodePage => {
    cy.get('[data-qa="barcode-result"]').contains(text)
    return this
  }
}
