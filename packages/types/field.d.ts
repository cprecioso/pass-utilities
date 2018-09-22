export declare namespace Field {
  export interface Standard {
    attributedValue?: string | number
    changeMessage?: string
    key: string
    label?: string
    value: string | number
  }

  export interface Date extends Standard {
    value: string
    attributedValue?: string
    dateStyle: PresentationOptions.DateTimeStyle
    ignoresTimeZone?: boolean
    isRelative?: boolean
    timeStyle: PresentationOptions.DateTimeStyle
  }

  export interface Number extends Standard {
    value: number
    attributedValue?: number
    currencyCode?: string
    numberStyle?: PresentationOptions.NumberStyle
  }

  export type Detectable<F extends Standard = Standard> = F & {
    dataDetectorTypes?: PresentationOptions.DataDetector[]
  }

  export type Alignable<F extends Standard = Standard> = F & {
    textAlignment?: PresentationOptions.TextAlignment
  }

  export namespace PresentationOptions {
    export const enum DataDetector {
      PhoneNumber = "PKDataDetectorTypePhoneNumber",
      Link = "PKDataDetectorTypeLink",
      Address = "PKDataDetectorTypeAddress",
      CalendarEvent = "PKDataDetectorTypeCalendarEvent"
    }

    export const enum TextAlignment {
      Left = "PKTextAlignmentLeft",
      Center = "PKTextAlignmentCenter",
      Right = "PKTextAlignmentRight",
      Natural = "PKTextAlignmentNatural"
    }

    export const enum DateTimeStyle {
      None = "PKDateStyleNone",
      Short = "PKDateStyleShort",
      Medium = "PKDateStyleMedium",
      Long = "PKDateStyleLong",
      Full = "PKDateStyleFull"
    }

    export const enum NumberStyle {
      Decimal = "PKNumberStyleDecimal",
      Percent = "PKNumberStylePercent",
      Scientific = "PKNumberStyleScientific",
      SpellOut = "PKNumberStyleSpellOut"
    }
  }
}

export type Field = Field.Standard | Field.Date | Field.Number
