export default [
  // Master
  {
    path: '/master/pricelist',
    name: 'price-master',
    component: () => import('@/views/master/price/List.vue'),
    meta: {
      pageTitle: 'Price List',
      resource: 'Master',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Master Data',
        },
        {
          text: 'Price List',
          active: true,
        },
      ],
    },
  },
  {
    path: '/master/toko',
    name: 'toko-master',
    component: () => import('@/views/master/toko/List.vue'),
    meta: {
      pageTitle: 'Toko Bangunan',
      resource: 'Master',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Master Data',
        },
        {
          text: 'Toko Bangunan',
          active: true,
        },
      ],
    },
  },
  {
    path: '/master/customer',
    name: 'customer-master',
    component: () => import('@/views/master/customer/List.vue'),
    meta: {
      pageTitle: 'Price List',
      resource: 'Master',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Master Data',
        },
        {
          text: 'Price List',
          active: true,
        },
      ],
    },
  },
  //   Product
  {
    path: '/product/category',
    name: 'category-product',
    component: () => import('@/views/products/category/Category.vue'),
    meta: {
      pageTitle: 'Category',
      resource: 'Product',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Product',
        },
        {
          text: 'Category',
          active: true,
        },
      ],
    },
  },
  {
    path: '/product',
    name: 'list-product',
    component: () => import('@/views/products/list/List.vue'),
    meta: {
      pageTitle: 'Product List',
      resource: 'Product',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Product',
          active: true,
        },
      ],
    },
  },
  {
    path: '/product/add',
    name: 'add-product',
    component: () => import('@/views/products/forms/Add.vue'),
    meta: {
      pageTitle: 'Add Product',
      resource: 'Product',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Product',
        },
        {
          text: 'Add',
          active: true,
        },
      ],
    },
  },
  {
    path: '/product/import',
    name: 'import-product',
    component: () => import('@/views/products/forms/Import.vue'),
    meta: {
      pageTitle: 'Import Product',
      resource: 'Product',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Product',
        },
        {
          text: 'Import',
          active: true,
        },
      ],
    },
  },
  {
    path: '/product/stock',
    name: 'stock-product',
    component: () => import('@/views/products/stock/Stock.vue'),
    meta: {
      pageTitle: 'Stock Count',
      resource: 'Product',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Product',
        },
        {
          text: 'Stock Count',
          active: true,
        },
      ],
    },
  },
  //   Purchases
  {
    path: '/purchase',
    name: 'list-purchase',
    component: () => import('@/views/purchases/list/List.vue'),
    meta: {
      pageTitle: 'Purchases',
      breadcrumb: [
        {
          text: 'Purchases',
          active: true,
        },
      ],
    },
  },
  {
    path: '/purchase/add',
    name: 'add-purchase',
    component: () => import('@/views/purchases/forms/Add.vue'),
    meta: {
      pageTitle: 'Add Purchase',
      breadcrumb: [
        {
          text: 'Purchases',
        },
        {
          text: 'Add',
          active: true,
        },
      ],
    },
  },
  {
    path: '/purchase/import',
    name: 'import-purchase',
    component: () => import('@/views/purchases/forms/Import.vue'),
    meta: {
      pageTitle: 'Import Purchase',
      breadcrumb: [
        {
          text: 'Purchases',
        },
        {
          text: 'Import',
          active: true,
        },
      ],
    },
  },
  //   Sales
  {
    path: '/sale',
    name: 'list-sale',
    component: () => import('@/views/sales/list/List.vue'),
    meta: {
      pageTitle: 'Sales',
      resource: 'Sales',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Sale',
          active: true,
        },
      ],
    },
  },
  {
    path: '/sale/report',
    name: 'report-sale',
    component: () => import('@/views/sales/reporting/Report.vue'),
    meta: {
      pageTitle: 'Report Sales',
      resource: 'Sales',
      action: 'manage',
      // breadcrumb: [
      //   {
      //     text: 'Reporting',
      //   },
      //   {
      //     text: 'Katalog Produk',
      //     active: true,
      //   },
      // ],
    },
  },
  {
    path: '/sale/pos',
    name: 'pointof-sale',
    component: () => import('@/views/sales/pos/Pos.vue'),
    meta: {
      // pageTitle: 'Point of Sale',
      resource: 'PointSale',
      action: 'manage',
      // layout: 'full',
      // breadcrumb: [
      //   {
      //     text: 'Sale',
      //   },
      //   {
      //     text: 'Point of Sale',
      //     active: true,
      //   },
      // ],
    },
  },
  {
    path: '/giftcard',
    name: 'giftcard-sale',
    component: () => import('@/views/sales/giftcard/Giftcard.vue'),
    meta: {
      pageTitle: 'GiftCard List',
      breadcrumb: [
        {
          text: 'GiftCard',
          active: true,
        },
      ],
    },
  },
  {
    path: '/coupon',
    name: 'coupon-sale',
    component: () => import('@/views/sales/coupon/Coupon.vue'),
    meta: {
      pageTitle: 'Coupon',
      breadcrumb: [
        {
          text: 'Coupon',
          active: true,
        },
      ],
    },
  },
]
