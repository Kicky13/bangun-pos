<template>
  <div>
    <div
      style="color: #000000; background-color: #000000; min-height: 60px;"
      class="content-header navbar-container align-items-center"
    >
      <div
        class="navbar-header d-xl-block"
        style="max-height: 100px; max-width: 215px; margin-left: 15px; padding: 10px 0"
      >
        <ul class="nav navbar-nav">
          <li class="nav-item">
            <span class="brand-logo">
              <b-img
                :src="appLogoImage"
                alt="logo"
                fluid
              />
            </span>
          </li>
        </ul>
      </div>
    </div>
    <div
      style="color: #000000; background-color: #b20838; min-height: 100px;"
      class="content-header navbar-container align-items-center"
    >
      <div
        style="margin-left: 30px; margin-bottom: 20px;"
      >
        <b-row>
          <h3 style="color: white; margin-top:25px;">
            Register
          </h3>
        </b-row>
        <b-row>
          <h5 style="color: white; margin-bottom: 25px;">
            Lengkapi data dibawah ini untuk mengaktifkan akun anda
          </h5>
        </b-row>
      </div>
    </div>
    <div style="margin: 25px;">
      <b-row>
        <b-col cols="12">
          <register-wizard :form-data="formData" />
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import {
  BRow, BCol, BImg,
} from 'bootstrap-vue'
import { $themeConfig } from '@themeConfig'
import { useRouter } from '@core/utils/utils'
import authService from '@/connection/connection'
import RegisterWizard from './RegisterWizard.vue'

export default {
  components: {
    BRow,
    BCol,
    BImg,
    RegisterWizard,
  },
  setup() {
    // App Name
    const { route } = useRouter()
    const { appName, appLogoImage } = $themeConfig.app
    const aksesTokoToken = authService.getVerifyToken(route.value.params.token)
    const formData = authService.getDataToken(route.value.params.token)
    return {
      aksesTokoToken,
      appName,
      appLogoImage,
      formData,
    }
  },
  data() {
    return {
      formData: this.formData,
    }
  },
  created() {
    this.$store.commit('appConfig/UPDATE_NAV_MENU_HIDDEN', true)
  },
  destroyed() {
    this.$store.commit('appConfig/UPDATE_NAV_MENU_HIDDEN', this.menuHidden)
  },
}
</script>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-wizard.scss';
  @import '@core/scss/vue/libs/vue-select.scss';
</style>
