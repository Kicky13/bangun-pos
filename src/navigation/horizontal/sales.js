export default [
  {
    header: 'Transaksi',
    icon: 'FileTextIcon',
    resource: 'Sales',
    action: 'read',
    children: [
      {
        title: 'Data Transaksi',
        route: 'list-sale',
        icon: 'FileTextIcon',
        resource: 'Sales',
        action: 'manage',
      },
      // {
      //   title: 'Reporting',
      //   route: 'report-sale',
      //   icon: 'BookOpenIcon',
      //   resource: 'Sales',
      //   action: 'manage',
      // },
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
