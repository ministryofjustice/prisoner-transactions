declare module 'forms' {
  export interface RequestLinkForm {
    email?: string
  }
  export interface CreateBarcodeForm {
    prisoner?: string
  }
  export interface ScanBarcodeForm {
    barcode?: string
  }
}
