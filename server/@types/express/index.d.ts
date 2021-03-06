import {
  AddRecipientForm,
  CreateBarcodeForm,
  FindRecipientsForm,
  Recipient,
  RequestLinkForm,
  ScanBarcodeForm,
  SelectRecipientForm,
} from 'forms'

export default {}

declare module 'express-session' {
  // Declare that the session will potentially contain these additional fields
  interface SessionData {
    returnTo: string
    nowInMinutes: number
    requestLinkForm: RequestLinkForm
    createBarcodeForm: CreateBarcodeForm
    findRecipientsForm: FindRecipientsForm
    selectRecipientForm: SelectRecipientForm
    addRecipientForm: AddRecipientForm
    recipients: Array<Recipient>
    createBarcodeToken: string
    barcodeUserEmail: string
    barcodeImageUrl: string
    scanBarcodeForm: ScanBarcodeForm
  }
}

export declare global {
  namespace Express {
    interface User {
      username: string
      token: string
      authSource: string
    }

    interface Request {
      verified?: boolean

      flash(type: string, message: Array<Record<string, string>>): number

      flash(message: 'errors'): Array<Record<string, string>>
    }
  }
}
