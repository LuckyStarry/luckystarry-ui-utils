import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'

interface IErrorLog {
  err: Error
  vm: any
  info: string
  url: string
}

export interface IErrorLogState {
  logs: IErrorLog[]
}

@Module
export class ErrorLog extends VuexModule implements IErrorLogState {
  public logs: IErrorLog[] = []

  @Mutation
  private ADD_ERROR_LOG(log: IErrorLog) {
    this.logs.push(log)
  }

  @Mutation
  private CLEAR_ERROR_LOG() {
    this.logs.splice(0)
  }

  @Action
  public AddErrorLog(log: IErrorLog) {
    this.ADD_ERROR_LOG(log)
  }

  @Action
  public ClearErrorLog() {
    this.CLEAR_ERROR_LOG()
  }
}
