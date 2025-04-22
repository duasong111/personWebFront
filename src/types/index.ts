// 定义TS的数据的类型
export interface LoginForm {
  username: string
  password: string
}

export interface LoginResponse {
  message: string
  [key: string]: any
}
