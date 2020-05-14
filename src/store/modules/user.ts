import { RouteConfig } from 'vue-router'
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { Context } from '../../context'

export interface IUserState {
  token: string
  name: string
  avatar: string
  introduction: string
  roles: string[]
  email: string
}

@Module
export class User extends VuexModule implements IUserState {
  public constructor(application: Context) {
    super({})
    this.application = application
  }

  public token = ''
  public id = ''
  public name = ''
  public avatar = ''
  public introduction = ''
  public roles: string[] = []
  public email = ''
  public application: Context

  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token
  }

  @Mutation
  private SET_ID(id: string) {
    this.id = id
  }

  @Mutation
  private SET_NAME(name: string) {
    this.name = name
  }

  @Mutation
  private SET_AVATAR(avatar: string) {
    this.avatar = avatar
  }

  @Mutation
  private SET_INTRODUCTION(introduction: string) {
    this.introduction = introduction
  }

  @Mutation
  private SET_ROLES(roles: string[]) {
    this.roles = roles
  }

  @Mutation
  private SET_EMAIL(email: string) {
    this.email = email
  }

  @Action
  public async Callback(getToken: () => Promise<{ token: string }>) {
    let data = await getToken()
    this.application.token.set(data.token)
    this.SET_TOKEN(data.token)
  }

  @Action
  public ResetToken() {
    this.application.token.delete()
    this.SET_TOKEN('')
    this.SET_ROLES([])
  }

  @Action
  public async GetUserInfo() {
    if (this.token === '') {
      throw Error('GetUserInfo: token is undefined!')
    }
    let response = await this.application.apis.getProfile()
    if (!response) {
      throw Error('Verification failed, please Login again.')
    }
    let roles: string[] = []
    if (response.RoleIDs) {
      roles = [...response.RoleIDs]
    }
    if (!roles.length) {
      roles = ['visitor']
    }
    let id = response.UserID
    let avatar = response.UserAvatar
    let introduction = ''
    let email = ''
    // roles must be a non-empty array
    if (!roles || roles.length <= 0) {
      throw Error('GetUserInfo: roles must be a non-null array!')
    }
    this.SET_ROLES(roles)
    this.SET_ID(id)
    this.SET_NAME(name)
    this.SET_AVATAR(avatar)
    this.SET_INTRODUCTION(introduction)
    this.SET_EMAIL(email)
  }

  @Action
  public async ChangeRoles(role: string) {
    // Dynamically modify permissions
    const token = role + '-token'
    this.SET_TOKEN(token)
    this.application.token.set(token)
    await this.GetUserInfo()
    this.application.routes.reset()
    // Generate dynamic accessible routes based on roles
    await this.context.dispatch('premission/GenerateRoutes', this.roles, {
      root: true
    })
    // Add generated routes
    let dynamicRoutes: RouteConfig[] = this.context.rootState[
      'premission/dynamicRoutes'
    ]
    this.application.routes.add(...dynamicRoutes)
    // Reset visited views and cached views
    await this.context.dispatch('treeView/delAllViews')
  }

  @Action
  public async LogOut() {
    if (this.token === '') {
      throw Error('LogOut: token is undefined!')
    }
    // await api.oauth.logout()
    this.application.token.delete()
    this.application.routes.reset()

    // Reset visited views and cached views
    await this.context.dispatch('treeView/delAllViews')
    this.SET_TOKEN('')
    this.SET_ROLES([])
  }
}
