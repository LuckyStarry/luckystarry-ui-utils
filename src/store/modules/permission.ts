import { RouteConfig } from 'vue-router'
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { Context } from '../../context'

const hasPermission = (roles: string[], route: RouteConfig) => {
  if (route.meta && route.meta.roles) {
    return roles.some((role) => route.meta.roles.includes(role))
  } else {
    return true
  }
}

export const filterAsyncRoutes = (routes: RouteConfig[], roles: string[]) => {
  const res: RouteConfig[] = []
  routes.forEach((route) => {
    const r = { ...route }
    if (hasPermission(roles, r)) {
      if (r.children) {
        r.children = filterAsyncRoutes(r.children, roles)
      }
      res.push(r)
    }
  })
  return res
}

export interface IPermissionState {
  routes: RouteConfig[]
  dynamicRoutes: RouteConfig[]
}

@Module({ namespaced: true })
export class Permission extends VuexModule implements IPermissionState {
  public routes: RouteConfig[] = []
  public dynamicRoutes: RouteConfig[] = []
  public application: Context

  @Mutation
  private SET_ROUTES(routes: RouteConfig[]) {
    this.routes = this.application.routes.constants.concat(routes)
    this.dynamicRoutes = routes
  }

  @Action
  public GenerateRoutes(roles: string[]) {
    let accessedRoutes
    if (roles.includes('admin')) {
      accessedRoutes = this.application.routes.dynamic
    } else {
      accessedRoutes = filterAsyncRoutes(this.application.routes.dynamic, roles)
    }
    this.SET_ROUTES(accessedRoutes)
  }
}
