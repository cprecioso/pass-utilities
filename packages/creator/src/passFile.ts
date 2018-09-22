import { PassData } from "pass-types"
import { normalizePassData } from "./normalize"

export async function makePassFile(passData: PassData) {
  return Buffer.from(JSON.stringify(normalizePassData(passData)))
}
