export default {
  // Auth Endpoints
  loginEndpoint: 'login',
  registerEndpoint: 'toko/store',

  // Token
  storageTokenName: 'accesstoken',

  // Key
  appKey: 'FVtf3mAUG6Qmh4DfFVtf3mAUG6Qmh4DfFVtf3mAUG6Qmh4Df',

  // Ability
  userAbility: [
    {
      action: 'read',
      subject: 'User',
    },
    {
      action: 'manage',
      subject: 'SalesUser',
    },
    {
      action: 'manage',
      subject: 'ProductUser',
    },
    {
      action: 'manage',
      subject: 'PointSale',
    },
    {
      action: 'manage',
      subject: 'DasboardUser',
    },
    {
      action: 'manage',
      subject: 'CustomerUser',
    },
    {
      action: 'read',
      subject: 'Auth',
    },
  ],
  adminAbility: [
    {
      action: 'read',
      subject: 'Dashboard',
    },
    {
      action: 'manage',
      subject: 'Product',
    },
    {
      action: 'manage',
      subject: 'Sales',
    },
    {
      action: 'manage',
      subject: 'Master',
    },
    {
      action: 'manage',
      subject: 'ProductSettings',
    },
    {
      action: 'read',
      subject: 'Auth',
    },
  ],
}
