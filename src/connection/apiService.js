import axios from '@axios'
import apiConfig from './apiConfig'

export default class ApiService {
  urlCnf = { ...apiConfig };

  constructor() {
    axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem(
      this.urlCnf.storageTokenName,
    )}`
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
      method: 'put',
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

  getAntrian(uuid) {
    return axios({
      method: 'get',
      url: this.urlCnf.antrianData + uuid,
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

  deleteQueue(param) {
    return axios.delete(`${this.urlCnf.addAntrianData}/${param}`)
  }

  getChartSalesToko(param) {
    return axios({
      method: 'post',
      url: this.urlCnf.graphTokoBangunan,
      data: param,
    })
  }

  getChartSalesProduct(param) {
    return axios({
      method: 'post',
      url: this.urlCnf.graphProductSales,
      data: param,
    })
  }

  getChartBestSeller() {
    return axios({
      method: 'post',
      url: this.urlCnf.graphBestSeller,
    })
  }

  getChartGrossProduct() {
    return axios({
      method: 'post',
      url: this.urlCnf.graphProductGrossing,
    })
  }

  // Admin View
  getCustomerList(param) {
    return axios({
      method: 'get',
      url: this.urlCnf.getCustomerList,
      params: param,
    })
  }

  getTokoList(param) {
    return axios({
      method: 'get',
      url: this.urlCnf.getTokoList,
      params: param,
    })
  }

  getAdminCategory(param) {
    return axios({
      method: 'post',
      url: this.urlCnf.getAdminCategory,
      params: param,
    })
  }

  addAdminCategory(param) {
    return axios({
      method: 'post',
      url: this.urlCnf.addAdminCategory,
      data: param,
    })
  }

  updateAdminCategory(id, param) {
    return axios({
      method: 'post',
      url: this.urlCnf.updateAdminCategory + id,
      data: param,
    })
  }

  deleteAdminCategory(id) {
    return axios({
      method: 'delete',
      url: this.urlCnf.deleteAdminCategory + id,
    })
  }

  getAdminPriceList(param) {
    return axios({
      method: 'post',
      url: this.urlCnf.getAdminPriceList,
      data: param,
    })
  }

  getAdminSalesList(param) {
    return axios({
      method: 'get',
      url: this.urlCnf.getAdminSalesList,
      params: param,
    })
  }

  getAdminTokoList(param) {
    return axios({
      method: 'get',
      url: this.urlCnf.getAdminTokoList,
      params: param,
    })
  }

  getAdminBrand(param) {
    return axios({
      method: 'post',
      url: this.urlCnf.getAdminBrand,
      params: param,
    })
  }

  addAdminBrand(param) {
    return axios({
      method: 'post',
      url: this.urlCnf.addAdminBrand,
      data: param,
    })
  }

  updateAdminBrand(id, param) {
    return axios({
      method: 'post',
      url: this.urlCnf.updateAdminBrand + id,
      data: param,
    })
  }

  deleteAdminBrand(id) {
    return axios({
      method: 'delete',
      url: this.urlCnf.deleteAdminBrand + id,
    })
  }

  getAdminType(param) {
    return axios({
      method: 'post',
      url: this.urlCnf.getAdminType,
      params: param,
    })
  }

  addAdminType(param) {
    return axios({
      method: 'post',
      url: this.urlCnf.addAdminType,
      data: param,
    })
  }

  updateAdminType(id, param) {
    return axios({
      method: 'post',
      url: this.urlCnf.updateAdminType + id,
      data: param,
    })
  }

  deleteAdminType(id) {
    return axios({
      method: 'delete',
      url: this.urlCnf.deleteAdminType + id,
    })
  }

  getAdminUom(param) {
    return axios({
      method: 'post',
      url: this.urlCnf.getAdminUom,
      params: param,
    })
  }

  addAdminUom(param) {
    return axios({
      method: 'post',
      url: this.urlCnf.addAdminUom,
      data: param,
    })
  }

  updateAdminUom(id, param) {
    return axios({
      method: 'post',
      url: this.urlCnf.updateAdminUom + id,
      data: param,
    })
  }

  deleteAdminUom(id) {
    return axios({
      method: 'delete',
      url: this.urlCnf.deleteAdminUom + id,
    })
  }

  getAdminSubCategory(param) {
    return axios({
      method: 'post',
      url: this.urlCnf.getAdminSubCategory,
      params: param,
    })
  }

  addAdminSubCategory(param) {
    return axios({
      method: 'post',
      url: this.urlCnf.addAdminSubCategory,
      data: param,
    })
  }

  updateAdminSubCategory(id, param) {
    return axios({
      method: 'post',
      url: this.urlCnf.updateAdminSubCategory + id,
      data: param,
    })
  }

  deleteAdminSubCategory(id) {
    return axios({
      method: 'delete',
      url: this.urlCnf.deleteAdminSubCategory + id,
    })
  }

  getChartFavouriteProduct() {
    return axios({
      method: 'post',
      url: this.urlCnf.graphFavouriteProduct,
    })
  }

  getCategoryListAdmin() {
    return axios({
      method: 'post',
      url: this.urlCnf.getCategoryAdmin,
    })
  }

  getSubCategoryListAdmin(param) {
    return axios({
      method: 'post',
      url: this.urlCnf.getSubCategoryListAdmin,
      data: param,
    })
  }

  getBrandListAdmin() {
    return axios({
      method: 'post',
      url: this.urlCnf.getBrandListAdmin,
    })
  }

  getTypeListAdmin() {
    return axios({
      method: 'post',
      url: this.urlCnf.getTypeListAdmin,
    })
  }

  getUomListAdmin() {
    return axios({
      method: 'post',
      url: this.urlCnf.getUomListAdmin,
    })
  }

  getAdminProductSIGList(param) {
    return axios({
      method: 'post',
      url: this.urlCnf.getAdminProductSIGList,
      data: param,
    })
  }

  getAdminProductNonSIGPriceList(param) {
    return axios({
      method: 'post',
      url: this.urlCnf.getAdminProductNonSIGPriceList,
      data: param,
    })
  }

  saveProductAdmin(param) {
    return axios({
      method: 'post',
      url: this.urlCnf.saveProductAdmin,
      headers: {
        'Content-Type': 'multipart/form-data',
        accept: 'multipart/form-data',
      },
      data: param,
    })
  }

  deleteProductAdmin(uuid) {
    return axios({
      method: 'delete',
      url: this.urlCnf.deleteProductAdmin + uuid,
    })
  }
}
