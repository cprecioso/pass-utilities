import { obj as through } from "through2"
import * as File from "vinyl"
import { createHash } from "crypto"
import * as getStream from "get-stream"

export default function hashsum(): NodeJS.ReadWriteStream {
  const hashes = {} as { [key: string]: Promise<string> }

  return through(

    function processFile(file: File, enc, cb) {
      if (file.isBuffer()) {
        hashes[file.basename] = Promise.resolve(
          createHash("SHA1")
            .update(file.contents)
            .digest("hex")
        )
      } else if (file.isStream()) {
        hashes[file.basename] = getStream(
          file.clone().contents
            .pipe(createHash("SHA1"))
          , { encoding: "hex" }
        )
      }
      cb(null, file)
    },

    async function writeSums(cb) {
      const fulfilledHashes = {} as { [key: string]: string }
      for (const file in hashes) fulfilledHashes[file] = await hashes[file]
      const sumFile = new File({
        path: "manifest.json",
        contents: Buffer.from(JSON.stringify(fulfilledHashes))
      })
      this.push(sumFile)
      cb()
    }

  )
}
