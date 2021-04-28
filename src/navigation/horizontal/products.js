export default [
  {
    header: 'Pengaturan Produk',
    icon: 'ArchiveIcon',
    resource: 'Product',
    action: 'read',
    children: [
      {
        title: 'Kategori',
        route: 'category-product',
        icon: 'FileTextIcon',
        resource: 'Product',
        action: 'manage',
      },
      {
        title: 'Merek',
        route: 'brand-product',
        icon: 'FileTextIcon',
        resource: 'Product',
        action: 'manage',
      },
      {
        title: 'Tipe',
        route: 'type-product',
        icon: 'FileTextIcon',
        resource: 'Product',
        action: 'manage',
      },
      {
        title: 'Satuan / UOM',
        route: 'uom-product',
        icon: 'FileTextIcon',
        resource: 'Product',
        action: 'manage',
      },
      {
        title: 'Produk Standard',
        route: 'list-std-product',
        icon: 'FileTextIcon',
        resource: 'Product',
        action: 'manage',
      },
      {
        title: 'Produk User',
        route: 'list-product',
        icon: 'FileTextIcon',
        resource: 'Product',
        action: 'manage',
      },
      // {
      //   title: 'Add Product',
      //   route: 'add-product',
      //   icon: 'PlusCircleIcon',
      //   resource: 'Product',
      //   action: 'manage',
      // },
      // {
      //   title: 'Stock Count',
      //   route: 'stock-product',
      //   icon: 'CopyIcon',
      // },
    ],
  },
]
