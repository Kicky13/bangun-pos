export default [
  {
    icon: 'MenuIcon',
    resource: 'User',
    action: 'read',
    child: [
      {
        title: 'Sales',
        route: 'user-sale',
        icon: 'DollarSignIcon',
        resource: 'SalesUser',
        action: 'manage',
      },
      {
        title: 'Product',
        route: 'user-product',
        icon: 'CartIcon',
        resource: 'ProductUser',
        action: 'manage',
      },
      {
        title: 'Customer',
        route: 'user-customer',
        icon: 'UsersIcon',
        resource: 'CustomerUser',
        action: 'manage',
      },
    ],
  },
]
