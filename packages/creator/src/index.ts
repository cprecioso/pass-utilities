import getStream from "get-stream"
import streamify from "gulp-streamify"
import zip from "gulp-zip"
import intoStream from "into-stream"
import merge from "merge-stream"
import pump from "pump"
import File from "vinyl"
import hashsum from "./hashsum"
import { PassFile } from "./passFile"

export interface PassbookPackage {
  pass: PassFile
  images: NodeJS.ReadWriteStream
}

export async function createPackage(info: PassbookPackage) {
  const pass = intoStream.obj(
    new File({
      path: "pass.json",
      contents: Buffer.from(JSON.stringify(info.pass))
    })
  )
  const bundle = pump(
    merge(pass, info.images),
    streamify(hashsum()),
    zip("pass.pkpass")
  )

  const [file] = (await getStream.array(bundle)) as File[]
  if (file.isBuffer()) {
    return file.contents
  } else if (file.isStream()) {
    return getStream.buffer(file.contents)
  } else {
    throw new Error("Can't find contents")
  }
}

export default createPackage
