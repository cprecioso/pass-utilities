import { PassStructure } from "../low-level"

declare namespace Style {
  export interface BoardingPass {
    boardingPass: PassStructure.Transit
  }

  export interface Coupon {
    coupon: PassStructure
  }

  export interface EventTicket {
    eventTicket: PassStructure
  }

  export interface Generic {
    generic: PassStructure
  }

  export interface StoreCard {
    storeCard: PassStructure
  }
}

export type Style =
  | Style.BoardingPass
  | Style.Coupon
  | Style.EventTicket
  | Style.Generic
  | Style.StoreCard
