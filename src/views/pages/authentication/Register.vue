<template>
  <div>
    <div
      style="color: #000000; background-color: #000000; min-height: 60px;"
      class="content-header navbar-container align-items-center"
    >
      <div
        class="navbar-header d-xl-block d-none"
        style="max-height: 100px; max-width: 215px; margin-left: 15px; padding: 10px 0"
      >
        <ul class="nav navbar-nav">
          <li class="nav-item">
            <b-link
              class="navbar-brand"
              to="/"
            >
              <span class="brand-logo">
                <b-img
                  :src="appLogoImage"
                  alt="logo"
                  fluid
                />
              </span>
              <h2 class="brand-text mb-0">
                {{ appName }}
              </h2>
            </b-link>
          </li>
        </ul>
      </div>
    </div>
    <div style="margin-left: 20px; margin-right: 20px; margin-top: 50px;">
      <div
        style="color: #ea5455; background-color: #ea5455; min-height: 100px; padding: 10px 0"
        class="content-header navbar-container align-items-center"
      >
        <div
          style="margin-left: 30px; margin-top: 20px; margin-bottom: 20px;"
        >
          <b-row>
            <h3 style="color: white;">
              Register
            </h3>
          </b-row>
          <b-row>
            <h5 style="color: white">
              Lengkapi data dibawah ini untuk mengaktifkan akun anda
            </h5>
          </b-row>
        </div>
      </div>
      <b-row>
        <b-col cols="12">
          <register-wizard />
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import {
  BRow, BCol, BImg, BLink,
} from 'bootstrap-vue'
import { $themeConfig } from '@themeConfig'
import { useRouter } from '@core/utils/utils'
import RegisterWizard from './RegisterWizard.vue'

export default {
  components: {
    BRow,
    BCol,
    BImg,
    BLink,

    RegisterWizard,
  },
  setup() {
    // App Name
    const { route } = useRouter()
    const { appName, appLogoImage } = $themeConfig.app
    const aksesTokoToken = route.value.params.token
    return {
      aksesTokoToken,
      appName,
      appLogoImage,
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
