<template>
  <b-row>
    <b-col cols="12">
      <subcategory-table />
    </b-col>
  </b-row>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue'
import SubcategoryTable from './SubcategoryTable.vue'

export default {
  components: {
    BRow,
    BCol,

    SubcategoryTable,
  },
}
</script>

<style lang="scss" >
@import '@core/scss/vue/libs/vue-good-table.scss';
</style>
