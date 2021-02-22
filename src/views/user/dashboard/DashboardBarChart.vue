<template>
  <b-card no-body>
    <b-card-header>
      <b-card-title>Trend Penjualan di Toko</b-card-title>
      <!-- datepicker -->
      <div class="d-flex align-items-center">
        <flat-pickr
          v-model="rangePicker"
          :config="{ mode: 'range'}"
          class="form-control flat-picker bg-transparent border-0 shadow-none"
          placeholder="YYYY-MM-DD"
        />
      </div>
      <!-- datepicker -->
    </b-card-header>

    <!-- chart -->
    <b-card-body>
      <chartjs-component-bar-chart
        :height="550"
        :data="chartjsData.latestBarChart.data"
        :options="chartjsData.latestBarChart.options"
      />
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard, BCardHeader, BCardBody, BCardTitle,
} from 'bootstrap-vue'
import flatPickr from 'vue-flatpickr-component'
import ChartjsComponentBarChart from './charts-components/ChartjsComponentBarChart.vue'
import chartjsData from './chartjsData'

export default {
  components: {
    BCard,
    BCardHeader,
    BCardBody,
    BCardTitle,
    flatPickr,
    ChartjsComponentBarChart,
  },
  data() {
    return {
      selectedPembayaran: null,
      selectedStatus: null,
      pembayaranItems: [
        {
          value: '3',
          text: '3 Hari',
        },
        {
          value: '7',
          text: '7 Hari',
        },
        {
          value: '14',
          text: '14 Hari',
        },
        {
          value: '30',
          text: '30 Hari',
        },
      ],
      chartjsData,
      rangePicker: ['2021-01-01', '2019-01-03'],
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
