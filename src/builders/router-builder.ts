import VueRouter, { RouteConfig } from 'vue-router'
import { Context } from '../context'

export class RouterBuilder {
  private context: Context
  public constructor(context: Context) {
    this.context = context
  }

  public addConstantRoutes(routes: RouteConfig[]): RouterBuilder {
    this.context.routes.constants.push(...routes)
    return this
  }

  public build(): VueRouter {
    let router = new VueRouter({
      mode: 'history',
      scrollBehavior: (to, from, savedPosition) => {
        if (savedPosition) {
          return savedPosition
        } else {
          return { x: 0, y: 0 }
        }
      },
      base: process.env.BASE_URL,
      routes: this.context.routes.constants
    })
    return router
  }
}
