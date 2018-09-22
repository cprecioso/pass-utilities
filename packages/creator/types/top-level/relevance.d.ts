import { beacon, location } from "../low-level"

export interface Relevance {
  beacons?: beacon.Beacon[]
  locations?: location.Location[]
  maxDistance?: number
  relevantDate?: string
}
