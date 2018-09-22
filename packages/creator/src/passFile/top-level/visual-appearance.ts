import { barcode } from "../low-level"

export interface VisualAppearance {
  backgroundColor?: string
  foregroundColor?: string
  labelColor?: string
  logoText?: string
  suppressStripShine?: boolean
  barcode?: barcode.OldBarcode
  barcodes?: barcode.Barcode[]
}

export interface GroupedVisualAppearance extends VisualAppearance {
  groupingIdentifier?: string
}
