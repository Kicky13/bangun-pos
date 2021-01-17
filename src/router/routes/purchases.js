export default [
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
]
