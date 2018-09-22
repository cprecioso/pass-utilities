import { createHash } from "crypto"
import getStream from "get-stream"
import pump from "pump"
import File from "vinyl"

const tick = () => new Promise(f => setImmediate(f))

export async function hashFile(file: File) {
  await tick()
  if (file.isBuffer()) {
    return createHash("SHA1")
      .update(file.contents)
      .digest("hex")
  } else if (file.isStream()) {
    return getStream(pump(file.contents, createHash("SHA1")), {
      encoding: "hex"
    })
  } else {
    return null
  }
}
