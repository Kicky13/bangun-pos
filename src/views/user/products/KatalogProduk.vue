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
}
</script>
