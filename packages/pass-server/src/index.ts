import * as express from "express"

export type ValueOrPromise<V> = V | PromiseLike<V>

export interface PassServerRequestDeviceIdentification {
  deviceLibraryIdentifier: string
  passTypeIdentifier: string,
}

export interface PassServerRequestPassIdentification {
  passTypeIdentifier: string,
  serialNumber: string
}

export type PassServerRequestDevicePassIdentification =
  PassServerRequestDeviceIdentification
  & PassServerRequestPassIdentification

export interface PassServerRequestAuthorization {
  provider: string,
  token: string
}

export enum PassServerRegistrationCode {
  AlreadyRegistered = 200,
  Success = 201,
  NotAuthorized = 401
}

export enum PassServerGetUpdatesCode {
  NoPasses = 204
}

export interface PassServerGetUpdatesResponse {
  lastUpdated: string,
  serialNumbers: string[]
}

export enum PassServerGetPassCode {
  NotChanged = 304,
  NotAuthorized = 401
}

export type Pass = Buffer

export enum PassServerUnregistrationCode {
  Success = 200,
  NotAuthorized = 401
}

export interface PassServerCallbacks {
  onRegistration(data: {
    identification: PassServerRequestDevicePassIdentification,
    authorization: PassServerRequestAuthorization,
    pushToken: string
  }): ValueOrPromise<PassServerRegistrationCode>

  onGetUpdates(data: {
    identification: PassServerRequestDeviceIdentification,
    tag?: string
  }): ValueOrPromise<PassServerGetUpdatesResponse | PassServerGetUpdatesCode>

  onGetPass(data: {
    identification: PassServerRequestPassIdentification,
    authorization: PassServerRequestAuthorization,
    cachedSince?: string
  }): ValueOrPromise<Pass | PassServerGetPassCode>

  onUnregistration(data: {
    identification: PassServerRequestDevicePassIdentification,
    authorization: PassServerRequestAuthorization
  }): ValueOrPromise<PassServerUnregistrationCode>

  onLogError(data: {
    logs: string[]
  }): void
}

function parseIdentification(params: { [key: string]: string }) {
  const { deviceLibraryIdentifier, passTypeIdentifier, serialNumber } = params
  return { deviceLibraryIdentifier, passTypeIdentifier, serialNumber }
}

function parseAuthorization(header = " ") {
  const [provider, token] = header.split(" ")
  return {provider, token}
}

export function createServer(callbacks: PassServerCallbacks): express.Express {
  const app = express()

  app.use(express.json())

  app.post("/v1/devices/:deviceLibraryIdentifier/registrations/:passTypeIdentifier/:serialNumber", async (req, res) => {
    const response =
      await callbacks.onRegistration({
        identification: parseIdentification(req.params),
        authorization: parseAuthorization(req.headers.authorization as string),
        pushToken: req.body.pushToken
      })
    res.sendStatus(response)
  })

  app.get("/v1/devices/:deviceLibraryIdentifier/registrations/:passTypeIdentifier", async (req, res) => {
    const response =
      await callbacks.onGetUpdates({
        identification: parseIdentification(req.params),
        tag: req.query.passesUpdatedSince
      })
    if (typeof response === "number") {
      res.sendStatus(response)
    } else {
      res.json(response)
    }
  })

  app.get("/v1/passes/:passTypeIdentifier/:serialNumber", async (req, res) => {
    const response =
      await callbacks.onGetPass({
        identification: parseIdentification(req.params),
        authorization: parseAuthorization(req.headers.authorization as string),
        cachedSince: req.headers["if-modified-since"] as string
      })
    if (typeof response === "number") {
      res.sendStatus(response)
    } else {
      res.type("application/vnd.apple.pkpass")
      res.send(response)
    }
  })

  app.delete("/v1/devices/:deviceLibraryIdentifier/registrations/:passTypeIdentifier/:serialNumber", async (req, res) => {
    const response =
      await callbacks.onUnregistration({
        identification: parseIdentification(req.params),
        authorization: parseAuthorization(req.headers.authorization as string)
      })
    res.sendStatus(response)
  })

  app.post("/v1/log", async (req, res) => {
    callbacks.onLogError({ logs: req.body })
    res.sendStatus(200)
  })

  return app
}

export default createServer
