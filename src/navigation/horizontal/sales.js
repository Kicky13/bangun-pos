export default [
  {
    header: 'Sales',
    icon: 'DollarSignIcon',
    resource: 'Sales',
    action: 'read',
    children: [
      {
        title: 'Sales List',
        route: 'list-sale',
        icon: 'ServerIcon',
        resource: 'Sales',
        action: 'manage',
      },
      {
        title: 'Reporting',
        route: 'report-sale',
        icon: 'BookOpenIcon',
        resource: 'Sales',
        action: 'manage',
      },
      // {
      //   title: 'Giftcard List',
      //   route: 'giftcard-sale',
      //   icon: 'CreditCardIcon',
      // },
      // {
      //   title: 'Coupon',
      //   route: 'coupon-sale',
      //   icon: 'CreditCardIcon',
      // },
    ],
  },
]
