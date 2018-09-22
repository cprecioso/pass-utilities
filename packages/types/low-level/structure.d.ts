import { Field } from "../field"

export interface PassStructure {
  auxiliaryFields?: Field.Alignable[]
  backFields?: Field.Detectable[]
  headerFields?: Field.Alignable[]
  primaryFields?: Field[]
  secondaryFields?: Field.Alignable[]
}

export declare namespace PassStructure {
  export namespace Transit {
    export const enum Type {
      Air = "PKTransitTypeAir",
      Boat = "PKTransitTypeBoat",
      Bus = "PKTransitTypeBus",
      Generic = "PKTransitTypeGeneric",
      Train = "PKTransitTypeTrain"
    }
  }

  export interface Transit extends PassStructure {
    transitType: Transit.Type
  }
}
