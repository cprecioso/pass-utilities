import fse from "fs-extra"
import getStream from "get-stream"
import { obj as intoStream } from "into-stream"
import toPairs from "lodash.topairs"
import { PassData } from "pass-types"
import pump from "pump"
import File from "vinyl"
import { makePassPipeline } from "./gulp"

type PoV<T> = T | Promise<T>

async function normalizeExtraFile([name, file]: [
  string,
  PoV<string | Buffer | NodeJS.ReadableStream>
]) {
  const _file = await file
  return new File({
    path: name,
    contents: typeof _file === "string" ? fse.createReadStream(_file) : _file
  })
}

type ExtraFiles = {
  [name: string]: PoV<string | Buffer | NodeJS.ReadableStream>
}

export async function createPackage(
  passData: PassData,
  extraFiles: ExtraFiles = {}
) {
  const files = toPairs(extraFiles).map(normalizeExtraFile)

  const bundle = pump(intoStream(files), makePassPipeline(passData))

  const [file] = (await getStream.array(bundle)) as File[]

  if (file.isBuffer()) {
    return file.contents
  } else if (file.isStream()) {
    return getStream.buffer(file.contents)
  } else {
    throw new Error("Can't find contents")
  }
}
