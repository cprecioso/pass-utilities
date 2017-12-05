import { PassFile } from "./passFile"
import * as intoStream from "into-stream"
import * as getStream from "get-stream"
import merge = require("merge-stream")
import hashsum from "./hashsum"
import * as File from "vinyl"
import streamify = require("gulp-streamify")
import * as zip from "gulp-zip"

export interface PassbookPackage {
  pass: PassFile,
  images: NodeJS.ReadWriteStream
}

export async function createPackage(info: PassbookPackage) {
  const pass = intoStream.obj(
    new File({
      path: "pass.json",
      contents: Buffer.from(JSON.stringify(info.pass))
    })
  )
  const bundle =
    merge(pass, info.images)
      .pipe(streamify(hashsum()))
      .pipe(zip("pass.pkpass"))

  const [file] = await getStream.array(bundle) as File[]
  if (file.isBuffer()) {
    return file.contents
  } else if (file.isStream()) {
    return getStream.buffer(file.contents)
  } else {
    throw new Error("Can't find contents")
  }
}

export default createPackage
