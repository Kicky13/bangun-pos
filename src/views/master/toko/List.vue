<template>
  <b-row>
    <b-col cols="12">
      <list-table />
    </b-col>
  </b-row>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue'
import ListTable from './table/ListTable.vue'

export default {
  components: {
    BRow,
    BCol,

    ListTable,
  },
}
</script>

<style lang="scss" >
@import '@core/scss/vue/libs/vue-good-table.scss';
</style>
