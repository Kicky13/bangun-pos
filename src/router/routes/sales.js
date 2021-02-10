export default [
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
    component: () => import('@/views/sales/reporting/KatalogProduk.vue'),
    meta: {
      pageTitle: 'Katalog Produk',
      breadcrumb: [
        {
          text: 'Reporting',
        },
        {
          text: 'Katalog Produk',
          active: true,
        },
      ],
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
