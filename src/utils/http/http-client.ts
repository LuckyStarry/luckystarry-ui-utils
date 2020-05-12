import axios, { AxiosInstance } from 'axios'
import { HttpClientConfig } from './http-client-config'
import { HttpRequest } from './http-request'
import { HttpResponse } from './http-response'
export class HttpClient {
  private instance: AxiosInstance
  public constructor(config?: HttpClientConfig) {
    config = Object.assign({}, config)
    this.instance = axios.create(config)
  }

  public get<T = any, R = HttpResponse<T>>(
    url: string,
    config?: HttpRequest
  ): Promise<R> {
    return axios.get(url, config)
  }

  public post<T = any, R = HttpResponse<T>>(
    url: string,
    data?: any,
    config?: HttpRequest
  ): Promise<R> {
    return axios.post(url, data, config)
  }

  public put<T = any, R = HttpResponse<T>>(
    url: string,
    data?: any,
    config?: HttpRequest
  ): Promise<R> {
    return axios.put(url, data, config)
  }

  public delete<T = any, R = HttpResponse<T>>(
    url: string,
    config?: HttpRequest
  ): Promise<R> {
    return axios.delete(url, config)
  }
}
