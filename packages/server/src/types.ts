export type ValueOrPromise<V> = V | PromiseLike<V>

export interface PassServerRequestDeviceIdentification {
  deviceLibraryIdentifier: string
  passTypeIdentifier: string
}

export interface PassServerRequestPassIdentification {
  passTypeIdentifier: string
  serialNumber: string
}

export type PassServerRequestDevicePassIdentification = PassServerRequestDeviceIdentification &
  PassServerRequestPassIdentification

export interface PassServerRequestAuthorization {
  provider: string
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
  lastUpdated: string
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
    identification: PassServerRequestDevicePassIdentification
    authorization: PassServerRequestAuthorization
    pushToken: string
  }): ValueOrPromise<PassServerRegistrationCode>

  onGetUpdates(data: {
    identification: PassServerRequestDeviceIdentification
    tag?: string
  }): ValueOrPromise<PassServerGetUpdatesResponse | PassServerGetUpdatesCode>

  onGetPass(data: {
    identification: PassServerRequestPassIdentification
    authorization: PassServerRequestAuthorization
    cachedSince?: string
  }): ValueOrPromise<Pass | PassServerGetPassCode>

  onUnregistration(data: {
    identification: PassServerRequestDevicePassIdentification
    authorization: PassServerRequestAuthorization
  }): ValueOrPromise<PassServerUnregistrationCode>

  onLogError(data: { logs: string[] }): void
}
