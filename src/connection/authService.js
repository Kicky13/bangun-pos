import axios from '@axios'
import jwt from 'jsonwebtoken'
import authConfig from './authConfig'

export default class AuthService {
    token = ''

    registerToken = ''

    headerToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3FhLmFrc2VzdG9rby5pZC8iLCJhdWQiOiJodHRwczovL3Bvcy5ha3Nlc3Rva28uaWQiLCJzdWIiOiJ0b2tlbl9pbnRlZ3Jhc2lfYWtzZXN0b2tvX3Bvc19yZXRhaWwiLCJuYW1lIjoiQWtzZXNUb2tvLklEIiwiaWF0IjoxNjEyMzM4NDI5LCJkYXRhIjoie1widXNlcl9pZFwiOlwiMTQyMVwiLFwiY29tcGFueV9pZFwiOlwiMjI4MzhcIixcIm5hbWFfdG9rb1wiOlwiU2VtZW5cIixcInRlbHBfdG9rb1wiOlwiMjIyODMyMjMzOFwiLFwibG9rYXNpX3Rva29cIjpcIjIyMjgzMjIzMzhcIn0ifQ.eFPMdx-0xXmf4ElkPkiXr3qaiObgRcXuvk_doxKieVc'

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
