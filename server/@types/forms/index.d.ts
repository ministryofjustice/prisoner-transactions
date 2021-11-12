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

  export interface FindRecipientsForm {
    prisoner?: string
    results?: Array<Recipient>
    findByPrisonNumber?: boolean
  }

  export interface SelectRecipientForm {
    prisonNumber?: string
  }

  export interface AddRecipientForm {
    prisonerName?: string
    prisonNumber?: string
    prisonName?: string
    findByPrisonNumber?: boolean
  }

  export interface Recipient {
    prisonerName?: string
    prisonNumber?: string
    prisonName?: string
  }
}
