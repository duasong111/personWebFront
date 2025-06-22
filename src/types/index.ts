// 定义TS的数据的类型
export interface LoginForm {
  username: string
  password: string
}

export interface LoginResponse {
  message: string
  // 由于不清楚具体类型，暂时使用 unknown 代替 any，unknown 更安全
  [key: string]: unknown
}
