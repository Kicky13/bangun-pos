export default [
  {
    header: 'Product',
    icon: 'ArchiveIcon',
    resource: 'Product',
    action: 'read',
    children: [
      {
        title: 'Category',
        route: 'category-product',
        icon: 'FileTextIcon',
        resource: 'Product',
        action: 'manage',
      },
      {
        title: 'Product List',
        route: 'list-product',
        icon: 'ServerIcon',
        resource: 'Product',
        action: 'manage',
      },
      {
        title: 'Add Product',
        route: 'add-product',
        icon: 'PlusCircleIcon',
        resource: 'Product',
        action: 'manage',
      },
      // {
      //   title: 'Stock Count',
      //   route: 'stock-product',
      //   icon: 'CopyIcon',
      // },
    ],
  },
]
