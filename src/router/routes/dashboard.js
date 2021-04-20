export default [
  {
    path: '/dashboard/analytics',
    name: 'dashboard-analytics',
    meta: {
      action: 'read',
      resource: 'Dashboard',
    },
    component: () => import('@/views/dashboard/analytics/Analytics.vue'),
  },
  {
    path: '/dashboard/ecommerce',
    name: 'dashboard-ecommerce',
    meta: {
      action: 'read',
      resource: 'Dashboard',
    },
    component: () => import('@/views/dashboard/ecommerce/Ecommerce.vue'),
  },
  {
    path: '/admin/dashboard',
    name: 'dashboard-admin',
    meta: {
      action: 'read',
      resource: 'Dashboard',
    },
    component: () => import('@/views/dashboard/admin/Dashboard.vue'),
  },
]
