export default [
  {
    header: 'Master Data',
    icon: 'DatabaseIcon',
    resource: 'Master',
    action: 'read',
    children: [
      {
        title: 'Toko Bangunan',
        route: 'toko-master',
        icon: 'FileTextIcon',
        resource: 'Master',
        action: 'manage',
      },
      {
        title: 'Customer',
        route: 'customer-master',
        icon: 'UsersIcon',
        resource: 'Master',
        action: 'manage',
      },
      {
        title: 'Harga Produk',
        route: 'price-master',
        icon: 'DollarSignIcon',
        resource: 'Master',
        action: 'manage',
      },
    ],
  },
]
