export default class DisplayBarcodeView {
  constructor(private readonly barcodeImageUrl: string) {}

  get renderArgs(): { barcodeImageUrl: string } {
    return {
      barcodeImageUrl: this.barcodeImageUrl,
    }
  }
}
