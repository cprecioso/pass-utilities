import { Beacon, Location } from "../low-level"

export interface Relevance {
  beacons?: Beacon[]
  locations?: Location[]
  maxDistance?: number
  relevantDate?: string
}
