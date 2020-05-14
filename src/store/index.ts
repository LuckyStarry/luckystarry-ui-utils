import Vue from 'vue'
import Vuex from 'vuex'
import { App, IAppState } from './modules/app'
import { ErrorLog, IErrorLogState } from './modules/error-log'
import { IPermissionState, Permission } from './modules/permission'
import { ISettingsState, Settings } from './modules/settings'
import { ITagsViewState, TagsView } from './modules/tags-view'
import { IUserState, User } from './modules/user'

Vue.use(Vuex)

export interface IRootState {
  app: IAppState
  user: IUserState
  tagsView: ITagsViewState
  errorLog: IErrorLogState
  permission: IPermissionState
  settings: ISettingsState
}

export { App }
export { ErrorLog }
export { Permission }
export { Settings }
export { TagsView }
export { User }
