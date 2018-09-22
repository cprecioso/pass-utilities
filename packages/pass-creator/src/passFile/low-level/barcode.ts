export type BarcodeType =
  | "PKBarcodeFormatQR"
  | "PKBarcodeFormatPDF417"
  | "PKBarcodeFormatAztec"
  | "PKBarcodeFormatCode128"

export interface Barcode {
  altText?: string
  format: BarcodeType
  message: string
  messageEncoding: string
}

export type OldBarcodeType =
  | "PKBarcodeFormatQR"
  | "PKBarcodeFormatPDF417"
  | "PKBarcodeFormatAztec"

export interface OldBarcode extends Barcode {
  format: OldBarcodeType
}
