export interface StandardField {
  attributedValue?: string | number
  changeMessage?: string
  key: string
  label?: string
  value: string | number
}

export type DataDetector =
  | "PKDataDetectorTypePhoneNumber"
  | "PKDataDetectorTypeLink"
  | "PKDataDetectorTypeAddress"
  | "PKDataDetectorTypeCalendarEvent"

export type TextAlignment =
  | "PKTextAlignmentLeft"
  | "PKTextAlignmentCenter"
  | "PKTextAlignmentRight"
  | "PKTextAlignmentNatural"

export type Detectable<F extends StandardField> = F & {
  dataDetectorTypes?: DataDetector[]
}

export type Alignable<F extends StandardField> = F & {
  textAlignment?: TextAlignment
}

export type DateTimeStyle =
  | "PKDateStyleNone"
  | "PKDateStyleShort"
  | "PKDateStyleMedium"
  | "PKDateStyleLong"
  | "PKDateStyleFull"

export interface DateField extends StandardField {
  value: string
  attributedValue?: string
  dateStyle: DateTimeStyle
  ignoresTimeZone?: boolean
  isRelative?: boolean
  timeStyle: DateTimeStyle
}

export type NumberStyle =
  | "PKNumberStyleDecimal"
  | "PKNumberStylePercent"
  | "PKNumberStyleScientific"
  | "PKNumberStyleSpellOut"

export interface NumberField extends StandardField {
  value: number
  attributedValue?: number
  currencyCode?: string
  numberStyle?: NumberStyle
}

export type Field = StandardField | DateField | NumberField
