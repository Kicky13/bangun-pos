<template>
  <b-row>
    <b-col cols="12">
      <category-table />
    </b-col>
  </b-row>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue'
import CategoryTable from './CategoryTable.vue'

export default {
  components: {
    BRow,
    BCol,

    CategoryTable,
  },
}
</script>

<style lang="scss" >
@import '@core/scss/vue/libs/vue-good-table.scss';
</style>
