import zip from "gulp-zip"
import { obj as intoStream } from "into-stream"
import { makePassFile } from "pass-creator"
import { PassData } from "pass-types"
import pumpify from "pumpify"
import { Duplex } from "stream"
import File from "vinyl"
import { createHasher } from "./hasher"

export declare namespace makeVinylPassFile {
  interface Options {
    filename?: string
  }
}

export async function makeVinylPassFile(
  passData: PassData,
  { filename = "pass.json" }: makeVinylPassFile.Options = {}
) {
  const contents = await makePassFile(passData)
  return new File({ path: filename, contents }) as File
}

export declare namespace sourcePassFile {
  interface Options {
    filename?: string
  }
}

export function sourcePassFile(
  passData: PassData,
  options?: makeVinylPassFile.Options
) {
  return intoStream(makeVinylPassFile(passData, options))
}

export function makePassPackager() {
  return zip("pass.pkpass")
}

export declare namespace makePassPipeline {
  interface Options extends createHasher.Options {}
}

export function makePassPipeline(
  passData: PassData,
  { maxConcurrency }: makePassPipeline.Options = {}
): Duplex {
  const pipeline = pumpify(createHasher({ maxConcurrency }), makePassPackager())
  pipeline.write(makeVinylPassFile(passData))
  return pipeline
}
