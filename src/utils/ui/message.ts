export interface Message {
  info(message?: string)
  warning(message?: string)
  error(message?: string)
  success(message?: string)
}
