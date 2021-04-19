import axios from '@axios'
import jwt from 'jsonwebtoken'
import authConfig from './authConfig'

export default class AuthService {
    token = ''

    registerToken = ''

    headerToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvcG9zcmV0YWlsLmlkXC8iLCJhdWQiOiJodHRwczpcL1wvcG9zLnBvc3JldGFpbC5pZFwvIiwic3ViIjoidG9rZW5fdW50dWtfZGlhcmFoa2FuX2tlX2hhbGFtYW5fZGFzaGJvYXJkX3Rva28iLCJuYW1lIjoiUG9zUmV0YWlsIiwiaWF0IjoxNjE0NzQ5MjEwLCJkYXRhIjp7InRva28iOnsiaWRfdG9rbyI6MTcsImtvZGVfdG9rbyI6IjIwMjEwMzAzLTAwMDAwMSIsIm5hbWFfdG9rbyI6InRlc3RzYWRhIiwidGVscF90b2tvIjoiMTEzMTMxIiwibmFtYV9wZW1pbGlrIjoidGVzdCIsInRlbHBfcGVtaWxpayI6IjEyMzQ1NiIsImFsYW1hdF90b2tvIjpudWxsLCJub19pZGVudGl0YXMiOiIxMjM0NTY2Nzc4ODg4IiwiYWxhbWF0X3BlbWlsaWsiOiJ0ZXN0In0sInJvbGUiOiJ1c2VyIn19.Sw4mr2YyFkKnrw4SGANB-7YFpMEj0a_GjPSuhJuwkRM'

    config = { ...authConfig }

    register(param) {
      console.log(param)
      return axios({
        method: 'post',
        url: this.config.registerEndpoint,
        headers: {
          token: this.registerToken,
          'Content-Type': 'multipart/form-data',
          accept: 'multipart/form-data',
        },
        data: param,
      })
    }

    login(param) {
      return axios({
        method: 'post',
        url: this.config.loginEndpoint,
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
        },
        data: param,
      })
    }

    setRegisterToken(token) {
      this.registerToken = token
    }

    setToken(token) {
      this.token = token
      localStorage.setItem(this.config.storageTokenName, token)
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
    }

    getToken() {
      return localStorage.getItem(this.config.storageTokenName)
    }

    refreshToken() {
      this.token = localStorage.getItem(this.config.storageTokenName)
      axios.defaults.headers.common.token = this.token
    }

    getAppKey() {
      return this.config.appKey
    }

    getVerifyToken(token) {
      return jwt.verify(token, this.config.appKey)
    }

    getDataToken(token) {
      const responseData = jwt.verify(token, this.config.appKey)
      const { data } = responseData
      return data
    }

    getAbility(role) {
      if (role === 'user') {
        return this.config.userAbility
      }
      return this.config.adminAbility
    }

    getHeaderToken() {
      return this.headerToken
    }
}
