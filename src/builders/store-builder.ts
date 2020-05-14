import { Store } from 'vuex'
import { Context } from '../context'
import {
  App,
  ErrorLog,
  IRootState,
  Permission,
  Settings,
  TagsView,
  User
} from '../store'

export class StoreBuilder {
  private context: Context
  public constructor(context: Context) {
    this.context = context
  }

  public build(): Store<IRootState> {
    let store = new Store<IRootState>({})
    store.registerModule('app', new App(this.context))
    store.registerModule('user', new User(this.context))
    store.registerModule('errorLog', ErrorLog)
    store.registerModule('permission', new Permission(this.context))
    store.registerModule('settings', Settings)
    store.registerModule('tagsView', TagsView)
    return store
  }
}
