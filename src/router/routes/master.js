export default [
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
]
