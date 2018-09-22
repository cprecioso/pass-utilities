import { structure } from "../low-level"

export interface BoardingPassStyle {
  boardingPass: structure.TransitPassStructure
}

export interface CouponStyle {
  coupon: structure.PassStructure
}

export interface EventTicketStyle {
  eventTicket: structure.PassStructure
}

export interface GenericStyle {
  generic: structure.PassStructure
}

export interface StoreCardStyle {
  storeCard: structure.PassStructure
}

export type Style =
  | BoardingPassStyle
  | CouponStyle
  | EventTicketStyle
  | GenericStyle
  | StoreCardStyle
