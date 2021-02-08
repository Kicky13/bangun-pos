<template>
  <div />
</template>

<script>
import {} from 'bootstrap-vue'

export default {
  data() {
    return {
      menuHidden: this.$store.state.appConfig.layout.menu.hidden,
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
