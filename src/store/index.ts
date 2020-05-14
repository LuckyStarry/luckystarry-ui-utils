import Vue from 'vue'
import Vuex from 'vuex'
import { AppModule, IAppState } from './modules/app'
import { ErrorLogModule, IErrorLogState } from './modules/error-log'
import { IPermissionState, PermissionModule } from './modules/permission'
import { ISettingsState, SettingsModule } from './modules/settings'
import { ITagsViewState, TagsViewModule } from './modules/tags-view'
import { IUserState, UserModule } from './modules/user'

Vue.use(Vuex)

export interface IRootState {
  app: IAppState
  user: IUserState
  tagsView: ITagsViewState
  errorLog: IErrorLogState
  permission: IPermissionState
  settings: ISettingsState
}

export { AppModule }
export { ErrorLogModule }
export { PermissionModule }
export { SettingsModule }
export { TagsViewModule }
export { UserModule }
