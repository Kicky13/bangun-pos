export default [
  {
    path: '/mysale',
    name: 'user-sale',
    component: () => import('@/views/user/sales/List.vue'),
    meta: {
      // pageTitle: 'Penjualan',
      resource: 'SalesUser',
      action: 'manage',
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
    component: () => import('@/views/user/products/List.vue'),
    meta: {
      // pageTitle: 'Produk',
      resource: 'ProductUser',
      action: 'manage',
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
      // breadcrumb: [
      //   {
      //     text: 'Customer',
      //     active: true,
      //   },
      // ],
    },
  },
]
