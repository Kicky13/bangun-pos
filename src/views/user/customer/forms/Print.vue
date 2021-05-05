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
            :to="{name: 'user-customer'}"
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
            style="margin-bottom : 20px; width: 50%;"
          />
          <b-img
            v-else
            :src="require('@/assets/images/logo/POSRetailBlack.png')"
            alt="Logo POS Retail"
            style="margin-bottom : 20px; width: 50%"
          />
        </div>
        <div style="col-md-9">
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
      <table width="100%">
        <thead style="text-align: center;">
          <th>Kode Penjualan</th>
          <th>Customer</th>
          <th>Ref. Code</th>
          <th>Sub. Total</th>
          <th>Diskon</th>
          <th>Pajak</th>
          <th>Ongkir</th>
          <th>Type Pembayaran</th>
          <th>Status</th>
        </thead>
        <tbody>
          <tr
            v-for="(item) in dataCustomer"
            :id="item.transId"
            :key="item.transId"
            ref="row"
          >
            <td>
              {{ item.saleCode }}
            </td>
            <td>
              {{ item.customer }}
            </td>
            <td style="text-align: center">
              {{ item.refCode }}
            </td>
            <td>
              {{ formatPrice(item.subTotal) }}
            </td>
            <td>
              {{ formatPrice(item.diskon) }}
            </td>
            <td>
              {{ formatPrice(item.pajak) }}
            </td>
            <td>
              {{ formatPrice(item.ongkir) }}
            </td>
            <td style="text-align: center">
              {{ item.typeBayar }}
            </td>
            <td style="text-align: center">
              {{ item.status }}
            </td>
          </tr>
        </tbody>
      </table>
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
    BRow,
    BCol,
    LoadingGrow,
    BImg,
  },
  directives: {
    Ripple,
  },
  props: {
    dataCustomer: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selectedPembayaran: null,
      selectedStatus: null,
      isLoading: false,
      userData: null,
      printDate: null,
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
    this.setDataTable()
    this.getDataUser()
  },
  methods: {
    getDataUser() {
      const userData = JSON.parse(localStorage.getItem('userData'))
      this.userData = userData
      const timeElapsed = Date.now()
      const today = new Date(timeElapsed)
      this.printDate = today.toUTCString()
    },
    setDataTable() {
      console.log(this.dataCustomer)
      this.dataCustomer.forEach(x => {
        this.rows.push(x)
      })
    },
    formatPrice(value) {
      const val = (value / 1).toFixed(2).replace('.', ',')
      const formatedval = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      return `Rp. ${formatedval}`
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
