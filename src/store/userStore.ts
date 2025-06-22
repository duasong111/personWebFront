import { defineStore } from 'pinia'
export const useUserStore = defineStore('user', {
  state: () => ({
    username: '',
    password: '',
  }),
  actions: {
    setUserInfo(username: string, password: string) {
      this.username = username
      this.password = password
    },
    clearUserInfo() {
      this.username = ''
      this.password = ''
    },
  },
})
