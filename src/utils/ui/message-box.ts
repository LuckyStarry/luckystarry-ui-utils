export interface MessageBox {
  confirm(
    message: string,
    title?: string,
    option?: {
      confirmButtonText?: string
      cancelButtonText?: string
      type?: string
    }
  ): Promise<any>
  alert(
    message: string,
    title?: string,
    option?: {
      confirmButtonText?: string
      cancelButtonText?: string
      type?: string
    }
  ): Promise<any>
}
