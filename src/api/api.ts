// src/api/api.ts
import axios from 'axios'

interface LoginForm {
  user: string
  pwd: string
}

interface LoginResponse {
  message: string
  [key: string]: any
}

export function loginUser(data: LoginForm): Promise<{ data: LoginResponse }> {
  console.log('打印传输来的值', data)
  return axios.post('http://127.0.0.1:5000/login', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

// 添加默认导出
export default {
  loginUser,
}
