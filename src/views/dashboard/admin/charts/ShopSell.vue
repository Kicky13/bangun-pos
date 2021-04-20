<template>
  <b-card no-body>
    <b-card-header>
      <b-card-title>Top 10 Penjualan Toko Bangunan</b-card-title>
      <!-- datepicker -->
      <div class="d-flex align-items-center">
        <b-form-select
          id="sortingdurasi"
          v-model="selectedDurasi"
          :options="durasi"
        />
      </div>
      <!-- datepicker -->
    </b-card-header>

    <!-- chart -->
    <b-card-body>
      <component-chart
        :height="400"
        :data="graphData.latestBarChart.data"
        :options="graphData.latestBarChart.options"
      />
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard, BCardHeader, BCardBody, BCardTitle, BFormSelect,
} from 'bootstrap-vue'
import ComponentChart from './ComponentChart.vue'
import graphData from './graphData'

export default {
  components: {
    BCard,
    BCardHeader,
    BCardBody,
    BCardTitle,
    BFormSelect,
    ComponentChart,
  },
  data() {
    return {
      graphData,
      selectedDurasi: null,
      durasi: [
        {
          value: null,
          text: 'Semua',
        },
        {
          value: '3',
          text: '3 Hari',
        },
        {
          value: '7',
          text: '7 Hari',
        },
        {
          value: '30',
          text: '30 Hari',
        },
      ],
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
