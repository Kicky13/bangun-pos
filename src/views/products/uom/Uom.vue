<template>
  <b-row>
    <b-col cols="12">
      <uom-table />
    </b-col>
  </b-row>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue'
import UomTable from './UomTable.vue'

export default {
  components: {
    BRow,
    BCol,

    UomTable,
  },
}
</script>

<style lang="scss" >
@import '@core/scss/vue/libs/vue-good-table.scss';
</style>
