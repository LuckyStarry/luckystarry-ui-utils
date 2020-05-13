import { Store } from 'vuex'
import { Context } from '../context'
import { IRootState } from '../store'

export class StoreBuilder {
  private context: Context
  public constructor(context: Context) {
    this.context = context
  }

  public build(): Store<IRootState> {
    return new Store<IRootState>({})
  }
}
