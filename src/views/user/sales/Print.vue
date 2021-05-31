<template>
  <div>
    <!-- Action Button Section -->
    <div>
      <b-row>
        <b-col />
        <b-col />
        <b-col />
        <b-col
          cols="12"
          md="2"
        >
          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            variant="primary"
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

      <!-- table -->
      <div class="container">
        <table
          width="100%"
          style="overflow-x: auto;"
        >
          <thead style="text-align: center">
            <th>Kode Penjualan</th>
            <th>Tanggal</th>
            <th>Customer</th>
            <th>Kode Ref.</th>
            <th>Kasir</th>
            <th>Subtotal</th>
            <th>Diskon</th>
            <th>Ongkos Kirim</th>
            <th>Pajak</th>
            <th>Tipe Pembayaran</th>
            <th>Status</th>
          </thead>
          <tbody>
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
              <td style="text-align: right">
                {{ formatPrice(item.tax) }}
              </td>
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
    </b-card>
  </div>
</template>

<script>
import {
  BCard, BButton, BRow, BCol, BImg,
} from 'bootstrap-vue'
import store from '@/store/index'
import Ripple from 'vue-ripple-directive'
import LoadingGrow from '@core/components/loading-process/LoadingGrow.vue'

export default {
  components: {
    BButton,
    BCard,
    LoadingGrow,
    BRow,
    BCol,
    BImg,
  },
  directives: {
    Ripple,
  },
  props: {
    dataJual: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selectedPembayaran: null,
      selectedStatus: null,
      isLoading: false,
      pageLength: 10,
      dir: false,
      userData: null,
      printDate: null,
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
    this.setDataTable()
    this.getDataUser()
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
    setDataTable() {
      console.log(this.dataJual)
      this.dataJual.forEach(x => {
        this.rows.push(x)
      })
    },
    formatPrice(value) {
      const val = (value / 1).toFixed(2).replace('.', ',')
      const formatedval = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      return `Rp. ${formatedval}`
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
