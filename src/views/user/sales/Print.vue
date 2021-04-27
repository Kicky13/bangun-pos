<template>
  <div>
    <!-- Action Button Section -->
    <div>
      <b-row>
        <b-col
          cols="12"
          md="2"
        />
        <b-col
          cols="12"
          md="2"
        >
          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            class="mb-1"
            block
            @click="printLandscape"
          >
            Cetak
          </b-button>
        </b-col>
        <b-col
          cols="12"
          md="2"
        >
          <b-button
            v-ripple.400="'rgba(40, 199, 111, 0.15)'"
            class="mb-1"
            block
            :to="{name: 'user-sale'}"
          >
            Kembali
          </b-button>
        </b-col>
      </b-row>
    </div>
    <!-- End Action Button Section -->
    <b-card id="printTable">
      <loading-grow v-if="isLoading" />

      <!-- table -->
      <vue-good-table
        id="printTable"
        :columns="columns"
        :rows="rows"
        :rtl="direction"
        :select-options="{ enabled: false }"
        :search-options="{
          enabled: false,
          externalQuery: searchTerm }"
        :pagination-options="{
          enabled: false,
          perPage:pageLength
        }"
      >
        <template
          slot="table-row"
          slot-scope="props"
        >

          <!-- Column: Status -->

          <span v-if="props.column.field === 'paymentStatus'">
            <b-badge :variant="paymentVariant(props.row.paymentStatus)">
              {{ props.row.paymentStatus }}
            </b-badge>
          </span>

          <span v-else-if="props.column.field === 'saleStatus'">
            <b-badge :variant="salesVariant(props.row.saleStatus)">
              {{ props.row.saleStatus }}
            </b-badge>
          </span>

          <!-- Column: Common -->
          <span v-else>
            {{ props.formattedRow[props.column.field] }}
          </span>
        </template>
      </vue-good-table>

    </b-card>
  </div>
</template>

<script>
import {
  BBadge, BCard, BButton, BRow, BCol, // BPagination, BFormGroup, BFormInput, BFormSelect, BDropdown, BDropdownItem,
} from 'bootstrap-vue'
import { VueGoodTable } from 'vue-good-table'
import store from '@/store/index'
import Ripple from 'vue-ripple-directive'
import ApiService from '@/connection/apiService'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import LoadingGrow from '@core/components/loading-process/LoadingGrow.vue'

const appService = new ApiService()

export default {
  components: {
    BButton,
    VueGoodTable,
    // BPagination,
    // BFormGroup,
    // BFormInput,
    // BFormSelect,
    // BDropdown,
    // BDropdownItem,
    BBadge,
    BCard,
    LoadingGrow,
    BRow,
    BCol,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      selectedPembayaran: null,
      selectedStatus: null,
      isLoading: false,
      pageLength: 10,
      dir: false,
      pembayaranItems: [
        {
          value: null,
          text: 'Semua Pembayaran',
        },
        {
          value: 'CASH',
          text: 'CASH',
        },
        {
          value: 'KREDIT',
          text: 'KREDIT',
        },
      ],
      statusItems: [
        {
          value: null,
          text: 'Semua Status',
        },
        {
          value: 'LUNAS',
          text: 'LUNAS',
        },
        {
          value: 'UTANG',
          text: 'UTANG',
        },
      ],
      columns: [
        {
          label: 'Kode Penjualan',
          field: 'saleCode',
        },
        {
          label: 'Tanggal',
          field: 'date',
        },
        {
          label: 'Customer',
          field: 'customer',
        },
        {
          label: 'Kode Referensi',
          field: 'ref',
        },
        {
          label: 'Kasir',
          field: 'biller',
        },
        {
          label: 'Sub Total',
          field: 'subtotal',
        },
        {
          label: 'Diskon',
          field: 'disc',
        },
        {
          label: 'Ongkos Kirim',
          field: 'ship',
        },
        {
          label: 'Pajak',
          field: 'tax',
        },
        {
          label: 'Type Pembayaran',
          field: 'typePayment',
          sortable: false,
          filterOptions: {
            enabled: false,
            filterDropdownItems: ['CASH', 'KREDIT'],
          },
        },
        {
          label: 'Status',
          field: 'paymentStatus',
          sortable: false,
          filterOptions: {
            enabled: false,
            filterDropdownItems: ['PAID', 'UNPAID'],
          },
        },
      ],
      rows: [],
      searchTerm: '',
    }
  },
  computed: {
    salesVariant() {
      const statusColor = {
        CASH: 'light-primary',
        KREDIT: 'light-secondary',
      }
      return status => statusColor[status]
    },
    paymentVariant() {
      const statusColor = {
        PAID: 'light-secondary',
        UNPAID: 'light-primary',
      }
      return status => statusColor[status]
    },
    direction() {
      if (store.state.appConfig.isRTL) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.dir = true
        return this.dir
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.dir = false
      return this.dir
    },
  },
  destroyed() {
    window.removeEventListener('resize', this.initTrHeight)
    this.$store.commit('appConfig/UPDATE_NAV_MENU_HIDDEN', this.menuHidden)
  },
  created() {
    window.addEventListener('resize', this.initTrHeight)
    this.$store.commit('appConfig/UPDATE_NAV_MENU_HIDDEN', true)
    this.fetchSalesList()
  },
  methods: {
    // advanceSearch(val) {
    //   this.searchTerm = val
    // },
    fetchSalesList() {
      this.isLoading = true
      appService.getSales({
        limit: 10,
        page: 1,
      }).then(response => {
        const res = response.data.data
        this.isLoading = false
        if (res.length > 0) {
          // console.log(res)
          res.forEach(this.setupRows)
        } else {
          this.$toast({
            component: ToastificationContent,
            position: 'top-right',
            props: {
              title: 'Data Not Found',
              icon: 'CoffeeIcon',
              variant: 'danger',
              text: 'Data empty on server, using dummy data now',
            },
          })
          // this.$http.get('/app-data/salesUser')
          //   .then(resData => { this.rows = resData.data })
        }
      }).catch(err => {
        console.log(err)
        this.isLoading = false
      })
    },
    setupRows(data) {
      const res = {
        id: data.uuid,
        date: data.date_transaction,
        saleCode: data.kode_transaksi,
        ref: data.no_references,
        biller: data.kasir.nama,
        customer: data.nama_customer,
        subtotal: data.sub_total,
        disc: data.discount,
        ship: data.shipping,
        tax: data.tax,
        typePayment: data.payment_type_str,
        paymentStatus: data.status,
      }
      this.rows.push(res)
    },
    printLandscape() {
      const localOptions = {
        styles: [
          'https://cdn.jsdelivr.net/npm/vue-good-table@2.18.1/dist/vue-good-table.min.css',
          'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
          'https://unpkg.com/kidlat-css/css/kidlat.css',
        ],
      }
      this.$htmlToPaper('printTable', localOptions, () => {
        console.warn('done')
      })
    },
  },
}
</script>

<style lang="scss">
@import "../node_modules/vue-good-table/src/styles/style.scss";

.vgt-table {
  font-size: 12px !important;
}
</style>
