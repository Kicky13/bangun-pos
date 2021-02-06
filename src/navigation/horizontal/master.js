export default [
  {
    header: 'Master Bangunan',
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
        icon: 'ServerIcon',
        resource: 'Master',
        action: 'manage',
      },
      {
        title: 'Price List',
        route: 'price-master',
        icon: 'PlusCircleIcon',
        resource: 'Master',
        action: 'manage',
      },
    ],
  },
]
