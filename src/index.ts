import { Builder } from './builder'
import { Context } from './context'
import * as models from './models'
import * as utils from './utils'
export { models }
export { utils }
export { Builder }
export { Context }
export default { models, utils, Builder, Context }
declare global {
  interface Date {
    toSmartString(): string
  }
}
