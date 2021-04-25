<template>
  <b-card>

    <div class="demo-inline-spacing">

      <!-- input search -->
      <div
        class="d-flex justify-content-end"
        style="float:left;"
      >
        <b-form-group>
          <div
            class="d-flex align-items-center"
            style="width: 700px !important;"
          >
            <label
              class="mr-1"
              style="font-size: 16px; font-weight: bold;"
            >Search</label>
            <b-form-input
              v-model="searchTerm"
              placeholder="Masukkan kata kunci pencarian disini"
              type="text"
              class="d-inline-block"
            />
          </div>
        </b-form-group>
      </div>
      <div style="float:left;margin-left:10px;">
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          variant="danger"
          style="margin-top: -15px;"
          :to="{name: 'customer-history-trans-print'}"
        >
          Print
        </b-button>
      </div>
    </div>

    <!-- table -->
    <vue-good-table
      :columns="columns"
      :rows="rows"
      :rtl="direction"
      :select-options="{ enabled: true }"
      :search-options="{
        enabled: true,
        externalQuery: searchTerm }"
      :pagination-options="{
        enabled: true,
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

        <!-- Column: Action -->
        <span v-else-if="props.column.field === 'action'">
          <span>
            <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              :to="{name: 'user-customer-list-trans-detail', params: {id: props.row.transId}}"
              size="sm"
              variant="outline-secondary"
            >
              View Detail
            </b-button>
            <b-button
              v-if="props.row.typeBayar === 'KREDIT'"
              v-ripple.400="'rgba(234, 84, 85, 0.15)'"
              v-b-modal.logTrans
              size="sm"
              variant="outline-danger"
              @click="getLogTrans(props.row.transId)"
            >
              Log Pemb.
            </b-button>
          </span>
        </span>

        <!-- Column: Common -->
        <span v-else>
          {{ props.formattedRow[props.column.field] }}
        </span>
      </template>

      <!-- pagination -->
      <template
        slot="pagination-bottom"
        slot-scope="props"
      >
        <div class="d-flex justify-content-between flex-wrap">
          <div class="d-flex align-items-center mb-0 mt-1">
            <span class="text-nowrap">
              Showing 1 to
            </span>
            <b-form-select
              v-model="pageLength"
              :options="['3','5','10','25','50','100']"
              class="mx-1"
              @input="(value)=>props.perPageChanged({currentPerPage:value})"
            />
            <span class="text-nowrap "> of {{ props.total }} entries </span>
          </div>
          <div>
            <b-pagination
              :value="1"
              :total-rows="props.total"
              :per-page="pageLength"
              first-number
              last-number
              align="right"
              prev-class="prev-item"
              next-class="next-item"
              class="mt-1 mb-0"
              @input="(value)=>props.pageChanged({currentPage:value})"
            >
              <template #prev-text>
                <feather-icon
                  icon="ChevronLeftIcon"
                  size="18"
                />
              </template>
              <template #next-text>
                <feather-icon
                  icon="ChevronRightIcon"
                  size="18"
                />
              </template>
            </b-pagination>
          </div>
        </div>
      </template>
    </vue-good-table>

    <!-- Modal Section -->
    <log-modal :transid="selectedTransId" />
  </b-card>
</template>

<script>
import {
  BButton, BPagination, BFormGroup, BFormInput, BFormSelect, BBadge, BCard,
} from 'bootstrap-vue'
import { VueGoodTable } from 'vue-good-table'
import { useRouter } from '@core/utils/utils'
import store from '@/store/index'
import Ripple from 'vue-ripple-directive'
import ApiService from '@/connection/apiService'
import LogModal from './modals/LogModal.vue'

const appService = new ApiService()

export default {
  components: {
    BButton,
    VueGoodTable,
    BPagination,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BBadge,
    BCard,
    LogModal,
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
          label: 'Encoded ID',
          field: 'encodedID',
          hidden: true,
        },
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
            enabled: true,
            filterDropdownItems: ['CASH', 'KREDIT'],
          },
        },
        {
          label: 'Status',
          field: 'status',
          sortable: false,
          filterOptions: {
            enabled: true,
            filterDropdownItems: ['PAID', 'UNPAID'],
          },
        },
        {
          label: 'Action',
          field: 'action',
          sortable: false,
        },
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
    this.$store.commit('appConfig/UPDATE_NAV_MENU_HIDDEN', this.menuHidden)
  },
  created() {
    this.fetchListTransaksi()
    this.$store.commit('appConfig/UPDATE_NAV_MENU_HIDDEN', true)
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
        encodedID: '6fcb7bfa47ac480ebd9cb0a568a6bf4a',
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
    // printLandscape() {
    //   const localOptions = {
    //     styles: [
    //       'https://cdn.jsdelivr.net/npm/vue-good-table@2.18.1/dist/vue-good-table.min.css',
    //       'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
    //       'https://unpkg.com/kidlat-css/css/kidlat.css',
    //     ],
    //   }
    //   this.$htmlToPaper('printTable', localOptions, () => {
    //     console.warn('done')
    //   })
    // },
  },
}
</script>

<style lang="scss">
.vgt-table {
  font-size: 12px !important;
}
</style>
