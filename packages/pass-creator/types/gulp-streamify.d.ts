declare module "gulp-streamify" {
  function streamify(stream: NodeJS.ReadWriteStream): NodeJS.ReadWriteStream
  function streamify(fn: () => NodeJS.ReadWriteStream): NodeJS.ReadWriteStream
  export = streamify
}
