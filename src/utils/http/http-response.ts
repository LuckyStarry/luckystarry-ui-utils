export interface HttpResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
}
