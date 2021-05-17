<template>
  <b-card>
    <loading-grow v-if="isLoading" />
    <div>
      <b-row>
        <b-col
          lg="6"
          md="6"
          sm="12"
        >
          <b-form-group>
            <b-form-input
              v-model="searchTerm"
              placeholder="Masukkan Kata Pencarian..."
              type="text"
              class="d-inline-block"
            />
          </b-form-group>
        </b-col>
        <b-col
          lg="3"
          md="3"
          sm="12"
        >
          <v-select
            v-model="selectItemV"
            dir="ltr"
            :options="itemsOptions"
            label="text"
            :clearable="false"
            class="mb-2 item-selector-title"
            placeholder="Pilih Toko Bangunan"
          />
        </b-col>
        <b-col
          lg="1"
          md="1"
          sm="12"
        >
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="secondary"
            @click="print"
          >
            Print
          </b-button>
        </b-col>
      </b-row>
    </div>
    <div class="demo-inline-spacing" />
    <!-- table -->
    <vue-good-table
      ref="dataCustomer"
      :columns="columns"
      :rows="rows"
      :rtl="direction"
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
        <span v-if="props.column.field === 'sTransStatus'">
          <span>
            <b-button
              v-ripple.400="'rgba(234, 84, 85, 0.15)'"
              size="sm"
              :variant="statusVariant(props.row.transStatus)"
            >
              {{ props.row.transStatus }}
            </b-button>
          </span>
        </span>

        <span v-if="props.column.field === 'sTransType'">
          <span>
            <b-button
              v-ripple.400="'rgba(234, 84, 85, 0.15)'"
              size="sm"
              :variant="paymentVariant(props.row.transType)"
            >
              {{ props.row.transType }}
            </b-button>
          </span>
        </span>

        <!-- Column: Action -->
        <span v-if="props.column.field === 'action'">
          <span>
            <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              size="sm"
              variant="outline-secondary"
              :to="{ name: 'customer-history-trans', params: { id: props.formattedRow.encodedID } }"
            >
              List Trans.
            </b-button>
            <b-button
              v-if="props.row.sisaHutang > 0"
              v-ripple.400="'rgba(234, 84, 85, 0.15)'"
              size="sm"
              variant="outline-danger"
              @click="pembayaran(props.formattedRow)"
            >
              Bayar
            </b-button>
            <b-button
              v-ripple.400="'rgba(234, 84, 85, 0.15)'"
              size="sm"
              variant="outline-danger"
              @click="editData(props.formattedRow)"
            >
              Edit
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
    <b-card
      id="printMe"
      style="display: none;"
    >
      <!-- Customer Form Section -->
      <div>
        <table width="100%">
          <tbody>
            <tr>
              <td
                width="30%"
              >
                <b-img
                  :src="require('@/assets/images/logo/POSRetailBlack.png')"
                  alt="Logo POS Retail"
                  style="margin-bottom : 20px; width: 100%"
                />
              </td>
              <td width="15%" />
              <td width="25%" />
              <td width="30%" />
            </tr>
          </tbody>
        </table>
        <hr>
      </div>
      <div>
        <table
          width="100%"
          style="font-size: 10px;"
        >
          <thead style="text-align: center;">
            <th width="8%">
              Kode Transaksi
            </th>
            <th width="15%">
              Tanggal
            </th>
            <th width="12%">
              Customer
            </th>
            <th width="15%">
              Kasir
            </th>
            <th width="10%">
              Sub Total
            </th>
            <th width="10%">
              Diskon
            </th>
            <th width="10%">
              Ongkir
            </th>
            <th width="10%">
              Pajak
            </th>
            <th width="10%">
              No referensi
            </th>
            <th width="10%">
              Pembayaran
            </th>
            <th width="10%">
              Status
            </th>
            <th width="10%">
              Toko
            </th>
          </thead>
          <tbody>
            <tr
              v-for="(item) in rows"
              :id="item.id"
              :key="item.id"
              ref="row"
            >
              <td style="text-align: left;">
                {{ item.transCode }}
              </td>
              <td style="text-align: left;">
                {{ item.tglTrans }}
              </td>
              <td style="text-align: center;">
                {{ item.customer }}
              </td>
              <td style="text-align: left;">
                {{ item.cashier }}
              </td>
              <td style="text-align: right;">
                {{ formatPrice(item.subTotalTrans) }}
              </td>
              <td style="text-align: right;">
                {{ formatPrice(item.discountTrans) }}
              </td>
              <td style="text-align: right;">
                {{ formatPrice(item.ongkirTrans) }}
              </td>
              <td style="text-align: right;">
                {{ formatPrice(item.pajakTrans) }}
              </td>
              <td style="text-align: center;">
                <b>{{ item.refNumber }}</b>
              </td>
              <td style="text-align: center;">
                <b>{{ item.transType }}</b>
              </td>
              <td style="text-align: center;">
                <b>{{ item.transStatus }}</b>
              </td>
              <td style="text-align: center;">
                <b>{{ item.toko }}</b>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </b-card>
  </b-card>
