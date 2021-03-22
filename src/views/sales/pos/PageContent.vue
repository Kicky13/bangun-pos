<template>
  <b-row class="match-height">
    <b-col lg="6">
      <item-section />
    </b-col>
    <b-col lg="6">
      <cart-section />
    </b-col>
  </b-row>
</template>

<script>
import Vue from 'vue'
import { BRow, BCol } from 'bootstrap-vue'

import CartSection from './CartSection.vue'
import ItemSection from './ItemSection.vue'

export const parentComponent = new Vue()

export default {
  components: {
    BRow,
    BCol,

    CartSection,
    ItemSection,
  },
}
</script>
