export default [
  {
    path: '/mysale',
    name: 'user-sale',
    component: () => import('@/views/user/sales/List.vue'),
    meta: {
      // pageTitle: 'Penjualan',
      resource: 'SalesUser',
      action: 'manage',
      redTitle: 'Data Penjualan',
      redSubs: 'Catatan Penjualan Barang-Barang di Toko Kamu.',
      // breadcrumb: [
      //   {
      //     text: 'Sales',
      //     active: true,
      //   },
      // ],
    },
  },
  {
    path: '/myproduct',
    name: 'user-product',
    component: () => import('@/views/user/products/KatalogProduk.vue'),
    meta: {
      // pageTitle: 'Produk',
      resource: 'ProductUser',
      action: 'manage',
      redTitle: 'Product',
      redSubs: 'Berikut list produk yang kamu jual',
      // breadcrumb: [
      //   {
      //     text: 'Produk',
      //     active: true,
      //   },
      // ],
    },
  },
  {
    path: '/myproduct/add',
    name: 'user-product-add',
    component: () => import('@/views/user/products/forms/Add.vue'),
    meta: {
      // pageTitle: 'Tambah Produk',
      resource: 'ProductUser',
      action: 'manage',
      redTitle: 'Tambah Produk',
      redSubs: 'Tambahkan Produk Baru Yang Akan Kamu Jual.',
      // breadcrumb: [
      //   {
      //     text: 'Produk',
      //   },
      //   {
      //     text: 'Tambah Produk',
      //     active: true,
      //   },
      // ],
    },
  },
  {
    path: '/myproduct/edit',
    name: 'user-product-edit',
    component: () => import('@/views/user/products/forms/Edit.vue'),
    meta: {
      // pageTitle: 'Tambah Produk',
      resource: 'ProductUser',
      action: 'manage',
      redTitle: 'Edit Produk',
      redSubs: 'Ubah data Produk yang sudah ada',
      // breadcrumb: [
      //   {
      //     text: 'Produk',
      //   },
      //   {
      //     text: 'Tambah Produk',
      //     active: true,
      //   },
      // ],
    },
  },
  {
    path: '/mycustomer',
    name: 'user-customer',
    component: () => import('@/views/user/customer/List.vue'),
    meta: {
      // pageTitle: 'Customer',
      resource: 'CustomerUser',
      action: 'manage',
      redTitle: 'Customer',
      redSubs: 'List Customer yang berlangganan di tokomu',
      // breadcrumb: [
      //   {
      //     text: 'Customer',
      //     active: true,
      //   },
      // ],
    },
  },
  {
    path: '/mydashboard',
    name: 'user-dashboard',
    component: () => import('@/views/user/dashboard/List.vue'),
    meta: {
      // pageTitle: 'Customer',
      resource: 'DasboardUser',
      action: 'manage',
      redTitle: 'Selamat Datang, di POS Dashboard',
      redSubs: 'Monitoring Transaksi Penjualan di Toko Kamu.',
      // breadcrumb: [
      //   {
      //     text: 'Customer',
      //     active: true,
      //   },
      // ],
    },
  },
]
