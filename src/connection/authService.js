import axios from '@axios'
import jwt from 'jsonwebtoken'
import authConfig from './authConfig'

export default class AuthService {
    token = ''

    registerToken = ''

    config = { ...authConfig }

    register(param) {
      console.log(param)
      return axios({
        method: 'post',
        url: this.config.registerEndpoint,
        headers: {
          token: this.registerToken,
          'content-type': 'application/json',
          accept: 'application/json',
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
      axios.defaults.headers.common.Authorization = token
    }

    getToken() {
      return localStorage.getItem(this.config.storageTokenName)
    }

    refreshToken() {
      this.token = localStorage.getItem(this.config.storageTokenName)
      axios.defaults.headers.common.Authorization = this.token
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
}
