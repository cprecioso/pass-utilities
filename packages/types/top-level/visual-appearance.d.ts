import { Barcode } from "../low-level"

export interface VisualAppearance {
  backgroundColor?: string
  foregroundColor?: string
  labelColor?: string
  logoText?: string
  suppressStripShine?: boolean
  barcode?: Barcode.Old
  barcodes?: Barcode[]
}

export interface GroupedVisualAppearance extends VisualAppearance {
  groupingIdentifier?: string
}
