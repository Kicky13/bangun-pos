<template>
  <b-card no-body>
    <b-card-header>
      <b-card-title>Produk Terlaris (Top 5)</b-card-title>
      <!-- datepicker -->
      <div class="d-flex align-items-center">
        <feather-icon
          icon="AlertCircleIcon"
          size="16"
        />
      </div>
      <!-- datepicker -->
    </b-card-header>

    <!-- chart -->
    <b-card-body>
      <component-chart
        :height="300"
        :data="graphData.latestBarChart.data"
        :options="graphData.latestBarChart.options"
      />
    </b-card-body>
    <b-card-footer>
      <div class="container-fluid align-items-center">
        <b-card-title style="text-align: center">
          Berdasarkan Qty Penjualan
        </b-card-title>
      </div>
    </b-card-footer>
  </b-card>
</template>

<script>
import {
  BCard, BCardHeader, BCardBody, BCardTitle, BCardFooter,
} from 'bootstrap-vue'
import ComponentChart from './ComponentChart.vue'
import graphData from './graphData'

export default {
  components: {
    BCard,
    BCardHeader,
    BCardBody,
    BCardTitle,
    BCardFooter,
    ComponentChart,
  },
  data() {
    return {
      graphData,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
