import { Builder } from './builder'
import { Context } from './context'
import * as models from './models'
import * as store from './store'
import * as utils from './utils'
export { models }
export { utils }
export { Builder }
export { Context }
export { store }
export default { models, utils, store, Builder, Context }
declare global {
  interface Date {
    toSmartString(): string
  }
}

Date.prototype.toSmartString = function () {
  return utils.times.utils.toSmartString(this)
}
