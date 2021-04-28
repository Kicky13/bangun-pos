import Vue from 'vue'
import VueRouter from 'vue-router'

// Routes
import { canNavigate } from '@/libs/acl/routeProtection'
import { isUserLoggedIn, getUserData, getHomeRouteForLoggedInUser } from '@/auth/utils'
import dashboard from './routes/dashboard'
import pages from './routes/pages'
import usermenu from './routes/usermenu'
import adminmenu from './routes/adminmenu'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    { path: '/', redirect: { name: 'dashboard-admin', meta: { action: 'read', resource: 'Dashboard' } } },
    ...adminmenu,
    ...dashboard,
    ...pages,
    ...usermenu,
    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})

router.beforeEach((to, _, next) => {
  const currRoute = router.currentRoute

  if (currRoute.name !== 'auto-login-verify') {
    const isLoggedIn = isUserLoggedIn()
    console.log(currRoute)

    if (!canNavigate(to)) {
      // Redirect to login if not logged in
      if (!isLoggedIn) return next({ name: 'auth-login' })

      // If logged in => not authorized
      return next({ name: 'misc-not-authorized' })
    }

    // Redirect if logged in
    if (to.meta.redirectIfLoggedIn && isLoggedIn) {
      const userData = getUserData()
      next(getHomeRouteForLoggedInUser(userData ? userData.role : null))
    }
  }

  return next()
})

export default router
