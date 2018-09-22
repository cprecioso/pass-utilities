declare module "pumpify" {
  import { Duplex } from "stream"

  function pumpify(
    ...streams: (NodeJS.ReadableStream | NodeJS.WritableStream)[]
  ): Duplex

  export = pumpify
}
