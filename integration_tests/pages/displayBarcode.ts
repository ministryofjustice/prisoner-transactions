import Page from './page'

export default class DisplayBarcodePage extends Page {
  constructor() {
    super('display-barcode')
  }

  barcodeResultExists = (): DisplayBarcodePage => {
    cy.get('#barcodeImage')
    return this
  }
}
