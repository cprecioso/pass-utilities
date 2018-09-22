import express from "express"
import { PassServer } from "../types"
export { PassServer } from "../types"

function parseIdentification(params: { [key: string]: string }) {
  const { deviceLibraryIdentifier, passTypeIdentifier, serialNumber } = params
  return { deviceLibraryIdentifier, passTypeIdentifier, serialNumber }
}

function parseAuthorization(header = " ") {
  const [provider, token] = header.split(" ")
  return { provider, token }
}

export function createPassServer(
  delegate: PassServer.Delegate
): express.Express {
  const app = express()

  app.use(express.json())

  app.post(
    "/v1/devices/:deviceLibraryIdentifier/registrations/:passTypeIdentifier/:serialNumber",
    async (req, res) => {
      const response = await delegate.onRegistration({
        identification: parseIdentification(req.params),
        authorization: parseAuthorization(req.headers.authorization as string),
        pushToken: req.body.pushToken
      })
      res.sendStatus(response)
    }
  )

  app.get(
    "/v1/devices/:deviceLibraryIdentifier/registrations/:passTypeIdentifier",
    async (req, res) => {
      const response = await delegate.onGetUpdates({
        identification: parseIdentification(req.params),
        tag: req.query.passesUpdatedSince
      })
      if (typeof response === "number") {
        res.sendStatus(response)
      } else {
        res.json(response)
      }
    }
  )

  app.get("/v1/passes/:passTypeIdentifier/:serialNumber", async (req, res) => {
    const response = await delegate.onGetPass({
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

  app.delete(
    "/v1/devices/:deviceLibraryIdentifier/registrations/:passTypeIdentifier/:serialNumber",
    async (req, res) => {
      const response = await delegate.onUnregistration({
        identification: parseIdentification(req.params),
        authorization: parseAuthorization(req.headers.authorization as string)
      })
      res.sendStatus(response)
    }
  )

  app.post("/v1/log", async (req, res) => {
    delegate.onLogError({ logs: req.body })
    res.sendStatus(200)
  })

  return app
}

export default createPassServer