</template>

<script>
import {
  BButton, BPagination, BFormGroup, BFormInput, BFormSelect, BCard, BImg, BRow, BCol,
} from 'bootstrap-vue'
import { VueGoodTable } from 'vue-good-table'
import vSelect from 'vue-select'
import store from '@/store/index'
import Ripple from 'vue-ripple-directive'
import ApiService from '@/connection/apiService'
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
    BCard,
    BRow,
    BCol,
    BImg,
    vSelect,
    LoadingGrow,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      custUuid: '',
      customerCode: '',
      remainingDebt: 0,
      paymentID: '',
      paySum: 0,
      selectedType: 1,
      customerName: '',
      customerPhone: 0,
      jagobangunRef: '',
      identityNumber: '',
      customerAddress: '',
      selectedPembayaran: null,
      selectedStatus: null,
      isLoading: false,
      editForm: false,
      tokoBangunanList: [],
      selectedToko: '',
      selectItemV: [{
        value: '',
        text: 'Semua Toko Bangunan',
      }],
      itemsOptions: [
        {
          itemTitle: 'App Design',
          cost: 24,
          qty: 1,
          description: 'Designed UI kit & app pages.',
        },
        {
          itemTitle: 'App Customization',
          cost: 26,
          qty: 1,
          description: 'Customization & Bug Fixes.',
        },
        {
          itemTitle: 'ABC Template',
          cost: 28,
          qty: 1,
          description: 'Bootstrap 4 admin template.',
        },
        {
          itemTitle: 'App Development',
          cost: 32,
          qty: 1,
          description: 'Native App Development.',
        },
      ],
      typeItem: [
        // {
        //   value: null,
        //   text: 'Select Pembayaran',
        //   disabled: true,
        // },
        {
          value: 1,
          text: 'Cash',
        },
        // {
        //   value: 2,
        //   text: 'Transfer',
        // },
        // {
        //   value: 3,
        //   text: 'Gopay',
        // },
      ],
      statusItems: [
        {
          value: null,
          text: 'Semua',
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
          label: 'Kode Transaksi',
          field: 'transCode',
        },
        {
          label: 'Tanggal',
          field: 'tglTrans',
        },
        {
          label: 'Customer',
          field: 'customer',
        },
        {
          label: 'Kasir',
          field: 'cashier',
        },
        {
          label: 'Sub Total',
          field: 'subTotalTrans',
          tdClass: 'text-right',
          formatFn: this.formatPrice,
        },
        {
          label: 'Diskon',
          field: 'discountTrans',
          tdClass: 'text-right',
          formatFn: this.formatPrice,
        },
        {
          label: 'Ongkir',
          field: 'ongkirTrans',
          tdClass: 'text-right',
          formatFn: this.formatPrice,
        },
        {
          label: 'Pajak',
          field: 'pajakTrans',
          tdClass: 'text-right',
          formatFn: this.formatPrice,
        },
        {
          label: 'No. Referensi',
          field: 'refNumber',
        },
        {
          label: 'Pembayaran',
          field: 'sTransType',
          sortable: false,
          // filterOptions: {
          //   enabled: true,
          //   filterDropdownItems: ['CASH', 'KREDIT'],
          // },
        },
        {
          label: 'Status',
          field: 'sTransStatus',
          sortable: false,
          // filterOptions: {
          //   enabled: true,
          //   filterDropdownItems: ['PAID', 'UNPAID'],
          // },
        },
        {
          label: 'Toko',
          field: 'toko',
        },
      ],
      rows: [],
      searchTerm: '',
      selected: 'Cash',
      option: ['Cash', 'Kredit'],
    }
  },
  computed: {
    paymentVariant() {
      const statusColor = {
        CASH: 'outline-secondary',
        KREDIT: 'outline-danger',
      }
      return status => statusColor[status]
    },
    statusVariant() {
      const statusColor = {
        PAID: 'outline-secondary',
        UNPAID: 'outline-danger',
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
  watch: {
    // searchTerm: {
    //   immediate: true,
    //   handler() {
    //     this.fetchCustomerList()
    //   },
    // },
    selectItemV: {
      immediate: true,
      handler() {
        this.fetchCustomerList()
      },
    },
  },
  created() {
    this.getAllToko()
    this.fetchCustomerList()
  },
  methods: {
    print() {
      this.$htmlToPaper('printMe', null, () => {
        console.warn('done')
      })
    },
    formatPrice(value) {
      const val = (value / 1).toFixed(2).replace('.', ',')
      const formatedval = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      return `Rp. ${formatedval}`
    },
    async getAllToko() {
      appService.getTokoList().then(response => {
        const { data } = response.data
        console.log(data)
        this.tokoBangunanList = []
        this.itemsOptions = []
        this.tokoBangunanList.push({
          value: '',
          text: 'Semua Toko Bangunan',
        })
        if (data) {
          data.forEach(item => {
            this.tokoBangunanList.push({
              value: item.id_toko,
              text: item.nama_toko,
            })
          })
        }
        this.itemsOptions = this.tokoBangunanList
      })
    },
    fetchCustomerList() {
      this.isLoading = true
      appService.getAdminSalesList({
        // limit: 50,
        // q: this.searchTerm,
        // id_toko: this.selectedToko ? this.tokoBangunanList.find(list => list.text === this.selectedToko).value : '',
        id_toko: this.selectItemV.value,
      }).then(response => {
        this.rows = []
        const res = response.data
        // console.log(res)
        this.isLoading = false
        const resdata = res.data
        if (resdata) {
          resdata.forEach(this.setupRows)
        }
        // if (res.result) {
        //   const resdata = res.data
        //   if (resdata) {
        //     resdata.forEach(this.setupRows)
        //   }
        // } else {
        //   // this.$bvModal.show('tokenExpired')
        // }
      }).catch(err => {
        console.log(err)
        this.isLoading = false
      })
    },
    setupRows(data) {
      const res = {
        encodedID: data.uuid,
        transCode: data.kode_transaksi,
        customer: data.nama_customer,
        cashier: data.kasir.nama,
        refNumber: data.no_references,
        transStatus: data.status,
        transType: data.payment_type_str,
        subTotalTrans: data.sub_total,
        discountTrans: data.discount,
        ongkirTrans: data.shipping,
        pajakTrans: data.tax,
        tglTrans: data.date_transaction,
        toko: data.toko.nama_toko,
      }
      this.rows.push(res)
    },
    refreshTable() {
      this.rows = []
      this.fetchCustomerList()
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>

<style lang="scss" scoped>
.vgt-table {
  font-size: 10px !important;
}
.v-select {
  &.item-selector-title,
  &.payment-selector {
    background-color: #fff;

    .dark-layout & {
      background-color: unset;
    }
  }
}
</style>
