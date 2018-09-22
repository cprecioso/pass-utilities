import * as field from "../field"

export interface PassStructure {
  auxiliaryFields?: field.Alignable<field.Field>[]
  backFields?: field.Detectable<field.Field>[]
  headerFields?: field.Alignable<field.Field>[]
  primaryFields?: field.Field[]
  secondaryFields?: field.Alignable<field.Field>[]
}

export type TransitType =
  | "PKTransitTypeAir"
  | "PKTransitTypeBoat"
  | "PKTransitTypeBus"
  | "PKTransitTypeGeneric"
  | "PKTransitTypeTrain"

export interface TransitPassStructure extends PassStructure {
  transitType: TransitType
}
