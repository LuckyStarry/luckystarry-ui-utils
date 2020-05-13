import VueRouter, { RouteConfig } from 'vue-router'
import { Profile } from './models'

export class Context {
  public constructor() {
    this.apis = { getProfile: () => Promise.reject('未实现的方法') }
    this.routes = new DefaultRoutes(this)
    this.cookie = new DefaultCookie(this)
    this.token = new DefaultToken(this)
    this.system = new DefaultSystem(this)
  }
  public apis: Apis
  public routes: Routes
  public cookie: Cookie
  public token: Token
  public system: System
}

export interface Apis {
  getProfile(): Promise<Profile>
}

export interface Routes {
  constants: RouteConfig[]
  dynamic: RouteConfig[]
  reset(): void
  add(...route: RouteConfig[]): void
  create(): VueRouter
}

export interface Cookie {
  set(
    key: string,
    value: String,
    payliad?: { expiry?: Date; domain?: string }
  ): void
  get(key: string): string
  delete(key: string): void
}

export interface Token {
  set(token: string): void
  get(): string
  delete(): void
}

export interface System {
  setSize(value: string): void
  getSize(): string
  setSidebarStatus(value: string): void
  getSidebarStatus(): string
}

class DefaultRoutes implements Routes {
  private context: Context
  public constructor(context: Context) {
    this.context = context
  }

  private router: VueRouter
  public constants: RouteConfig[]
  public dynamic: RouteConfig[]
  public reset(): void {
    let router = this.create() as any
    let original = this.router as any
    original.matcher = router.matcher
  }
  public add(...route: RouteConfig[]): void {}
  public create(): VueRouter {
    return new VueRouter({
      mode: 'history',
      scrollBehavior: (to, from, savedPosition) => {
        if (savedPosition) {
          return savedPosition
        } else {
          return { x: 0, y: 0 }
        }
      },
      base: process.env.BASE_URL,
      routes: this.constants
    })
  }
}

class DefaultCookie implements Cookie {
  private context: Context
  public constructor(context: Context) {
    this.context = context
  }

  public set(
    key: string,
    value: String,
    payliad?: { expiry?: Date; domain?: string }
  ): void {
    throw new Error('Method not implemented.')
  }
  public get(key: string): string {
    throw new Error('Method not implemented.')
  }
  public delete(key: string): void {
    throw new Error('Method not implemented.')
  }
}

class DefaultToken implements Token {
  private context: Context
  public constructor(context: Context) {
    this.context = context
  }

  public set(token: string): void {
    throw new Error('Method not implemented.')
  }
  public get(): string {
    throw new Error('Method not implemented.')
  }
  public delete(): void {
    throw new Error('Method not implemented.')
  }
}

class DefaultSystem implements System {
  private context: Context
  public constructor(context: Context) {
    this.context = context
  }

  public setSize(value: string): void {
    throw new Error('Method not implemented.')
  }
  public getSize(): string {
    throw new Error('Method not implemented.')
  }
  public setSidebarStatus(value: string): void {
    throw new Error('Method not implemented.')
  }
  public getSidebarStatus(): string {
    throw new Error('Method not implemented.')
  }
}
