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
    let store = new Store<IRootState>({
      modules: {
        app: App,
        user: User,
        errorLog: ErrorLog,
        permission: Permission,
        settings: Settings,
        tagsView: TagsView
      }
    })
    store.state.context = this.context
    let token = this.context.token.get()
    if (token) {
      store.state.user.token = token
    }
    return store
  }
}
