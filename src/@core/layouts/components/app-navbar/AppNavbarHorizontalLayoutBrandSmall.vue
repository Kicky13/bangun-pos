<template>
  <div
    class="navbar-header d-xl-none d-lg-none d-md-none d-sm-block d-xs-block"
    style="width: 75px !important;"
  >
    <b-link
      v-if="userdata.role === 'user'"
      class="navbar-brand"
      to="/mydashboard"
    >
      <span class="brand-logo">
        <b-img
          :src="require('@/assets/images/logo/POSRetailLogo.png')"
          alt="logo"
          fluid-grow
          style="margin-left: 5px;"
        />
      </span>
    </b-link>
    <b-link
      v-if="userdata.role === 'admin'"
      class="navbar-brand"
      to="/"
    >
      <span class="brand-logo">
        <b-img
          :src="require('@/assets/images/logo/POSRetailLogo.png')"
          alt="logo"
          fluid-grow
        />
      </span>
    </b-link>
  </div>
</template>

<script>
import { BLink, BImg } from 'bootstrap-vue'
import { $themeConfig } from '@themeConfig'

export default {
  components: {
    BLink,
    BImg,
  },
  setup() {
    // App Name
    const { appName, appLogoImage } = $themeConfig.app
    return {
      appName,
      appLogoImage,
    }
  },
  data() {
    return {
      userdata: JSON.parse(localStorage.getItem('userData')),
    }
  },
}
</script>

<style>

</style>
