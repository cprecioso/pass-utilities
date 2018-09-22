export declare namespace Barcode {
  export interface Base {
    altText?: string
    message: string
    messageEncoding: string
  }

  export interface New extends Base {
    format: Barcode.Type
  }

  export const enum Type {
    QR = "PKBarcodeFormatQR",
    PDF417 = "PKBarcodeFormatPDF417",
    Aztec = "PKBarcodeFormatAztec",
    Code128 = "PKBarcodeFormatCode128"
  }

  export interface Old extends Base {
    format: Old.Type
  }

  export namespace Old {
    const enum Type {
      QR = "PKBarcodeFormatQR",
      PDF417 = "PKBarcodeFormatPDF417",
      Aztec = "PKBarcodeFormatAztec"
    }
  }
}

export type Barcode = Barcode.New
