import { hashFile } from "pass-creator"
import { obj as concurrentThrough } from "through2-concurrent"
import File from "vinyl"

export declare namespace createHasher {
  interface Options {
    maxConcurrency?: number
    filename?: string
  }
}

export function createHasher({
  maxConcurrency,
  filename = "manifest.json"
}: createHasher.Options = {}): NodeJS.ReadWriteStream {
  const hashes: Promise<[string, string | null]>[] = []

  return concurrentThrough(
    { maxConcurrency },

    function processFile(file: File, enc, cb) {
      const hash = hashFile(file.clone())
      hashes.push(Promise.all([file.path, hash]))
      cb(null, file)
    },

    async function writeSums(cb) {
      const jsonBody = (await Promise.all(hashes))
        .filter((info): info is [string, string] => Boolean(info[1]))
        .map(([path, hash]) => `${JSON.stringify(path)}:"${hash}"`)
        .join(",")

      const jsonText = `{${jsonBody}}`

      const sumFile = new File({
        path: filename,
        contents: Buffer.from(jsonText)
      })

      this.push(sumFile)

      cb()
    }
  )
}
