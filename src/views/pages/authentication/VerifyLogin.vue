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
import authService from '@/connection/connection'
import { useRouter } from '@core/utils/utils'
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
  setup() {
    const { route } = useRouter()
    const { token } = route.value.params
    const { role, toko } = authService.getDataToken(token)
    console.log(toko)
    console.log(token)
    console.log(route)
    console.log(role)
    return {
      token,
      role,
      toko,
    }
  },
  data() {
    return {
      token: this.token ?? '',
      role: this.role ?? '',
      toko: this.toko ?? null,
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
      if (this.role !== '') {
        const toko = this.setDataUser()
        localStorage.removeItem('userData')
        localStorage.removeItem('clientCode')
        localStorage.setItem('userData', JSON.stringify(toko))
        localStorage.setItem('clientCode', '6513b68e72e8a1c9e272685fec161522')
        authService.setToken(this.token)
        const userAbility = authService.getAbility(this.role)
        this.$ability.update(userAbility)

        this.$router.replace(getHomeRouteForLoggedInUser(this.role))
          .then(() => {
            this.$toast({
              component: ToastificationContent,
              position: 'top-right',
              props: {
                title: `Welcome ${toko.fullName || toko.username}`,
                icon: 'CoffeeIcon',
                variant: 'success',
                text: `You have successfully logged in as ${this.role}. Now you can start to explore!`,
              },
            })
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    setDataUser() {
      const { toko, role } = this
      console.log(toko)
      const userAbility = authService.getAbility(role)
      const userData = {
        id: toko.id_toko,
        fullName: toko.nama_pemilik,
        shopName: toko.nama_toko,
        username: toko.kode_toko,
        password: role,
        ownerAddress: toko.alamat_pemilik,
        identityNumber: toko.no_identitas,
        ownerNumber: toko.telp_pemilik,
        shopNumber: toko.telp_toko,
        // eslint-disable-next-line global-require
        avatar: require('@/assets/images/avatars/13-small.png'),
        email: 'user@demo.com',
        role,
        ability: userAbility,
      }
      return userData
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>
