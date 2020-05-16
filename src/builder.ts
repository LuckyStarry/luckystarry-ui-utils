import { AxiosInstance } from 'axios'
import { v4 as uuid } from 'uuid'
import Vue, { VueConstructor } from 'vue'
import VueRouter, { Route } from 'vue-router'
import { Store } from 'vuex'
import * as builders from './builders'
import { Context } from './context'
import { Premission } from './directives'
import { IRootState } from './store'
import { ui } from './utils'

export class Builder implements builders.VueBuilder {
  private _payload: any = {}
  private _routers: VueRouter
  private _store: Store<IRootState>
  private _app: VueConstructor
  private _process: ui.Process
  private _message: ui.Message
  private _context: Context
  private _title: string
  private _axios: AxiosInstance

  public constructor(context?: Context) {
    this._context = context || new Context()
  }

  public static create(context?: Context): Builder {
    return new Builder(context)
  }

  public router(config: (bd: builders.RouterBuilder) => void): Builder {
    let builder = new builders.RouterBuilder(this._context)
    config(builder)
    this._routers = builder.build()
    return this
  }

  public store(config: (bd: builders.StoreBuilder) => void): Builder {
    let builder = new builders.StoreBuilder(this._context)
    config(builder)
    this._store = builder.build()
    return this
  }

  public extra(config: (payload: any) => void): Builder {
    config(this._payload)
    return this
  }

  public process(util: ui.Process): Builder {
    this._process = util
    return this
  }

  public message(util: ui.Message): Builder {
    this._message = util
    return this
  }

  public app(app: VueConstructor): Builder {
    this._app = app
    return this
  }

  public title(title: string): Builder {
    this._title = title
    return this
  }

  public axios(axios: AxiosInstance) {
    this._axios = axios
  }

  public build(): Vue {
    if (!this._routers) {
      this.router(() => {})
    }
    if (!this._store) {
      this.store(() => {})
    }
    let router = this._routers
    let store = this._store

    axiosInterceptor(this._axios, store)
    routerInterceptor(router, store)

    let app = new Vue({
      router,
      store,
      ...this._payload,
      render: (h) => h(this._app),
      directives: { permission: new Premission(store) }
    })
    app.$mount('#app')
    return app
  }
}

function axiosInterceptor(axios: AxiosInstance, store: Store<IRootState>) {
  if (!axios) {
    return
  }
  axios.interceptors.request.use(
    (config) => {
      // Add X-Access-Token header to every request, you can add other custom headers here
      if (store.state.user.token) {
        config.headers['Authorization'] = `Berear ${store.state.user.token}`
        config.headers['X-Authorization'] = store.state.user.token
      }
      config.headers['X-Ca-Nonce'] = uuid()
      return config
    },
    (error) => {
      // tslint:disable-next-line: no-floating-promises
      Promise.reject(error)
    }
  )
}

function routerInterceptor(router: VueRouter, store: Store<IRootState>) {
  router.beforeEach(async (to: Route, _: Route, next: any) => {
    // Start progress bar
    this._process?.start()
    // Determine whether the user has logged in
    if (store.state.user.token) {
      if (to.path === '/login') {
        // If is logged in, redirect to the home page
        next({ path: '/' })
        this._process?.done()
      } else {
        // Check whether the user has obtained his permission roles
        if (store.state.user.roles.length === 0) {
          try {
            // Note: roles must be a object array! such as: ['admin'] or ['developer', 'editor']
            await store.dispatch('user/GetUserInfo')
            const roles = store.state.user.roles
            // Generate accessible routes map based on role
            await store.dispatch('permission/GenerateRoutes', roles)
            // Dynamically add accessible routes
            router.addRoutes(store.state.permission.dynamic)
            // Hack: ensure addRoutes is complete
            // Set the replace: true, so the navigation will not leave a history record
            next({ ...to, replace: true })
          } catch (err) {
            // Remove token and redirect to login page
            await store.dispatch('user/ResetToken')
            this._message?.error(err || 'Has Error')
            next(`/login?redirect=${to.path}`)
            this._process?.done()
          }
        } else {
          next()
        }
      }
    } else {
      // Has no token
      if (to.meta?.white) {
        // In the free login whitelist, go directly
        next()
      } else {
        // Other pages that do not have permission to access are redirected to the login page.
        next(`/login?redirect=${to.path}`)
        this._process?.done()
      }
    }
  })

  router.afterEach((to: Route) => {
    this._process?.done()
  })
}
