export interface Response<T = any> {
  Success: boolean
  Message: string
  Entity: T
}
