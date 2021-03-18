import axios from '@axios'
import apiConfig from './apiConfig'

export default class ApiService {
    urlCnf = { ...apiConfig }

    token = ''

    constructor() {
      this.token = localStorage.getItem(this.urlCnf.storageTokenName)
    }

    getCustomer(param) {
      return axios({
        method: 'get',
        url: this.urlCnf.customerList,
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          token: this.token,
        },
        params: param,
      })
    }
}
