<template>
  <b-card no-body>
    <b-card-header>
      <b-card-title>Trend Penjualan di Toko</b-card-title>
      <!-- datepicker -->
      <div
        class="d-flex align-items-center"
        style="width: 100%;"
      >
        <flat-pickr
          v-model="rangePicker"
          :config="{ mode: 'range'}"
          class="form-control flat-picker bg-transparent border-0 shadow-none"
          placeholder="YYYY-MM-DD"
          @on-close="onDateChange"
        />
      </div>
      <!-- datepicker -->
    </b-card-header>

    <!-- chart -->
    <b-card-body>
      <chartjs-component-bar-chart
        ref="chart"
        :height="550"
        :data="latestBarChart.data"
        :options="latestBarChart.options"
      />
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard, BCardHeader, BCardBody, BCardTitle,
} from 'bootstrap-vue'
import ApiService from '@/connection/apiService'
import flatPickr from 'vue-flatpickr-component'
import { $themeColors } from '@themeConfig'
import ChartjsComponentBarChart from './charts-components/ChartjsComponentBarChart.vue'
// import chartjsData from './chartjsData'

// colors
const chartColors = {
  primaryColorShade: '#836AF9',
  standardColorShade: '#E02020',
  yellowColor: '#ffe800',
  successColorShade: '#28dac6',
  warningColorShade: '#ffe802',
  warningLightColor: '#FDAC34',
  infoColorShade: '#299AFF',
  greyColor: '#4F5D70',
  blueColor: '#2c9aff',
  blueLightColor: '#84D0FF',
  greyLightColor: '#EDF1F4',
  tooltipShadow: 'rgba(0, 0, 0, 0.25)',
  lineChartPrimary: '#666ee8',
  lineChartDanger: '#ff4961',
  labelColor: '#6e6b7b',
  grid_line_color: 'rgba(200, 200, 200, 0.2)',
}

const appService = new ApiService()

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
      latestBarChart: {
        data: {
          labels: [],
          datasets: [
            {
              data: [],
              backgroundColor: chartColors.standardColorShade,
              borderColor: 'transparent',
            },
          ],
        },
        options: {
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
            // Updated default tooltip UI
            shadowOffsetX: 1,
            shadowOffsetY: 1,
            shadowBlur: 8,
            shadowColor: chartColors.tooltipShadow,
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
                  color: chartColors.grid_line_color,
                  zeroLineColor: chartColors.grid_line_color,
                },
                scaleLabel: {
                  display: false,
                },
                ticks: {
                  fontColor: chartColors.labelColor,
                },
              },
            ],
            yAxes: [
              {
                display: true,
                gridLines: {
                  color: chartColors.grid_line_color,
                  zeroLineColor: chartColors.grid_line_color,
                },
                ticks: {
                  stepSize: 100,
                  min: 0,
                  max: 400,
                  fontColor: chartColors.labelColor,
                },
              },
            ],
          },
        },
      },
      // rangePicker: ['2021-01-01', '2021-01-10'],
      rangePicker: [],
    }
  },
  mounted() {
    // const [startdat, enddat] = this.rangePicker
    this.getDateNow()
    // this.getGraphData(startdat, enddat)
  },
  methods: {
    getDateNow() {
      const today = new Date()
      const yesterday = new Date((new Date()).valueOf() - 9000 * 60 * 60 * 24)
      const dtoday = `${today.getFullYear()}-${(today.getMonth() + 1)}-${today.getDate()}`
      const dyesterday = `${yesterday.getFullYear()}-${(yesterday.getMonth() + 1)}-${yesterday.getDate()}`
      this.rangePicker.push(dyesterday)
      this.rangePicker.push(dtoday)
      this.getGraphData(dyesterday, dtoday)
      // console.log(dtoday)
      // console.log(dyesterday)
      // const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
      // const dateTime = date +' '+ time
      // this.timestamp = dateTime
    },
    onDateChange(selectedDates, dateStr, instance) {
      console.log(selectedDates)
      console.log(dateStr)
      console.log(instance)
      this.rangePicker = []
      const myResult = dateStr.split(' to ')
      if (myResult.length === 2) {
        const [startdat, enddat] = myResult
        this.rangePicker.push(startdat)
        this.rangePicker.push(enddat)
        this.getGraphData(startdat, enddat)
      } else {
        this.rangePicker.push(dateStr)
        this.rangePicker.push(dateStr)
        this.getGraphData(dateStr, dateStr)
      }
    },
    getGraphData(StartDate, EndDate) {
      const param = {
        start_date: StartDate,
        end_date: EndDate,
      }
      appService.getGraphData(param).then(response => {
        const { data } = response
        console.log(data)
        if (data.data) {
          const label = []
          const nilai = []
          const itemlist = data.data
          itemlist.forEach(item => {
            label.push(item.label)
            nilai.push(item.jumlah)
          })
          this.latestBarChart.data.labels = label
          this.latestBarChart.data.datasets[0].data = nilai
          this.$refs.chart.renderChart(this.latestBarChart.data, this.latestBarChart.options)
        }
      })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
