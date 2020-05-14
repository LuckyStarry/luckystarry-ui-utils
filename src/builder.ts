import Vue, { VueConstructor } from 'vue'
import VueRouter from 'vue-router'
import { Store } from 'vuex'
import * as builders from './builders'
import { Context } from './context'
import { IRootState } from './store'
import { AppModule } from './store/modules/app'
import { PermissionModule } from './store/modules/permission'
import { UserModule } from './store/modules/user'

export class Builder implements builders.VueBuilder {
  private _payload: any = {}
  private _routers: VueRouter
  private _store: Store<IRootState>
  private _app: VueConstructor
  private _context: Context

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

  public app(app: VueConstructor): Builder {
    this._app = app
    return this
  }

  public build(): Vue {
    let app = new Vue({
      router: this._routers,
      store: this._store,
      // i18n,
      ...this._payload,
      render: (h) => h(this._app)
    })
    AppModule.application = this._context
    UserModule.application = this._context
    PermissionModule.application = this._context
    app.$mount('#app')
    return app
  }
}