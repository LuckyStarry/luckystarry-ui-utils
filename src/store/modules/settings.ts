import { Action, Mutation, VuexModule, Module } from 'vuex-module-decorators'

export interface ISettingsState {
  fixedHeader: boolean
  showSettings: boolean
  showTagsView: boolean
  showSidebarLogo: boolean
  sidebarTextTheme: boolean
}

@Module
export class Settings extends VuexModule implements ISettingsState {
  public fixedHeader = false
  public showSettings = true
  public showTagsView = true
  public showSidebarLogo = true
  public sidebarTextTheme = true

  @Mutation
  private CHANGE_SETTING(payload: { key: string; value: any }) {
    const { key, value } = payload
    if (Object.prototype.hasOwnProperty.call(this, key)) {
      let target = this as any
      target[key] = value
    }
  }

  @Action
  public ChangeSetting(payload: { key: string; value: any }) {
    this.CHANGE_SETTING(payload)
  }
}
