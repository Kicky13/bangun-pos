<template>
  <div
    class="horizontal-layout"
    :class="[layoutClasses]"
    :data-col="isNavMenuHidden ? '1-column' : null"
    style="height:inherit"
  >
    <b-row>
      <b-col cols="12">
        <register-wizard />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue'
import RegisterWizard from './RegisterWizard.vue'

export default {
  components: {
    BRow,
    BCol,
    RegisterWizard,
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
