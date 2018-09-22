import * as topLevel from "./top-level"

export declare namespace PassData {
  export type Base = topLevel.Standard &
    topLevel.AssociatedApp &
    topLevel.CompanionApp &
    topLevel.Expiration &
    topLevel.Relevance &
    topLevel.VisualAppearance &
    topLevel.WebService

  export type BoardingPass = Base &
    topLevel.Style.BoardingPass &
    topLevel.GroupedVisualAppearance

  export type Coupon = Base & topLevel.Style.Coupon

  export type EventTicket = Base &
    topLevel.Style.EventTicket &
    topLevel.GroupedVisualAppearance

  export type Generic = Base & topLevel.Style.Generic

  export type StoreCard = Base & topLevel.Style.StoreCard & topLevel.NFC
}

export type PassData =
  | PassData.BoardingPass
  | PassData.Coupon
  | PassData.EventTicket
  | PassData.Generic
  | PassData.StoreCard
