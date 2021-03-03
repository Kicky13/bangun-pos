<template>
  <div style="padding: 25% 0">
    <b-overlay
      id="loadverify"
      ref="loadverify"
      :show="isLoading"
      spinner-variant="primary"
      spinner-type="grow"
    >
      <template #overlay>
        <div class="d-flex align-items-center">
          <b-spinner
            small
            type="grow"
            variant="primary"
          />
          <b-spinner
            type="grow"
            variant="primary"
          />
          <b-spinner
            small
            type="grow"
            variant="primary"
          />
        </div>
      </template>
    </b-overlay>
  </div>
</template>

<script>
/* eslint-disable global-require */
// import { ValidationProvider, ValidationObserver } from 'vee-validate'
// import VuexyLogo from '@core/layouts/components/Logo.vue'
import {
  VBTooltip, BOverlay, BSpinner,
} from 'bootstrap-vue'
import useJwt from '@/auth/jwt/useJwt'
import { required, email } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import store from '@/store/index'
import { getHomeRouteForLoggedInUser } from '@/auth/utils'

import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  directives: {
    'b-tooltip': VBTooltip,
  },
  components: {
    BOverlay,
    BSpinner,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      status: '',
      isLoading: true,
      password: 'user',
      userEmail: 'user@demo.com',
      sideImg: require('@/assets/images/pages/login-v2.svg'),

      // validation rules
      required,
      email,
    }
  },
  computed: {
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        // this.sideImg = require('@/assets/images/pages/login-v2-dark.svg')
        // this.sideImg = require('@/assets/images/pages/login-v2-dark.svg')
        return this.sideImg
      }
      return this.sideImg
    },
  },
  mounted() {
    this.login()
  },
  methods: {
    login() {
      useJwt.login({
        email: this.userEmail,
        password: this.password,
      })
        .then(response => {
          const { userData } = response.data
          useJwt.setToken(response.data.accessToken)
          useJwt.setRefreshToken(response.data.refreshToken)
          localStorage.setItem('userData', JSON.stringify(userData))
          this.$ability.update(userData.ability)

          // ? This is just for demo purpose. Don't think CASL is role based in this case, we used role in if condition just for ease
          this.$router.replace(getHomeRouteForLoggedInUser(userData.role))
            .then(() => {
              this.$toast({
                component: ToastificationContent,
                position: 'top-right',
                props: {
                  title: `Welcome ${userData.fullName || userData.username}`,
                  icon: 'CoffeeIcon',
                  variant: 'success',
                  text: `You have successfully logged in as ${userData.role}. Now you can start to explore!`,
                },
              })
            })
            .catch(error => {
            //   this.$refs.loginForm.setErrors(error.response.data.error)
              this.$toast({
                component: ToastificationContent,
                position: 'top-right',
                props: {
                  title: `Error ${error.response.data.error}`,
                  icon: 'CoffeeIcon',
                  variant: 'error',
                  text: 'Token unverified, please try again',
                },
              })
            })
        })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>
