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
      goBackButton: true,
      // breadcrumb: [
      //   {
      //     text: 'Sales',
      //     active: true,
      //   },
      // ],
    },
  },
  {
    path: '/mysale/detail',
    name: 'detail-user-sale',
    component: () => import('@/views/user/sales/detail/DetailSale.vue'),
    meta: {
      // pageTitle: 'Penjualan',
      resource: 'SalesUser',
      action: 'manage',
      redTitle: 'Detail Data Penjualan',
      redSubs: 'Detail Data Penjualan di Toko Kamu.',
      // breadcrumb: [
      //   {
      //     text: 'Sales',
      //     active: true,
      //   },
      // ],
    },
  },
  {
    path: '/mysale/print',
    name: 'user-sale-print',
    component: () => import('@/views/user/sales/Print.vue'),
    props: true,
    meta: {
      // pageTitle: 'Penjualan',
      resource: 'SalesUser',
      action: 'manage',
      redTitle: 'Data Penjualan',
      redSubs: 'Catatan Penjualan Barang-Barang di Toko Kamu.',
      goBackButton: true,
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
      redTitle: 'Katalog Produk',
      redSubs: 'Berikut list produk yang kamu jual',
      goBackButton: true,
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
    props: true,
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
      redTitle: 'Data Customer',
      redSubs: 'Daftarkan Semua Pelanggan Tokomu untuk Pencatatan Buku KAS Lebih Mudah.',
      // breadcrumb: [
      //   {
      //     text: 'Customer',
      //     active: true,
      //   },
      // ],
    },
  },
  {
    path: '/mycustomer/print',
    name: 'user-customer-print',
    component: () => import('@/views/user/customer/Print.vue'),
    props: true,
    meta: {
      // pageTitle: 'Customer',
      resource: 'CustomerUser',
      action: 'manage',
      redTitle: 'Data Customer',
      redSubs: 'Daftarkan Semua Pelanggan Tokomu untuk Pencatatan Buku KAS Lebih Mudah.',
      // breadcrumb: [
      //   {
      //     text: 'Customer',
      //     active: true,
      //   },
      // ],
    },
  },
  {
    path: '/myprofile',
    name: 'user-profile',
    component: () => import('@/views/pages/authentication/Profile.vue'),
    meta: {
      // pageTitle: 'Customer',
      resource: 'CustomerUser',
      action: 'manage',
      redTitle: 'Profile Toko Kamu',
      redSubs: 'Lengkapi Profile Tokomu Untuk Melengkapi Data Transaksi',
      goBackButton: true,
      // breadcrumb: [
      //   {
      //     text: 'Customer',
      //     active: true,
      //   },
      // ],
    },
  },
  {
    path: '/mycustomer/history/',
    name: 'user-customer-list-trans',
    component: () => import('@/views/user/customer/forms/ListBayar.vue'),
    meta: {
      // pageTitle: 'Customer',
      resource: 'CustomerUser',
      action: 'manage',
      redTitle: 'Data Transaksi',
      redSubs: 'Catatan transaksi yang pernah dilakukan dengan customer.',
      // breadcrumb: [
      //   {
      //     text: 'Customer',
      //     active: true,
      //   },
      // ],
    },
  },
  {
    path: '/history/transaksi/:id',
    name: 'customer-history-trans',
    component: () => import('@/views/user/customer/forms/ListBayar.vue'),
    meta: {
      // pageTitle: 'Penjualan',
      resource: 'CustomerUser',
      action: 'manage',
      redTitle: 'Detail Data Transaksi',
      redSubs: 'Detail Data Transaksi yang pernah dilakukan oleh customer.',
      // breadcrumb: [
      //   {
      //     text: 'Sales',
      //     active: true,
      //   },
      // ],
    },
  },
  {
    path: '/history/transaksi/print/',
    name: 'customer-history-trans-print',
    component: () => import('@/views/user/customer/forms/Print.vue'),
    props: true,
    meta: {
      // pageTitle: 'Penjualan',
      resource: 'CustomerUser',
      action: 'manage',
      redTitle: 'Detail Data Transaksi',
      redSubs: 'Detail Data Transaksi yang pernah dilakukan oleh customer.',
      // breadcrumb: [
      //   {
      //     text: 'Sales',
      //     active: true,
      //   },
      // ],
    },
  },
  {
    path: '/mycustomer/transaksi/:id',
    name: 'user-customer-list-trans-detail',
    component: () => import('@/views/user/customer/forms/DetailTrans.vue'),
    meta: {
      // pageTitle: 'Penjualan',
      resource: 'CustomerUser',
      action: 'manage',
      redTitle: 'Detail Data Transaksi',
      redSubs: 'Detail Data Transaksi yang pernah dilakukan oleh customer.',
      // breadcrumb: [
      //   {
      //     text: 'Sales',
      //     active: true,
      //   },
      // ],
    },
  },
  {
    path: '/mysale/transaksi/:id',
    name: 'user-trans-detail',
    component: () => import('@/views/user/sales/detail/DetailTrans.vue'),
    meta: {
      // pageTitle: 'Penjualan',
      resource: 'CustomerUser',
      action: 'manage',
      redTitle: 'Detail Data Transaksi',
      redSubs: 'Detail Data Transaksi yang pernah dilakukan oleh customer.',
      // breadcrumb: [
      //   {
      //     text: 'Sales',
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
