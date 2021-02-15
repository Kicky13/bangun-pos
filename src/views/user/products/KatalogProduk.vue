<template>
  <b-row class="match-height">
    <b-col lg="12">
      <item-section />
    </b-col>
  </b-row>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue'

// import CartSection from './CartSection.vue'
import ItemSection from './ItemSection.vue'

export default {
  components: {
    BRow,
    BCol,

    // CartSection,
    ItemSection,
  },
  created() {
    this.$store.commit('appConfig/UPDATE_NAV_MENU_HIDDEN', true)
  },
  destroyed() {
    this.$store.commit('appConfig/UPDATE_NAV_MENU_HIDDEN', this.menuHidden)
  },
}
</script>
