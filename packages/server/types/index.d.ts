type VoP<V> = V | PromiseLike<V>

export namespace PassServer {
  export namespace Request {
    namespace Identification {
      interface Device {
        deviceLibraryIdentifier: string
        passTypeIdentifier: string
      }
      interface Pass {
        passTypeIdentifier: string
        serialNumber: string
      }
      type Registration = Device & Pass
    }

    interface Authorization {
      provider: string
      token: string
    }
  }

  export namespace Response {
    interface GetUpdates {
      lastUpdated: string
      serialNumbers: string[]
    }
    export type Pass = Buffer
  }

  export namespace HTTPCodes {
    const enum Registration {
      AlreadyRegistered = 200,
      Success = 201,
      NotAuthorized = 401
    }

    const enum GetUpdates {
      NoPasses = 204
    }

    const enum GetPass {
      NotChanged = 304,
      NotAuthorized = 401
    }

    const enum Unregistration {
      Success = 200,
      NotAuthorized = 401
    }
  }

  export namespace Callbacks {
    type Registration = (
      data: {
        identification: Request.Identification.Registration
        authorization: Request.Authorization
        pushToken: string
      }
    ) => VoP<HTTPCodes.Registration>

    type GetUpdates = (
      data: { identification: Request.Identification.Device; tag?: string }
    ) => VoP<Response.GetUpdates | HTTPCodes.GetUpdates>

    type GetPass = (
      data: {
        identification: Request.Identification.Pass
        authorization: Request.Authorization
        cachedSince?: string
      }
    ) => VoP<Response.Pass | HTTPCodes.GetPass>

    type Unregistration = (
      data: {
        identification: Request.Identification.Registration
        authorization: Request.Authorization
      }
    ) => VoP<HTTPCodes.Unregistration>

    type LogError = (data: { logs: string[] }) => void
  }

  export interface Delegate {
    onRegistration: Callbacks.Registration
    onGetUpdates: Callbacks.GetUpdates
    onGetPass: Callbacks.GetPass
    onUnregistration: Callbacks.Unregistration
    onLogError: Callbacks.LogError
  }
}

export default PassServer
