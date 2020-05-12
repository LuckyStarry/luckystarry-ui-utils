import * as models from './models'
import * as utils from './utils'
export { models }
export { utils }
export default { models, utils }
declare global {
  interface Date {
    toSmartString(): string
  }
}
