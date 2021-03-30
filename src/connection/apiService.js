import axios from '@axios'
import apiConfig from './apiConfig'

export default class ApiService {
    urlCnf = { ...apiConfig }

    constructor() {
      axios.defaults.headers.common = {
        'content-type': 'application/json',
        // 'content-type': 'multipart/form-data,application/x-www-form-urlencoded,application/json',
        // 'content-type': 'multipart/form-data',
        accept: 'application/json',
        // accept: 'application/json,*/*',
        token: localStorage.getItem(this.urlCnf.storageTokenName),
      }
      axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem(this.urlCnf.storageTokenName)}`
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

    getCategoryList() {
      return axios({
        method: 'post',
        url: this.urlCnf.category,
      })
    }

    getSubcategoryList(param) {
      return axios({
        method: 'post',
        url: this.urlCnf.subcategory,
        data: param,
      })
    }

    getBrandList() {
      return axios({
        method: 'post',
        url: this.urlCnf.brand,
      })
    }

    getTypeList() {
      return axios({
        method: 'post',
        url: this.urlCnf.type,
      })
    }

    getUomList() {
      return axios({
        method: 'post',
        url: this.urlCnf.uom,
      })
    }

    getProductSigList(param) {
      return axios({
        method: 'post',
        url: this.urlCnf.productSig,
        data: param,
      })
    }

    getProductTokoList(param) {
      return axios({
        method: 'post',
        url: this.urlCnf.productToko,
        data: param,
      })
    }

    getProductTokoListPage(param) {
      return axios({
        method: 'post',
        url: this.urlCnf.productTokoPage,
        data: param,
      })
    }

    storeProduct(param) {
      return axios({
        method: 'post',
        url: this.urlCnf.storeProduct,
        data: param,
      })
    }

    updateCustomer(param, formData) {
      return axios({
        method: 'post',
        url: `${this.urlCnf.customer}/${param}`,
        data: formData,
      })
    }
}
