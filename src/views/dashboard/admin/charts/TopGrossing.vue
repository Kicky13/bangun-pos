<template>
  <b-card no-body>
    <b-card-header>
      <b-card-title>Produk Grossing (Top 5)</b-card-title>
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
        v-if="!isLoading"
        :height="300"
        :data="dataGraph"
        :options="optionGraph"
      />
      <loading-grow-transparent v-else />
    </b-card-body>
    <b-card-footer>
      <div class="container-fluid align-items-center">
        <b-card-title style="text-align: center">
          Berdasarkan Pendapatan Penjualan
        </b-card-title>
      </div>
    </b-card-footer>
  </b-card>
</template>

<script>
import {
  BCard, BCardHeader, BCardBody, BCardTitle, BCardFooter,
} from 'bootstrap-vue'
import { $themeColors } from '@themeConfig'
import ApiService from '@/connection/apiService'
import LoadingGrowTransparent from '@core/components/loading-process/LoadingGrowTransparent.vue'
import ComponentChart from './ComponentChart.vue'
import graphData from './graphData'

const appService = new ApiService()

export default {
  components: {
    BCard,
    BCardHeader,
    BCardBody,
    BCardTitle,
    BCardFooter,
    ComponentChart,
    LoadingGrowTransparent,
  },
  data() {
    return {
      graphData,
      isLoading: false,
      dataGraph: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: '#b20838',
            borderColor: 'transparent',
          },
        ],
      },
      optionGraph: {
        elements: {
          rectangle: {
            borderWidth: 2,
            borderSkipped: 'bottom',
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        responsiveAnimationDuration: 500,
        legend: {
          display: false,
        },
        tooltips: {
          shadowOffsetX: 1,
          shadowOffsetY: 1,
          shadowBlur: 8,
          shadowColor: 'rgba(0, 0, 0, 0.25)',
          backgroundColor: $themeColors.light,
          titleFontColor: $themeColors.dark,
          bodyFontColor: $themeColors.dark,
        },
        scales: {
          xAxes: [
            {
              display: true,
              gridLines: {
                display: true,
                color: 'rgba(200, 200, 200, 0.2)',
                zeroLineColor: 'rgba(200, 200, 200, 0.2)',
              },
              scaleLabel: {
                display: false,
              },
              ticks: {
                fontColor: '#6e6b7b',
              },
            },
          ],
          yAxes: [
            {
              display: true,
              gridLines: {
                color: 'rgba(200, 200, 200, 0.2)',
                zeroLineColor: 'rgba(200, 200, 200, 0.2)',
              },
              ticks: {
                stepSize: 100,
                min: 0,
                max: 400,
                fontColor: '#6e6b7b',
              },
            },
          ],
        },
      },
    }
  },
  mounted() {
    this.fetchGrossProduct()
  },
  methods: {
    fetchGrossProduct() {
      this.isLoading = true
      appService.getChartGrossProduct().then(res => {
        console.log(res)
        if (res.data.result) {
          this.reformatData(res.data.data)
          this.isLoading = false
        }
      }).catch(err => {
        console.error(err)
        this.isLoading = false
      })
    },
    reformatData(data) {
      const dataSets = []
      const labels = []

      data.forEach(e => {
        dataSets.push(e.jumlah)
        labels.push(e.label)
      })

      this.dataGraph = {
        labels,
        datasets: [
          {
            data: dataSets,
            backgroundColor: '#b20838',
            borderColor: 'transparent',
          },
        ],
      }
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
