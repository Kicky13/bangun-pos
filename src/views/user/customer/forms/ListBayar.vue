<template>
  <b-card>
    <loading-grow v-if="isLoading" />
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
          @click="cetakDataCustomer"
        >
          Print
        </b-button>
      </div>
    </div>

    <!-- table -->
    <vue-good-table
      ref="dataCustomer"
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
    <alert-token />
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
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import LoadingGrow from '@core/components/loading-process/LoadingGrow.vue'
import AlertToken from '@core/components/expired-token/AlertToken.vue'
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
    LoadingGrow,
    AlertToken,
  },
  directives: {
    // 'b-modal': VBModal,
    Ripple,
  },
  data() {
    return {
      isLoading: false,
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
          tdClass: 'text-right',
          formatFn: this.formatPrice,
        },
        {
          label: 'Diskon',
          field: 'diskon',
          tdClass: 'text-right',
          formatFn: this.formatPrice,
        },
        {
          label: 'Pajak',
          field: 'pajak',
          tdClass: 'text-right',
          formatFn: this.formatPrice,
        },
        {
          label: 'Ongkir',
          field: 'ongkir',
          tdClass: 'text-right',
          formatFn: this.formatPrice,
        },
        {
          label: 'Grand Total',
          field: 'grandtotal',
          tdClass: 'text-right',
          formatFn: this.formatPrice,
        },
        {
          label: 'Pembayaran',
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
    cetakDataCustomer() {
      const { selectedRows } = this.$refs.dataCustomer
      if (selectedRows.length < 1) {
        this.$router.push({ name: 'customer-history-trans-print', params: { dataCustomer: this.rows } })
      } else {
        this.$router.push({ name: 'customer-history-trans-print', params: { dataCustomer: selectedRows } })
      }
    },
    formatPrice(value) {
      const val = (value / 1).toFixed(2).replace('.', ',')
      const formatedval = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      return `Rp. ${formatedval}`
    },
    getLogTrans(transid) {
      this.selectedTransId = transid
    },
    fetchListTransaksi() {
      this.isLoading = true
      appService.historyList({ id_customer: this.customerID }).then(response => {
        const datares = response.data.data
        const { data } = response
        this.isLoading = false
        if (data.result) {
          if (datares) {
            datares.forEach(this.setRows)
          } else {
            this.$toast({
              component: ToastificationContent,
              position: 'top-right',
              props: {
                title: 'Data Tidak Ditemukan',
                icon: 'CoffeeIcon',
                variant: 'danger',
                text: 'Data Tidak Ditemukan, Mungkin Terjadi Kesalahan',
              },
            })
          }
        } else {
          this.$bvModal.show('tokenExpired')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    setRows(data) {
      const res = {
        transId: data.id,
        saleCode: data.kode_transaksi,
        customer: data.customer.nama ?? '-',
        refCode: data.no_references ?? '-',
        subTotal: parseInt(data.sub_total, 10),
        diskon: parseInt(data.discount, 10),
        pajak: parseInt(data.pajak, 10),
        ongkir: parseInt(data.ongkir, 10),
        grandtotal: (parseInt(data.sub_total, 10) + parseInt(data.pajak, 10) + parseInt(data.ongkir, 10)) - parseInt(data.discount, 10),
        typeBayar: data.type_pembayaran,
        status: data.status,
      }
      this.rows.push(res)
    },
  },
}
</script>

<style lang="scss">
.vgt-table {
  font-size: 12px !important;
}
</style>
