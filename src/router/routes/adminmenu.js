export default [
  // Master
  {
    path: '/master/pricelist',
    name: 'price-master',
    component: () => import('@/views/master/price/List.vue'),
    meta: {
      pageTitle: 'Harga Produk',
      resource: 'Master',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Master Data',
        },
        {
          text: 'Harga Produk',
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
      pageTitle: 'Customer Toko',
      resource: 'Master',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Master Data',
        },
        {
          text: 'Customer Toko',
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
      pageTitle: 'Ketegori',
      resource: 'ProductSettings',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Pengaturan Produk',
        },
        {
          text: 'Ketegori',
          active: true,
        },
      ],
    },
  },
  {
    path: '/product/subcategory',
    name: 'subcategory-product',
    component: () => import('@/views/products/subcategory/Subcategory.vue'),
    meta: {
      pageTitle: 'Sub Ketegori',
      resource: 'ProductSettings',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Pengaturan Produk',
        },
        {
          text: 'Sub Ketegori',
          active: true,
        },
      ],
    },
  },
  {
    path: '/product/merk',
    name: 'brand-product',
    component: () => import('@/views/products/brand/Brand.vue'),
    meta: {
      pageTitle: 'Merek',
      resource: 'ProductSettings',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Pengaturan Produk',
        },
        {
          text: 'Merek',
          active: true,
        },
      ],
    },
  },
  {
    path: '/product/type',
    name: 'type-product',
    component: () => import('@/views/products/type/Type.vue'),
    meta: {
      pageTitle: 'Tipe Produk',
      resource: 'ProductSettings',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Pengaturan Produk',
        },
        {
          text: 'Tipe Produk',
          active: true,
        },
      ],
    },
  },
  {
    path: '/product/uom',
    name: 'uom-product',
    component: () => import('@/views/products/uom/Uom.vue'),
    meta: {
      pageTitle: 'Satuan / UOM',
      resource: 'ProductSettings',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Pengaturan Produk',
        },
        {
          text: 'Satuan / UOM',
          active: true,
        },
      ],
    },
  },
  {
    path: '/product',
    name: 'list-std-product',
    component: () => import('@/views/products/liststd/List.vue'),
    meta: {
      pageTitle: 'Produk Standard',
      resource: 'ProductSettings',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Pengaturan Produk',
        },
        {
          text: 'Produk Standard',
          active: true,
        },
      ],
    },
  },
  {
    path: '/product/user',
    name: 'list-product',
    component: () => import('@/views/products/list/List.vue'),
    meta: {
      pageTitle: 'Produk User',
      resource: 'Product',
      action: 'manage',
      breadcrumb: [
        {
          text: 'ProductSettings',
        },
        {
          text: 'Produk User',
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
      pageTitle: 'Tambah Produk',
      resource: 'ProductSettings',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Pengaturan Produk',
        },
        {
          text: 'Tambah Produk',
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
      pageTitle: 'Upload Produk',
      resource: 'ProductSettings',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Pengaturan Produk',
        },
        {
          text: 'Upload Produk',
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
      pageTitle: 'Data Transaksi',
      resource: 'Sales',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Transaksi',
        },
        {
          text: 'Data Transaksi',
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
]
