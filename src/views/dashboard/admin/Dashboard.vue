<template>
  <section id="dashboard-ecommerce">
    <b-row class="match-height">
      <b-col cols="6">
        <shop-sell />
      </b-col>
      <b-col cols="6">
        <product-selling />
      </b-col>
      <b-col cols="4">
        <best-seller />
      </b-col>
      <b-col cols="4">
        <top-grossing />
      </b-col>
      <b-col cols="4">
        <favourite />
      </b-col>
    </b-row>
  </section>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue'
import ShopSell from './charts/ShopSell.vue'
import ProductSelling from './charts/ProductSelling.vue'
import TopGrossing from './charts/TopGrossing.vue'
import Favourite from './charts/Favourite.vue'
import BestSeller from './charts/BestSeller.vue'

export default {
  components: {
    BRow,
    BCol,

    ShopSell,
    ProductSelling,
    TopGrossing,
    Favourite,
    BestSeller,
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/dashboard-ecommerce.scss';
@import '@core/scss/vue/libs/chart-apex.scss';
</style>
