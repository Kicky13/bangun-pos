<template>
  <b-card no-body>
    <b-card-header>
      <b-card-title>Top 10 Penjualan Product</b-card-title>
      <!-- datepicker -->
      <div class="d-flex align-items-center">
        <b-form-select
          id="sortingdurasi"
          v-model="selectedKategori"
          :options="kategori"
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
      selectedKategori: null,
      kategori: [
        {
          value: null,
          text: 'Kategori',
        },
        {
          value: '1',
          text: 'Kategori 1',
        },
        {
          value: '2',
          text: 'Kategori 2',
        },
        {
          value: '3',
          text: 'Kategori 3',
        },
      ],
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
