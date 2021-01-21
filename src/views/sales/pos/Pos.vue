<template>
  <div>
    <page-content />
  </div>
</template>

<script>
import {} from 'bootstrap-vue'
import PageContent from './PageContent.vue'

export default {
  components: {
    PageContent,
  },
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
