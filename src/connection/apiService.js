import axios from '@axios'
import apiConfig from './apiConfig'

export default class ApiService {
    urlCnf = { ...apiConfig }

    constructor() {
      axios.defaults.headers.common = {
        'content-type': 'application/json',
        accept: 'application/json',
        token: localStorage.getItem(this.urlCnf.storageTokenName),
      }
    }

    getCustomer(param) {
      return axios({
        method: 'get',
        url: this.urlCnf.customer,
        params: param,
      })
    }

    addCustomer(param) {
      return axios({
        method: 'post',
        url: this.urlCnf.customer,
        data: param,
      })
    }
}
