export default [
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
]
