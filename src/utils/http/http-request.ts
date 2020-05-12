export interface HttpRequest {
  url?: string
  baseURL?: string
  headers?: any
  params?: any
  paramsSerializer?: (params: any) => string
  data?: any
  timeout?: number
  timeoutErrorMessage?: string
  maxContentLength?: number
  maxRedirects?: number
}
