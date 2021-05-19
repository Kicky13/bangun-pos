<template>
  <b-card no-body>
    <b-card-header>
      <b-card-title>Top 10 Penjualan Toko Bangunan</b-card-title>
      <!-- datepicker -->
      <div class="d-flex align-items-center">
        <feather-icon
          icon="CalendarIcon"
          size="16"
        />
        <flat-pickr
          v-model="dateRange"
          :config="{ mode: 'range', minDate: '2021-01-01', maxDate: 'today' }"
          class="form-control flat-picker bg-transparent border-0 shadow-none"
          placeholder="DD-MM-YYYY"
          @on-change="fetchDataPenjualan"
        />
      </div>
      <!-- datepicker -->
    </b-card-header>

    <!-- chart -->
    <b-card-body>
      <component-chart
        v-if="!isLoading"
        :height="400"
        :data="dataGraph"
        :options="optionGraph"
      />
      <loading-grow-transparent v-else />
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard, BCardHeader, BCardBody, BCardTitle,
} from 'bootstrap-vue'
import { $themeColors } from '@themeConfig'
import flatPickr from 'vue-flatpickr-component'
import ApiService from '@/connection/apiService'
import LoadingGrowTransparent from '@core/components/loading-process/LoadingGrowTransparent.vue'
import ComponentChart from './ComponentChart.vue'

const appService = new ApiService()

export default {
  components: {
    BCard,
    BCardHeader,
    BCardBody,
    BCardTitle,
    flatPickr,
    ComponentChart,
    LoadingGrowTransparent,
  },
  data() {
    return {
      isLoading: false,
      dateRange: '',
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
                fontColor: '#6e6b7b',
              },
            },
          ],
        },
      },
    }
  },
  created() {
    this.setDefaultDateRange()
  },
  mounted() {
    this.fetchDataPenjualan()
  },
  methods: {
    onChangeDateRange() {
      const dateStr = this.dateRange.replace(' to ', '&')
      const dateAll = dateStr.split('&')
      console.log(dateAll)
    },
    fetchDataPenjualan() {
      this.isLoading = true
      if (this.dateRange.length === 0) {
        this.setDefaultDateRange()
      }
      console.log(this.dateRange)
      const startDate = this.formattingDate(this.dateRange, 0)
      const endDate = this.formattingDate(this.dateRange, 1)
      appService.getChartSalesToko({
        startDate,
        endDate,
      }).then(res => {
        if (res.data.result) {
          this.reformatData(res.data.data)
        }
        this.isLoading = false
      }).catch(err => {
        this.isLoading = false
        console.error(err)
      })
    },
    setDefaultDateRange() {
      const nowdate = new Date()
      const dayBefore = new Date(nowdate)
      dayBefore.setDate(dayBefore.getDate() - 3)
      this.dateRange = `${dayBefore.toISOString().slice(0, 10)} to ${nowdate.toISOString().slice(0, 10)}`
    },
    formattingDate(date, index) {
      const dateStr = date.replace(' to ', '&')
      const dateAll = dateStr.split('&')
      const spDate = dateAll[index].split('-')

      const day = spDate[2]
      const month = spDate[1]
      const year = spDate[0]

      return `${day}-${month}-${year}`
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
