<template>
  <div class="navbar-header d-xl-block d-none">
    <ul class="nav navbar-nav">
      <li class="nav-item">
        <b-link
          v-if="userdata.role === 'user'"
          class="navbar-brand"
          to="/mydashboard"
        >
          <span class="brand-logo">
            <b-img
              class="d-none"
              :src="appLogoImage"
              alt="logo"
              fluid-grow
            />
            <b-img
              class="d-xl-none"
              :src="require('@/assets/images/logo/POSRetailLogo.png')"
              alt="logo"
              fluid-grow
            />
          </span>
          <h2 class="brand-text mb-0">
            {{ appName }}
          </h2>
        </b-link>
        <b-link
          v-if="userdata.role === 'admin'"
          class="navbar-brand"
          to="/"
        >
          <span class="brand-logo">
            <b-img
              :src="appLogoImage"
              alt="logo"
              fluid-grow
            />
          </span>
          <h2 class="brand-text mb-0">
            {{ appName }}
          </h2>
        </b-link>
      </li>
    </ul>
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
