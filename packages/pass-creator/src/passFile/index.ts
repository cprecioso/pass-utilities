import * as topLevel from "./top-level"

export type Base = topLevel.standard.Standard &
  topLevel.associatedApp.AssociatedApp &
  topLevel.companionApp.CompanionApp &
  topLevel.expiration.Expiration &
  topLevel.relevance.Relevance &
  topLevel.visualAppearance.VisualAppearance &
  topLevel.webService.WebService

export type BoardingPass = Base &
  topLevel.style.BoardingPassStyle &
  topLevel.visualAppearance.GroupedVisualAppearance

export type Coupon = Base & topLevel.style.CouponStyle

export type EventTicket = Base &
  topLevel.style.EventTicketStyle &
  topLevel.visualAppearance.GroupedVisualAppearance

export type Generic = Base & topLevel.style.GenericStyle

export type StoreCard = Base & topLevel.style.StoreCardStyle & topLevel.nfc.NFC

export type PassFile = BoardingPass | Coupon | EventTicket | Generic | StoreCard
