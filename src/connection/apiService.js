import axios from '@axios'
import apiConfig from './apiConfig'

export default class ApiService {
    urlCnf = { ...apiConfig }

    constructor() {
      axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem(this.urlCnf.storageTokenName)}`
    }

    toAksesToko() {
      window.location.href = this.urlCnf.AksesToko
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

    getCashier(param) {
      return axios({
        method: 'get',
        url: this.urlCnf.cashier,
        params: param,
      })
    }

    getKodeTransaction() {
      return axios({
        method: 'get',
        url: this.urlCnf.kodeTransaction,
      })
    }

    updatePayTransaction(param) {
      return axios({
        method: 'post',
        url: this.urlCnf.payTransaction,
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

    payDebt(param) {
      return axios({
        method: 'post',
        url: this.urlCnf.payDebt,
        data: param,
      })
    }

    historyList(param) {
      return axios({
        method: 'post',
        url: this.urlCnf.transactHistory,
        data: param,
      })
    }

    getDetailTransaction(uuid) {
      return axios({
        method: 'get',
        url: this.urlCnf.detailTransaction + uuid,
        // data: param,
      })
    }

    getLogTransaction(param) {
      // console.log(uuid)
      return axios({
        method: 'get',
        url: this.urlCnf.logTransaction,
        params: param,
        // data: param,
      })
    }

    addAntrian(param) {
      return axios({
        method: 'post',
        url: this.urlCnf.addAntrianData,
        data: param,
      })
    }

    getListAntrian() {
      return axios({
        method: 'get',
        url: this.urlCnf.listAntrian,
      })
    }

    getLoadAntrian(transaction) {
      return axios({
        method: 'get',
        url: this.urlCnf.loadAntrian + transaction,
      })
    }

    getProfileUser() {
      return axios({
        method: 'post',
        url: this.urlCnf.getProfile,
      })
    }

    updateProfileUser(param) {
      return axios({
        method: 'post',
        url: this.urlCnf.updateProfile,
        data: param,
      })
    }

    deleteCashier(uuid) {
      return axios({
        method: 'delete',
        url: this.urlCnf.deleteCashier + uuid,
      })
    }
}
