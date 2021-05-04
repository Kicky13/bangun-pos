<template>
  <b-row>
    <b-col cols="12">
      <type-table />
    </b-col>
  </b-row>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue'
import TypeTable from './TypeTable.vue'

export default {
  components: {
    BRow,
    BCol,

    TypeTable,
  },
}
</script>

<style lang="scss" >
@import '@core/scss/vue/libs/vue-good-table.scss';
</style>
