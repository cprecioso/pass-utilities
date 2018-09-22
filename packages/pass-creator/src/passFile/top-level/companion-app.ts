export type JSONValue = string | number | JSONObject | boolean | null

export interface JSONObject {
  [key: string]: JSONValue | JSONValue[]
}

export interface CompanionApp {
  userInfo?: JSONObject
}
