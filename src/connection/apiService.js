import axios from '@axios'
import apiConfig from './apiConfig'

export default class ApiService {
    urlCnf = { ...apiConfig }

    constructor() {
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

    deleteCustomer(param) {
      return axios.delete(`${this.urlCnf.customer}/${param}`)
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
        headers: {
          'Content-Type': 'multipart/form-data',
          accept: 'multipart/form-data',
        },
        data: param,
      })
    }

    updateProduct(param) {
      return axios({
        method: 'post',
        url: this.urlCnf.updateProduct,
        headers: {
          'Content-Type': 'multipart/form-data',
          accept: 'multipart/form-data',
        },
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

    getSales(param) {
      return axios({
        method: 'get',
        url: this.urlCnf.sales,
        params: param,
      })
    }

    getGraphData(param) {
      return axios({
        method: 'post',
        url: this.urlCnf.graphData,
        params: param,
      })
    }

    getGoalOverviewData() {
      return axios({
        method: 'post',
        url: this.urlCnf.getGoalOverviewData,
        // params: param,
      })
    }

    getTransactionsData(param) {
      return axios({
        method: 'post',
        url: this.urlCnf.getTransactionsData,
        params: param,
      })
    }
}
