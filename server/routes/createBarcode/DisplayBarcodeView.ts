export default class DisplayBarcodeView {
  constructor(private readonly barcode: string) {}

  get renderArgs(): { barcode: string } {
    return {
      barcode: this.barcode,
    }
  }
}
