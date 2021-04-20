<template>
  <div>
    <profile-wizard />
  </div>
</template>

<script>
import { } from 'bootstrap-vue'
import ProfileWizard from './ProfileWizard.vue'

export default {
  components: {
    ProfileWizard,
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
