import http from './http'
import { ENDPOINTS } from './endpoints'
import type { LoginForm, LoginResponse } from '../types'

export function loginUser(data: LoginForm): Promise<{ data: LoginResponse }> {
  return http.post(ENDPOINTS.LOGIN, data)
}

// 默认导出
export default {
  loginUser,
}
