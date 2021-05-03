export default {
  // AksesToko Link
  AksesToko: 'https://qa.aksestoko.id/home',

  // Token
  storageTokenName: 'accesstoken',

  // Sales
  sales: 'user/listtransaction',

  // Customer
  customer: 'user/customer',

  // Cashier
  cashier: 'user/cashier',

  // Transaction
  kodeTransaction: 'user/transaction/generatecode',
  payTransaction: 'user/transaction/pay',
  detailTransaction: 'user/transaction/',

  // Antrian
  antrianData: 'user/transaction/load/',
  addAntrianData: 'user/transaction/queue',
  listAntrian: 'user/transaction/queue/list',
  loadAntrian: 'user/transaction/load/',

  // List
  category: 'category',
  subcategory: 'subcategory',
  brand: 'brand',
  type: 'type',
  uom: 'uom',
  productSig: 'product',
  productToko: 'product/listProduct',
  productTokoPage: 'product/productToko',

  // Store & Update Produk Toko
  storeProduct: 'product/store',
  updateProduct: 'product/update',

  // Dashboard
  graphData: 'dashboard',
  getGoalOverviewData: 'dashboard/sales',
  getTransactionsData: 'dashboard/product',
  graphTokoBangunan: 'admin/dashboard/chartSalesToko',
  graphProductSales: 'admin/dashboard/chartSalesProduct',
  graphBestSeller: 'admin/dashboard/chartSalesProductQty',
  graphProductGrossing: 'admin/dashboard/chartGrossProduct',
  graphFavouriteProduct: 'admin/dashboard/chartBrandProduct',

  // Debt
  payDebt: 'user/debt',

  // History
  transactHistory: 'history',
  logTransaction: 'user/historypayment',

  // Profile
  getProfile: 'toko/show',
  updateProfile: 'toko/update',
  deleteCashier: 'user/cashier/',

  // ===============================================================
  // Admin View :
  // ===============================================================
  // Master Data :
  getCustomerList: 'admin/customer',
  getTokoList: 'admin/tokobangunan',
  getCategoryAdmin: 'admin/category/listCategory',
}
