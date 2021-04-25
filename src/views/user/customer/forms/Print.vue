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
            :to="{name: 'customer-history-trans'}"
          >
            Kembali
          </b-button>
        </b-col>
      </b-row>
    </div>
    <!-- End Action Button Section -->
    <b-card id="printTable">
      <!-- table -->
      <vue-good-table
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
          <span v-if="props.column.field === 'status'">
            <b-badge :variant="paymentVariant(props.row.status)">
              {{ props.row.status }}
            </b-badge>
          </span>
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
  BBadge, BCard, BButton, BRow, BCol, // BPagination, BFormGroup, BFormInput, BFormSelect,
} from 'bootstrap-vue'
import { VueGoodTable } from 'vue-good-table'
import { useRouter } from '@core/utils/utils'
import store from '@/store/index'
import Ripple from 'vue-ripple-directive'
import ApiService from '@/connection/apiService'
// import LogModal from './modals/LogModal.vue'

const appService = new ApiService()

export default {
  components: {
    BButton,
    // BPagination,
    // BFormGroup,
    // BFormInput,
    // BFormSelect,
    VueGoodTable,
    BBadge,
    BCard,
    // LogModal,
    BRow,
    BCol,
  },
  directives: {
    // 'b-modal': VBModal,
    Ripple,
  },
  data() {
    return {
      customerID: this.id,
      selectedPembayaran: null,
      selectedStatus: null,
      selectedTransId: null,
      pembayaranItems: [
        {
          value: null,
          text: 'Semua',
          // disabled: true,
        },
        {
          value: 'CASH',
          text: 'CASH',
        },
        {
          value: 'Kredit / Hutang',
          text: 'KREDIT',
        },
      ],
      statusItems: [
        {
          value: null,
          text: 'Semua',
          // disabled: true,
        },
        {
          value: 'Lunas',
          text: 'Lunas',
        },
        {
          value: 'Belum Lunas',
          text: 'Belum Lunas',
        },
      ],
      pageLength: 10,
      dir: false,
      columns: [
        {
          label: 'Kode Penjualan',
          field: 'saleCode',
        },
        {
          label: 'Customer',
          field: 'customer',
        },
        {
          label: 'Ref. Code',
          field: 'refCode',
        },
        {
          label: 'Sub. Total',
          field: 'subTotal',
        },
        {
          label: 'Diskon',
          field: 'diskon',
        },
        {
          label: 'Pajak',
          field: 'pajak',
        },
        {
          label: 'Ongkir',
          field: 'ongkir',
        },
        {
          label: 'Type Pembayaran',
          field: 'typeBayar',
          sortable: false,
          filterOptions: {
            enabled: false,
            filterDropdownItems: ['CASH', 'KREDIT'],
          },
        },
        {
          label: 'Status',
          field: 'status',
          sortable: false,
          filterOptions: {
            enabled: false,
            filterDropdownItems: ['PAID', 'UNPAID'],
          },
        },
        // {
        //   label: 'Action',
        //   field: 'action',
        //   sortable: false,
        // },
      ],
      rows: [],
      searchTerm: '',
    }
  },
  setup() {
    const { route } = useRouter()
    const { id } = route.value.params

    return {
      id,
    }
  },
  computed: {
    salesVariant() {
      const statusColor = {
        Draft: 'light-primary',
        Completed: 'light-secondary',
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
    this.fetchListTransaksi()
  },
  methods: {
    getLogTrans(transid) {
      this.selectedTransId = transid
    },
    fetchListTransaksi() {
      appService.historyList({ id_customer: this.customerID }).then(response => {
        const datares = response.data.data
        if (datares) {
          datares.forEach(this.setRows)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    setRows(data) {
      const res = {
        transId: data.id,
        saleCode: data.kode_transaksi,
        customer: data.customer.nama,
        refCode: data.no_references ?? '-',
        subTotal: data.sub_total,
        diskon: data.discount,
        pajak: data.pajak,
        ongkir: data.ongkir,
        typeBayar: data.type_pembayaran,
        status: data.status,
      }
      this.rows.push(res)
    },
    // print() {
    //   this.$htmlToPaper('printTable', null, () => {
    //     console.warn('done')
    //   })
    // },
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
