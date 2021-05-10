<template>
  <b-card
    v-if="data"
    no-body
  >
    <b-card-header>
      <h4 class="mb-0">
        Total Penjualan (<span style="color: red;">{{ tanggalHariIni }}</span>)
      </h4>
      <b-card-text class="font-medium-5 mb-0">
        <feather-icon
          icon="HelpCircleIcon"
          size="21"
          class="text-muted cursor-pointer"
        />
      </b-card-text>
    </b-card-header>

    <!-- apex chart -->
    <!-- <vue-apex-charts
      type="radialBar"
      height="245"
      class="my-2"
      :options="goalOverviewRadialBar"
      :series="data.series"
    /> -->
    <b-row class="text-center mx-0">
      <b-col
        lg="12"
        md="12"
        sm="12"
        class="border-top border-right d-flex align-items-between flex-column py-1"
      >
        <h1 class="font-weight-bolder mb-0">
          Rp. {{ formatPrice(data.totalTransaction) }}
        </h1>
      </b-col>
      <b-col
        lg="6"
        md="6"
        sm="12"
        class="border-top border-right d-flex align-items-between flex-column py-1"
      >
        <b-card-text class="text-muted mb-0">
          <span style="color: red;">Transaksi Penjualan Tunai</span>
        </b-card-text>
        <h3 class="font-weight-bolder mb-0">
          Rp. {{ formatPrice(data.completed) }}
        </h3>
      </b-col>
      <b-col
        lg="6"
        md="6"
        sm="12"
        class="border-top d-flex align-items-between flex-column py-1"
      >
        <b-card-text class="text-muted mb-0">
          <span style="color: red;">Transaksi Penjualan Kredit</span>
        </b-card-text>
        <h3 class="font-weight-bolder mb-0">
          Rp. {{ formatPrice(data.inProgress) }}
        </h3>
      </b-col>
      <b-col
        lg="12"
        md="12"
        sm="12"
        class="border-top border-right d-flex align-items-between flex-column py-1"
        style="border-top: solid 3px black !important;"
      >
        <b-card-text class="text-muted mb-0">
          <span style="color: red;">Total Outstanding Hutang Customer</span>
        </b-card-text>
        <h1 class="font-weight-bolder mb-0">
          Rp. {{ formatPrice(data.allinProgress) }}
        </h1>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import {
  BCard, BCardHeader, BRow, BCol, BCardText,
} from 'bootstrap-vue'
// import VueApexCharts from 'vue-apexcharts'
// import { $themeColors } from '@themeConfig'

// const $strokeColor = '#ebe9f1'
// const $textHeadingColor = '#5e5873'
// const $goalStrokeColor2 = '#51e5a8'
export default {
  components: {
    // VueApexCharts,
    BCard,
    BCardHeader,
    BRow,
    BCardText,
    BCol,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      mdata: {},
      tanggalHariIni: '',
      // goalOverviewRadialBar: {
      //   chart: {
      //     height: 245,
      //     type: 'radialBar',
      //     sparkline: {
      //       enabled: true,
      //     },
      //     dropShadow: {
      //       enabled: true,
      //       blur: 3,
      //       left: 1,
      //       top: 1,
      //       opacity: 0.1,
      //     },
      //   },
      //   colors: [$goalStrokeColor2],
      //   plotOptions: {
      //     radialBar: {
      //       offsetY: -10,
      //       startAngle: -150,
      //       endAngle: 150,
      //       hollow: {
      //         size: '77%',
      //       },
      //       track: {
      //         background: $strokeColor,
      //         strokeWidth: '50%',
      //       },
      //       dataLabels: {
      //         name: {
      //           show: false,
      //         },
      //         value: {
      //           color: $textHeadingColor,
      //           fontSize: '2.86rem',
      //           fontWeight: '600',
      //         },
      //       },
      //     },
      //   },
      //   fill: {
      //     type: 'gradient',
      //     gradient: {
      //       shade: 'dark',
      //       type: 'horizontal',
      //       shadeIntensity: 0.5,
      //       gradientToColors: [$themeColors.success],
      //       inverseColors: true,
      //       opacityFrom: 1,
      //       opacityTo: 1,
      //       stops: [0, 100],
      //     },
      //   },
      //   stroke: {
      //     lineCap: 'round',
      //   },
      //   grid: {
      //     padding: {
      //       bottom: 30,
      //     },
      //   },
      // },
    }
  },
  mounted() {
    this.getNow()
  },
  methods: {
    formatPrice(value) {
      // console.log(value)
      const val = (value / 1).toFixed(2).replace('.', ',')
      // console.log(val)
      // console.log(val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'))
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    getNow() {
      const today = new Date()
      const bulan = parseInt(today.getMonth() + 1, 10) < 10 ? `0${(today.getMonth() + 1)}` : (today.getMonth() + 1)
      const date = `${today.getFullYear()}-${bulan}-${today.getDate()}`
      const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`
      const dateTime = `${date} ${time}`
      this.tanggalHariIni = dateTime
    },
  },
}
</script>
