declare module "pump" {
  namespace pump {
    type Callback = (err: any) => void
  }

  function pump(
    ...streams: (
      | NodeJS.ReadableStream
      | NodeJS.WritableStream
      | pump.Callback)[]
  ): NodeJS.ReadableStream

  export = pump
}
