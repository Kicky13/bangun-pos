<template>
  <b-row>
    <b-col cols="12">
      <brand-table />
    </b-col>
  </b-row>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue'
import BrandTable from './BrandTable.vue'

export default {
  components: {
    BRow,
    BCol,

    BrandTable,
  },
}
</script>

<style lang="scss" >
@import '@core/scss/vue/libs/vue-good-table.scss';
</style>
