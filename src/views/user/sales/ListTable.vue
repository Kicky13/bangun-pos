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
      <div style="float:left;width: 200px !important; margin-left:10px;">
        <b-form-group>
          <b-form-select
            id="pembayaran"
            v-model="selectedPembayaran"
            :options="pembayaranItems"
          />
        </b-form-group>
      </div>
      <div style="float:left;width: 200px !important; margin-left:10px;">
        <b-form-group>
          <b-form-select
            id="status"
            v-model="selectedStatus"
            :options="statusItems"
          />
        </b-form-group>
      </div>
      <div style="float:left;margin-left:10px;">
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          variant="danger"
          style="margin-top: -15px;"
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

        <!-- Column: Action -->
        <span v-else-if="props.column.field === 'action'">
          <span>
            <b-dropdown
              variant="link"
              toggle-class="text-decoration-none"
              no-caret
            >
              <template v-slot:button-content>
                <feather-icon
                  icon="MoreVerticalIcon"
                  size="16"
                  class="text-body align-middle mr-25"
                />
              </template>
              <b-dropdown-item
                :to="{name: 'detail-user-sale', params: {id: props.row.id}}"
              >
                <feather-icon
                  icon="FileTextIcon"
                  class="mr-50"
                />
                <span>Detail</span>
              </b-dropdown-item>
              <!-- <b-dropdown-item>
                <feather-icon
                  icon="Edit2Icon"
                  class="mr-50"
                />
                <span>Edit</span>
              </b-dropdown-item>
              <b-dropdown-item>
                <feather-icon
                  icon="TrashIcon"
                  class="mr-50"
                />
                <span>Delete</span>
              </b-dropdown-item> -->
            </b-dropdown>
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

  </b-card>
</template>

<script>
import {
  BButton, BPagination, BFormGroup, BFormInput, BFormSelect, BDropdown, BDropdownItem, BBadge, BCard,
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
    BPagination,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BDropdown,
    BDropdownItem,
    BBadge,
    BCard,
    LoadingGrow,
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
          label: 'Pembayaran',
          field: 'typePayment',
        },
        {
          label: 'Status',
          field: 'paymentStatus',
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
        LUNAS: 'light-secondary',
        UTANG: 'light-primary',
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
  created() {
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
        status: 'paid',
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
          this.$http.get('/app-data/salesUser')
            .then(resData => { this.rows = resData.data })
        }
      }).catch(err => {
        console.log(err)
        this.isLoading = false
      })
    },
    setupRows(data) {
      const res = {
        date: data.date_transaction,
        saleCode: data.kode_transaksi,
        ref: data.no_references,
        biller: data.kasir,
        customer: data.customer.nama_customer,
        subtotal: data.sub_total,
        disc: data.discount,
        ship: data.shipping,
        tax: data.tax,
        typePayment: data.payment_type_str,
        paymentStatus: data.status,
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
