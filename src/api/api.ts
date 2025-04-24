// 此处为定义的接口部分
import axios from 'axios'
import type { LoginForm, LoginResponse } from '../types'

export function loginUser(data: LoginForm): Promise<{ data: LoginResponse }> {
  return axios.post('http://127.0.0.1:5000', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
// 添加默认导出
export default {
  loginUser,
}
