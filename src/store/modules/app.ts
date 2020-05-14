import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { Context } from '../../context'

export enum DeviceType {
  Mobile,
  Desktop
}

export interface IAppState {
  device: DeviceType
  sidebar: {
    opened: boolean
    withoutAnimation: boolean
  }
  size: string
}

@Module({ namespaced: true })
export class App extends VuexModule implements IAppState {
  public sidebar = {
    opened: true,
    withoutAnimation: false
  }
  public device = DeviceType.Desktop
  public size = 'mini'
  public application!: Context

  public get Sidebar() {
    return this.sidebar
  }

  public get Size(): string {
    return this.size
  }

  public get Device(): DeviceType {
    return this.device
  }

  @Mutation
  private TOGGLE_SIDEBAR(withoutAnimation: boolean) {
    this.sidebar.opened = !this.sidebar.opened
    this.sidebar.withoutAnimation = withoutAnimation
    if (this.sidebar.opened) {
      this.application.system.setSidebarStatus('opened')
    } else {
      this.application.system.setSidebarStatus('closed')
    }
  }

  @Mutation
  private CLOSE_SIDEBAR(withoutAnimation: boolean) {
    this.sidebar.opened = false
    this.sidebar.withoutAnimation = withoutAnimation
    this.application.system.setSidebarStatus('closed')
  }

  @Mutation
  private TOGGLE_DEVICE(device: DeviceType) {
    this.device = device
  }

  @Mutation
  private SET_SIZE(size: string) {
    this.size = size
    this.application.system.setSize(this.size)
  }

  @Action
  public ToggleSideBar(withoutAnimation: boolean) {
    this.TOGGLE_SIDEBAR(withoutAnimation)
  }

  @Action
  public CloseSideBar(withoutAnimation: boolean) {
    this.CLOSE_SIDEBAR(withoutAnimation)
  }

  @Action
  public ToggleDevice(device: DeviceType) {
    this.TOGGLE_DEVICE(device)
  }

  @Action
  public SetSize(size: string) {
    this.SET_SIZE(size)
  }
}
