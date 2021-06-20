<template>
  <b-card>
    <loading-grow v-if="isLoading" />
    <div id="NoprintTable">
      <b-row>
        <b-col
          lg="2"
          md="3"
          sm="12"
        >
          <label
            class="mr-1"
            style="font-size: 16px; font-weight: bold;"
          >Pencarian :</label>
        </b-col>
        <b-col
          lg="6"
          md="6"
          sm="12"
        >
          <b-form-input
            v-model="searchTerm"
            placeholder="Masukkan kata kunci pencarian disini"
            type="text"
            class="d-inline-block"
            style="margin-bottom : 10px;"
          />
        </b-col>
        <b-col
          lg="2"
          md="3"
          sm="12"
        >
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="danger"
            @click="cetakDataJual"
          >
            Print
          </b-button>
        </b-col>
      </b-row>
      <br>

      <!-- table -->
      <vue-good-table
        id="printTable"
        ref="dataJual"
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
        :sort-options="{
          enabled: true,
          initialSortBy: {field: 'date', type: 'desc'}
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
                  :to="{name: 'user-trans-detail', params: {id: props.row.id}}"
                >
                  <feather-icon
                    icon="FileTextIcon"
                    class="mr-50"
                  />
                  <span>Detail</span>
                </b-dropdown-item>
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
      <!-- table -->
    </div>
    <div
      id="printData"
      class="container"
      style="display : none;"
    >
      <div
        class="row"
        style="margin-bottom: 25px"
      >
        <div class="col-md-3">
          <b-img
            v-if="userData.avatar"
            :src="userData.avatar"
            alt="Logo POS Retail"
            style="margin-bottom : 20px; width: 100%;"
          />
          <b-img
            v-else
            :src="require('@/assets/images/logo/POSRetailBlack.png')"
            alt="Logo POS Retail"
            style="margin-bottom : 20px; width: 100%"
          />
        </div>
        <div class="col-md-9">
          <table width="100%">
            <tbody>
              <tr>
                <td>
                  Nama Toko
                </td>
                <td>:</td>
                <td style="padding-left: 5%">
                  {{ userData.shopName }}
                </td>
              </tr>
              <tr>
                <td>
                  No. Telp
                </td>
                <td>:</td>
                <td style="padding-left: 5%">
                  {{ userData.shopNumber }}
                </td>
              </tr>
              <tr>
                <td>
                  Alamat
                </td>
                <td>:</td>
                <td style="padding-left: 5%">
                  {{ userData.ownerAddress }}
                </td>
              </tr>
              <tr>
                <td>
                  Tanggal Cetak
                </td>
                <td>:</td>
                <td style="padding-left: 5%">
                  {{ printDate }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <table
        width="100%"
        border="1"
      >
        <thead style="text-align: center; background: #efefef !important;">
          <th>Kode Penjualan</th>
          <th>Tanggal</th>
          <th>Customer</th>
          <th>Kode Ref.</th>
          <th>Kasir</th>
          <th>Subtotal</th>
          <th>Diskon</th>
          <th>Ongkos Kirim</th>
          <!-- <th>Pajak</th> -->
          <th>Tipe Pembayaran</th>
          <th>Status</th>
        </thead>
        <tbody style="font-size: 11px;">
          <tr
            v-for="(item) in dataJual"
            :id="item.id"
            :key="item.id"
          >
            <td>
              {{ item.saleCode }}
            </td>
            <td>
              {{ item.date }}
            </td>
            <td>{{ item.customer }}</td>
            <td style="text-align: center">
              {{ item.ref }}
            </td>
            <td>{{ item.biller }}</td>
            <td style="text-align: right">
              {{ formatPrice(item.subtotal) }}
            </td>
            <td style="text-align: right">
              {{ formatPrice(item.disc) }}
            </td>
            <td style="text-align: right">
              {{ formatPrice(item.ship) }}
            </td>
            <!-- <td style="text-align: right">
              {{ formatPrice(item.tax) }}
            </td> -->
            <td style="text-align: center">
              {{ item.typePayment }}
            </td>
            <td style="text-align: center">
              {{ item.paymentStatus }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <alert-token />
  </b-card>
</template>

<script>
import {
  BRow, BCol, BButton, BPagination, BFormInput, BFormSelect, BDropdown, BDropdownItem, BBadge, BCard, BImg,
} from 'bootstrap-vue'
import { VueGoodTable } from 'vue-good-table'
import store from '@/store/index'
import Ripple from 'vue-ripple-directive'
import ApiService from '@/connection/apiService'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import LoadingGrow from '@core/components/loading-process/LoadingGrow.vue'
import AlertToken from '@core/components/expired-token/AlertToken.vue'

const appService = new ApiService()

export default {
  components: {
    BRow,
    BCol,
    BImg,
    BButton,
    VueGoodTable,
    BPagination,
    // BFormGroup,
    BFormInput,
    BFormSelect,
    BDropdown,
    BDropdownItem,
    BBadge,
    BCard,
    LoadingGrow,
    AlertToken,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      userData: null,
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
          type: 'number',
          tdClass: 'text-right',
          formatFn: this.formatPrice,
        },
        {
          label: 'Diskon',
          field: 'disc',
          type: 'number',
          tdClass: 'text-right',
          formatFn: this.formatPrice,
        },
        {
          label: 'Ongkos Kirim',
          field: 'ship',
          type: 'number',
          tdClass: 'text-right',
          formatFn: this.formatPrice,
        },
        /* {
          label: 'Pajak',
          field: 'tax',
          tdClass: 'text-right',
          formatFn: this.formatPrice,
        }, */
        {
          label: 'Grand Total',
          field: 'grandtotal',
          type: 'number',
          tdClass: 'text-right',
          formatFn: this.formatPrice,
        },
        {
          label: 'Pembayaran',
          field: 'typePayment',
          filterOptions: {
            enabled: true,
            filterDropdownItems: ['CASH', 'KREDIT'],
          },
        },
        {
          label: 'Status',
          field: 'paymentStatus',
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
      dataJual: [],
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
  created() {
    this.getDataUser()
    this.fetchSalesList()
  },
  methods: {
    getWaktuCetak() {
      const currentdate = new Date()
      const tanggal = parseInt(currentdate.getDate(), 10) < 10 ? `0${currentdate.getDate()}` : currentdate.getDate()
      const bulan = parseInt(currentdate.getMonth() + 1, 10) < 10 ? `0${currentdate.getMonth() + 1}` : currentdate.getMonth() + 1
      const tahun = parseInt(currentdate.getFullYear(), 10) < 10 ? `0${currentdate.getFullYear()}` : currentdate.getFullYear()
      const jam = parseInt(currentdate.getHours(), 10) < 10 ? `0${currentdate.getHours()}` : currentdate.getHours()
      const menit = parseInt(currentdate.getMinutes(), 10) < 10 ? `0${currentdate.getMinutes()}` : currentdate.getMinutes()
      const detik = parseInt(currentdate.getSeconds(), 10) < 10 ? `0${currentdate.getSeconds()}` : currentdate.getSeconds()
      // console.log(`${tahun}-${bulan}-${tanggal} ${jam}:${menit}:${detik}`)
      return `${tahun}-${bulan}-${tanggal} ${jam}:${menit}:${detik}`
    },
    getDataUser() {
      const userData = JSON.parse(localStorage.getItem('userData'))
      this.userData = userData
      const timeElapsed = Date.now()
      const today = new Date(timeElapsed)
      // this.printDate  = today.toUTCString()
      console.log(today.toUTCString())
      this.printDate = this.getWaktuCetak()
    },
    cetakDataJual() {
      this.isLoading = true
      const { selectedRows } = this.$refs.dataJual
      if (selectedRows.length < 1) {
        this.dataJual = this.rows
        // this.$router.push({ name: 'user-sale-print', params: { dataJual: this.rows } })
      } else {
        this.dataJual = selectedRows
        // this.$router.push({ name: 'user-sale-print', params: { dataJual: selectedRows } })
      }
      this.isLoading = false
      setTimeout(() => {
        window.print()
        // this.printLandscape()
      }, 2000)
    },
    printLandscape() {
      const localOptions = {
        styles: [
          'https://cdn.jsdelivr.net/npm/vue-good-table@2.18.1/dist/vue-good-table.min.css',
          'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
          'https://unpkg.com/kidlat-css/css/kidlat.css',
        ],
      }
      this.$htmlToPaper('printData', localOptions, () => {
        console.warn('done')
      })
    },
    formatPrice(value) {
      const val = (value / 1).toFixed(0).replace('.', ',')
      const formatedval = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      return `Rp. ${formatedval}`
    },
    fetchSalesList() {
      this.isLoading = true
      appService.getSales({
        limit: 10,
        page: 1,
      }).then(response => {
        const { data } = response
        const res = response.data.data
        this.isLoading = false
        if (data.result) {
          if (res.length > 0) {
            res.forEach(this.setupRows)
          } else {
            this.$toast({
              component: ToastificationContent,
              position: 'top-right',
              props: {
                title: 'Belum Ada Data',
                icon: 'CoffeeIcon',
                variant: 'success',
                text: 'Data Tidak Ditemukan, Belum Ada Transaksi atau Mungkin Terjadi Kesalahan',
              },
            })
          }
        } else {
          this.$bvModal.show('tokenExpired')
        }
      }).catch(err => {
        console.log(err)
        this.isLoading = false
      })
    },
    setupRows(data) {
      const res = {
        id: data.uuid,
        // date: data.date_transaction,
        date: data.created_at,
        saleCode: data.kode_transaksi,
        ref: data.no_references ?? '-',
        biller: data.kasir.nama,
        customer: data.nama_customer ?? '-',
        subtotal: parseInt(data.sub_total, 10),
        disc: parseInt(data.discount, 10),
        ship: parseInt(data.shipping, 10),
        tax: parseInt(data.tax, 10),
        grandtotal: (parseInt(data.sub_total, 10) + parseInt(data.tax, 10) + parseInt(data.shipping, 10)) - parseInt(data.discount, 10),
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

<style lang="scss">
@media print {

  // Global Styles
  body {
    background-color: transparent !important;
    // width: 80mm;
    // height: 100mm;
  }
  .btn-scroll-to-top, .content-header, .bt-print, .horizontal-menu-wrapper, #NoprintTable {
    display: none !important;
  }
  #printData {
    display: block !important;
    margin-top: -100px;
  }
  nav.header-navbar {
    display: none;
  }
  .header-navbar-shadow {
    display: none !important;
  }
  .printstruck {
    margin-top: -100px;
  }
  footer.footer {
    display: none;
  }
  .card {
    background-color: transparent;
    box-shadow: none;
  }
  .customizer-toggle {
    display: none !important;
  }
}
</style>
