import { DirectiveOptions } from 'vue'
import { Store } from 'vuex'
import { IRootState } from '../store'

export class Premission implements DirectiveOptions {
  private store: Store<IRootState>
  public constructor(store: Store<IRootState>) {
    this.store = store
  }

  public inserted(el, binding) {
    const { value } = binding
    const roles = this.store.state.user.roles || []
    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value
      const hasPermission = roles.some((role) => {
        return permissionRoles.includes(role)
      })
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`need roles! Like v-permission="['admin','editor']"`)
    }
  }
}
