<template>
  <b-row>
    <b-col
      lg="8"
      md="8"
      sm="12"
    >
      <dashboard-bar-chart />
    </b-col>
    <b-col
      lg="4"
      md="4"
      sm="12"
    >
      <ecommerce-goal-overview :data="goalOverview" />
      <ecommerce-transactions
        :data="transactionData"
        :rentang="textDisplay"
        :mulai="tanggalStart"
        :akhir="tanggalEnd"
      />
    </b-col>
  </b-row>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue'
// import { getUserData } from '@/auth/utils'
import ApiService from '@/connection/apiService'
import DashboardBarChart from './DashboardBarChart.vue'
import EcommerceGoalOverview from './EcommerceGoalOverview.vue'
import EcommerceTransactions from './EcommerceTransactions.vue'

const appService = new ApiService()

export default {
  components: {
    BRow,
    BCol,
    DashboardBarChart,
    EcommerceGoalOverview,
    EcommerceTransactions,
  },
  data() {
    return {
      data: {},
      textDisplay: '1 Minggu Terakhir',
      tanggalStart: '',
      tanggalEnd: '',
      menuHidden: this.$store.state.appConfig.layout.menu.hidden,
      goalOverview: {
        totalTransaction: '0',
        completed: '0',
        inProgress: '0',
        allinProgress: '0',
        // totalTransaction: '50,000,000.00',
        // completed: '35,000,000.00',
        // inProgress: '15,000,000.00',
        // allinProgress: '25,000,000.00',
        // series: [83],
      },
      transactionData: [],
      // transactionData: [
      //   {
      //     mode: 'Semen Gresik 50 Kg',
      //     types: 'Rp. 50,000.00 / Zak',
      //     avatar: 'DollarSignIcon',
      //     avatarVariant: 'light-primary',
      //     payment: '2000 Zak',
      //     deduction: false,
      //   },
      //   {
      //     mode: 'Bata Ringan',
      //     types: 'Rp. 5,000.00 / Pcs',
      //     avatar: 'DollarSignIcon',
      //     avatarVariant: 'light-primary',
      //     payment: '1800 Pcs',
      //     deduction: false,
      //   },
      //   {
      //     mode: 'Papan Triplex 1.5 cm',
      //     types: 'Rp. 65,000.00 / Lbr',
      //     avatar: 'DollarSignIcon',
      //     avatarVariant: 'light-primary',
      //     payment: '780 Lbr',
      //     deduction: false,
      //   },
      //   {
      //     mode: 'Pasir Hitam',
      //     types: 'Rp. 75,000.00 / M3',
      //     avatar: 'DollarSignIcon',
      //     avatarVariant: 'light-primary',
      //     payment: '500 M3',
      //     deduction: false,
      //   },
      //   {
      //     mode: 'Coral (Campuran Beton)',
      //     types: 'Rp. 65,000.00 / M3',
      //     avatar: 'DollarSignIcon',
      //     avatarVariant: 'light-primary',
      //     payment: '400 M3',
      //     deduction: false,
      //   },
      // ],
    }
  },
  created() {
    this.$store.commit('appConfig/UPDATE_NAV_MENU_HIDDEN', true)
    // const userData = getUserData()
    // this.data.congratulations.name = userData.fullName.split(' ')[0] || userData.username
  },
  destroyed() {
    this.$store.commit('appConfig/UPDATE_NAV_MENU_HIDDEN', this.menuHidden)
  },
  mounted() {
    this.getGoalOverviewData()
    this.getTransactionsData('last_week', this.textDisplay)
  },
  methods: {
    getGoalOverviewData() {
      // const param = {
      //   start_date: StartDate,
      //   end_date: EndDate,
      // }
      appService.getGoalOverviewData().then(response => {
        const { data } = response
        console.log(data)
        if (data.result) {
          this.goalOverview = {
            totalTransaction: data.sales,
            completed: data.paid,
            inProgress: data.unpaid,
            allinProgress: data.totalUnpaid,
          }
        }
      })
    },
    getTransactionsData(duration, textdisp) {
      const param = {
        filter: duration,
      }
      appService.getTransactionsData(param).then(response => {
        const { data } = response
        // console.log(data)
        // if (data.data) {
        // }
        this.transactionData = []
        if (data.data) {
          this.textDisplay = textdisp
          this.tanggalStart = data.tgl_start
          this.tanggalEnd = data.tgl_end
          const itemlist = data.data
          itemlist.forEach(item => {
            this.transactionData.push({
              mode: item.nama_product,
              types: `${item.price} / ${item.nama_uom}`,
              avatar: 'DollarSignIcon',
              avatarVariant: 'light-primary',
              // payment: `${item.price} / ${item.nama_uom}`,
              payment: `${item.qty} x ${item.nama_uom}`,
              deduction: false,
              // id: item.kode_produk,
              // name: item.nama_produk,
              // qty: item.nama_uom,
              // price: item.price,
              // image: item.img_produk,
              // id_produk: item.id_produk,
              // kode_produk: item.kode_produk,
              // nama_produk: item.nama_produk,
              // img_produk: item.img_produk,
              // id_category: item.id_category,
              // nama_category: item.nama_category,
              // id_subcategory: item.id_subcategory,
              // nama_subcategory: item.nama_subcategory,
              // id_brand: item.id_brand,
              // nama_brand: item.nama_brand,
              // id_type: item.id_type,
              // nama_type: item.nama_type,
              // id_uom: item.id_uom,
              // nama_uom: item.nama_uom,
              // id_price: item.id_price,
              // is_available: item.is_available,
            })
          })
        }
      })
    },
  },
}
</script>
