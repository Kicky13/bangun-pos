<template>
  <div>
    <b-row align-h="center">
      <b-col
        cols="12"
        lg="4"
      >
        <b-card id="printReceipt">
          <!-- Customer Form Section -->
          <div>
            <table width="100%">
              <tbody>
                <tr>
                  <td colspan="2">
                    <b-img
                      :src="require('@/assets/images/logo/POSRetailBlack.png')"
                      alt="Logo POS Retail"
                      style="margin-bottom : 20px; width: 100%"
                    />
                  </td>
                </tr>
                <tr>
                  <td width="40%">
                    Kode Penjualan
                  </td>
                  <td width="60%">
                    : {{ dataPenjualan.saleCode }}
                  </td>
                </tr>
                <tr>
                  <td width="40%">
                    Customer
                  </td>
                  <td width="60%">
                    : {{ dataPenjualan.customer }}
                  </td>
                </tr>
                <tr>
                  <td width="40%">
                    No referensi
                  </td>
                  <td width="60%">
                    : {{ dataPenjualan.biller }}
                  </td>
                </tr>
                <tr>
                  <td width="40%">
                    Kasir
                  </td>
                  <td width="60%">
                    : {{ dataPenjualan.ref }}
                  </td>
                </tr>
              </tbody>
            </table>
            <hr>
          </div>
          <!-- End Customer Form Section -->

          <!-- Cart Section -->
          <div>
            <table width="100%">
              <thead style="text-align: center;">
                <th width="30%">
                  Barang
                </th>
                <th width="25%">
                  Harga
                </th>
                <th width="15%">
                  Jum.
                </th>
                <th width="30%">
                  Sub Total
                </th>
              </thead>
              <tbody>
                <tr
                  v-for="(item) in items"
                  :id="item.id"
                  :key="item.id"
                  ref="row"
                >
                  <td style="text-align: left;">
                    {{ item.name }} (<b>{{ item.uom }}</b>)
                  </td>
                  <td style="text-align: right;">
                    {{ item.price }}
                  </td>
                  <td style="text-align: center;">
                    {{ item.quantity }}
                  </td>
                  <td style="text-align: right;">
                    <b>{{ item.price * item.quantity }}</b>
                  </td>
                </tr>
                <tr>
                  <td
                    colspan="2"
                    style="text-align: right;"
                  >
                    Jumlah Barang :
                  </td>
                  <td
                    colspan="2"
                    style="text-align: right;"
                  >
                    <b>4 (4)</b>
                  </td>
                </tr>
                <tr>
                  <td
                    colspan="2"
                    style="text-align: right;"
                  >
                    <b>Sub Total :</b>
                  </td>
                  <td
                    colspan="2"
                    style="text-align: right;"
                  >
                    <b>{{ dataPenjualan.subtotal }}</b>
                  </td>
                </tr>
                <tr>
                  <td
                    colspan="2"
                    style="text-align: right;"
                  >
                    <b>Diskon :</b>
                  </td>
                  <td
                    colspan="2"
                    style="text-align: right;"
                  >
                    <b>{{ dataPenjualan.disc }}</b>
                  </td>
                </tr>
                <tr>
                  <td
                    colspan="2"
                    style="text-align: right;"
                  >
                    <b>Pajak :</b>
                  </td>
                  <td
                    colspan="2"
                    style="text-align: right;"
                  >
                    <b>{{ dataPenjualan.tax }}</b>
                  </td>
                </tr>
                <tr>
                  <td
                    colspan="2"
                    style="text-align: right;"
                  >
                    <b>Ongkos Kirim :</b>
                  </td>
                  <td
                    colspan="2"
                    style="text-align: right;"
                  >
                    <b>{{ dataPenjualan.ship }}</b>
                  </td>
                </tr>
                <tr>
                  <td
                    colspan="2"
                    style="text-align: right;"
                  >
                    <b>Grand Total :</b>
                  </td>
                  <td
                    colspan="2"
                    style="text-align: right;"
                  >
                    <b>{{ dataPenjualan.subtotal }}</b>
                  </td>
                </tr>
                <tr>
                  <td
                    colspan="2"
                    style="text-align: right;"
                  >
                    <b>Tipe Pembayaran :</b>
                  </td>
                  <td
                    colspan="2"
                    style="text-align: right;"
                  >
                    <b>{{ dataPenjualan.typePayment }}</b>
                  </td>
                </tr>
                <tr>
                  <td
                    colspan="2"
                    style="text-align: right;"
                  >
                    No. Pembayaran :
                  </td>
                  <td
                    colspan="2"
                    style="text-align: right;"
                  >
                    xxxx-xxx-xx-x
                  </td>
                </tr>
                <tr>
                  <td
                    colspan="2"
                    style="text-align: right;"
                  >
                    <b>Bayar :</b>
                  </td>
                  <td
                    colspan="2"
                    style="text-align: right;"
                  >
                    <b>{{ dataPenjualan.ship }}</b>
                  </td>
                </tr>
                <tr>
                  <td
                    colspan="2"
                    style="text-align: right;"
                  >
                    <b>Kembalian :</b>
                  </td>
                  <td
                    colspan="2"
                    style="text-align: right;"
                  >
                    <b>{{ dataPenjualan.ship }}</b>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <hr>
          <div>
            <table width="100%">
              <tbody style="text-align: center;">
                <tr>
                  <td width="50%">
                    Telp : 082173288382
                  </td>
                  <td width="50%">
                    Cetak : 2021-01-01
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                    <h1>UD. Kekar Jaya Beton</h1>
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                    Rt. 001/ Rw. 004 Dsn. Kebonsari Ds. Palangan Kec. Karangbinangun
                  </td>
                </tr>
              </tbody>
            </table>
            <hr>
          </div>
          <!-- End Cart Section -->
        </b-card>
      </b-col>
      <b-col
        cols="12"
        lg="8"
      >
        <b-card id="printMe">
          <!-- Customer Form Section -->
          <div>
            <table width="100%">
              <tbody>
                <tr>
                  <td
                    rowspan="4"
                    width="30%"
                  >
                    <b-img
                      :src="require('@/assets/images/logo/POSRetailBlack.png')"
                      fluid
                      alt="Logo POS Retail"
                      style="margin-bottom : 20px; padding: 10px;"
                    />
                  </td>
                  <td
                    rowspan="4"
                    width="20%"
                  />
                  <td width="25%">
                    Kode Penjualan
                  </td>
                  <td width="25%">
                    : {{ dataPenjualan.saleCode }}
                  </td>
                </tr>
                <tr>
                  <td>
                    Customer
                  </td>
                  <td>
                    : {{ dataPenjualan.customer }}
                  </td>
                </tr>
                <tr>
                  <td>
                    No referensi
                  </td>
                  <td>
                    : {{ dataPenjualan.biller }}
                  </td>
                </tr>
                <tr>
                  <td>
                    Kasir
                  </td>
                  <td>
                    : {{ dataPenjualan.ref }}
                  </td>
                </tr>
              </tbody>
            </table>
            <hr>
          </div>
          <div>
            <table width="100%">
              <thead style="text-align: center;">
                <th width="30%">
                  Barang
                </th>
                <th width="25%">
                  Harga
                </th>
                <th width="15%">
                  Jum.
                </th>
                <th width="30%">
                  Sub Total
                </th>
              </thead>
              <tbody>
                <tr
                  v-for="(item) in items"
                  :id="item.id"
                  :key="item.id"
                  ref="row"
                >
                  <td style="text-align: left;">
                    {{ item.name }} (<b>{{ item.uom }}</b>)
                  </td>
                  <td style="text-align: right;">
                    {{ item.price }}
                  </td>
                  <td style="text-align: center;">
                    {{ item.quantity }}
                  </td>
                  <td style="text-align: right;">
                    <b>{{ item.price * item.quantity }}</b>
                  </td>
                </tr>
                <tr>
                  <td
                    colspan="3"
                    style="text-align: right;"
                  >
                    Jumlah Barang :
                  </td>
                  <td style="text-align: right;">
                    <b>4 (4)</b>
                  </td>
                </tr>
                <tr>
                  <td
                    colspan="3"
                    style="text-align: right;"
                  >
                    <b>Sub Total :</b>
                  </td>
                  <td style="text-align: right;">
                    <b>{{ dataPenjualan.subtotal }}</b>
                  </td>
                </tr>
                <tr>
                  <td
                    colspan="3"
                    style="text-align: right;"
                  >
                    <b>Diskon :</b>
                  </td>
                  <td style="text-align: right;">
                    <b>{{ dataPenjualan.disc }}</b>
                  </td>
                </tr>
                <tr>
                  <td
                    colspan="3"
                    style="text-align: right;"
                  >
                    <b>Pajak :</b>
                  </td>
                  <td style="text-align: right;">
                    <b>{{ dataPenjualan.tax }}</b>
                  </td>
                </tr>
                <tr>
                  <td
                    colspan="3"
                    style="text-align: right;"
                  >
                    <b>Ongkos Kirim :</b>
                  </td>
                  <td style="text-align: right;">
                    <b>{{ dataPenjualan.ship }}</b>
                  </td>
                </tr>
                <tr>
                  <td
                    colspan="3"
                    style="text-align: right;"
                  >
                    <b>Grand Total :</b>
                  </td>
                  <td style="text-align: right;">
                    <b>{{ dataPenjualan.subtotal }}</b>
                  </td>
                </tr>
                <tr>
                  <td
                    colspan="3"
                    style="text-align: right;"
                  >
                    <b>Tipe Pembayaran :</b>
                  </td>
                  <td style="text-align: right;">
                    <b>{{ dataPenjualan.typePayment }}</b>
                  </td>
                </tr>
                <tr>
                  <td
                    colspan="3"
                    style="text-align: right;"
                  >
                    No. Pembayaran :
                  </td>
                  <td style="text-align: right;">
                    xxxx-xxxx-xx-xx
                  </td>
                </tr>
                <tr>
                  <td
                    colspan="3"
                    style="text-align: right;"
                  >
                    <b>Bayar :</b>
                  </td>
                  <td style="text-align: right;">
                    <b>{{ dataPenjualan.ship }}</b>
                  </td>
                </tr>
                <tr>
                  <td
                    colspan="3"
                    style="text-align: right;"
                  >
                    <b>Kembalian :</b>
                  </td>
                  <td style="text-align: right;">
                    <b>{{ dataPenjualan.ship }}</b>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <hr>
          <div>
            <table width="100%">
              <tbody style="text-align: center;">
                <tr>
                  <td width="50%">
                    Telp : 082173288382
                  </td>
                  <td width="50%">
                    Cetak : 2021-01-01
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                    <h1>UD. Kekar Jaya Beton</h1>
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                    Rt. 001/ Rw. 004 Dsn. Kebonsari Ds. Palangan Kec. Karangbinangun
                  </td>
                </tr>
              </tbody>
            </table>
            <hr>
          </div>
        </b-card>
        <!-- Action Button Section -->
        <div>
          <b-row>
            <b-col
              cols="12"
              md="3"
            />
            <b-col
              cols="12"
              md="3"
            >
              <b-button
                v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                class="mb-1"
                block
                @click="print"
              >
                Cetak
              </b-button>
            </b-col>
            <b-col
              cols="12"
              md="3"
            >
              <b-button
                v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                class="mb-1"
                block
                @click="printLandscape"
              >
                Cetak Invoice
              </b-button>
            </b-col>
            <b-col
              cols="12"
              md="3"
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
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {
  BRow, BCol, BCard, BButton, VBModal, BImg, // BForm, BFormGroup, BFormInput, BAlert, BFormSelect, BInputGroup,
} from 'bootstrap-vue'
import { heightTransition } from '@core/mixins/ui/transition'
import Ripple from 'vue-ripple-directive'
// import someStyle from '@/assets/scss/print/landscape.css'

export default {
  components: {
    BRow,
    BCol,
    // BForm,
    // BFormGroup,
    // BFormInput,
    BButton,
    // BAlert,
    // BFormSelect,
    // BInputGroup,
    BCard,
    BImg,
    // someStyle,
  },
  directives: {
    Ripple,
    'b-modal': VBModal,
  },
  mixins: [heightTransition],
  data() {
    return {
      dataPenjualan: null,
      // eslint-disable-next-line global-require
      logoImg: require('@/assets/images/logo/POSRetailBlack.png'),
      // eslint-disable-next-line global-require
      // paperInvoice: require('@/assets/scss/print/landscape.css'),
      // eslint-disable-next-line global-require
      // paperReceipt: require('@/assets/scss/print/landscape.css'),
      cashierItems: [
        {
          value: null,
          text: 'Pilih Kasir',
          disabled: true,
        },
        {
          value: 'Kasir 01',
          text: 'Kasir 01',
        },
        {
          value: 'Kasir 02',
          text: 'Kasir 02',
        },
        {
          value: 'Kasir 03',
          text: 'Kasir 03',
        },
      ],
      methodBayar: [{
        value: null,
        text: 'Pilih salah satu metode pembayaran',
        disabled: true,
      },
      {
        value: 'CASH',
        text: 'Cash',
      },
      {
        value: 'TRANSFER',
        text: 'Transfer Bank',
      },
      {
        value: 'GOPAY',
        text: 'Gopay',
      },
      {
        value: 'KREDIT',
        text: 'Kredit',
      }],
      items: [{
        id: 20200001909,
        name: 'Google - Google Home - White/Slate fabric',
        stock: 50,
        uom: '50 KG',
        quantity: 10,
        price: 34,
        subtotal: 340,
      }, {
        id: 20200001910,
        name: 'Apple Watch Series 4 GPS',
        stock: 50,
        uom: '50 KG',
        quantity: 2,
        price: 22,
        subtotal: 44,
      }, {
        id: 20200001911,
        name: 'Apple Macbook Air Latest Version',
        stock: 50,
        uom: '50 KG',
        quantity: 3,
        price: 110,
        subtotal: 330,
      }, {
        id: 20200001912,
        name: 'Beats Headphone',
        stock: 50,
        uom: '50 KG',
        quantity: 21,
        price: 12,
        subtotal: 252,
      }],
      warehouses: [{
        value: null,
        text: 'Select a Warehouse',
        disabled: true,
      },
      {
        value: 'Gresik',
        text: 'Gresik',
      },
      {
        value: 'Tuban',
        text: 'Tuban',
      },
      {
        value: 'Jakarta',
        text: 'Text',
      },
      {
        value: 'Padang',
        text: 'Padang',
      }],
      billers: [{
        value: null,
        text: 'Select a Biller',
        disabled: true,
      },
      {
        value: 673627,
        text: '673627 - Warehouse Gresik',
      },
      {
        value: 677289,
        text: '677289 - Warehouse Tuban',
      },
      {
        value: 678298,
        text: '678298 - Warehouse - Jakarta',
      },
      {
        value: 698983,
        text: '698983 - Warehouse Padang',
      }],
      customers: [{
        value: null,
        text: 'Walk-in Customer',
        disabled: true,
      },
      {
        value: 'Munib',
        text: 'Munib',
      },
      {
        value: 'Robiyanto',
        text: 'Robiyanto',
      },
      {
        value: 'Kikik',
        text: 'Kikik',
      }],
      nextTodoId: 2,
      kategori: [{
        value: null,
        text: 'Select Kategori',
        disabled: true,
      },
      {
        value: 'kategori1',
        text: 'Kategori 1',
      },
      {
        value: 'kategori2',
        text: 'Kategori 2',
      },
      {
        value: 'kategori3',
        text: 'Kategori 3',
      }],
      subKategori: [{
        value: null,
        text: 'Select a Sub Kategori',
        disabled: true,
      },
      {
        value: 'subKategori1',
        text: 'Sub Kategori 1',
      },
      {
        value: 'subKategori2',
        text: 'Sub Kategori 2',
      },
      {
        value: 'subKategori3',
        text: 'Sub Kategori 3',
      }],
      type: [{
        value: null,
        text: 'Select Type',
        disabled: true,
      },
      {
        value: 'type1',
        text: 'Type 1',
      },
      {
        value: 'type2',
        text: 'Type 2',
      },
      {
        value: 'type3',
        text: 'Type 3',
      }],
      brand: [{
        value: null,
        text: 'Select a Brand',
        disabled: true,
      },
      {
        value: 'brand1',
        text: 'Brand 1',
      },
      {
        value: 'brand2',
        text: 'Brand 2',
      },
      {
        value: 'brand3',
        text: 'Brand 3',
      }],
      units: [{
        value: null,
        text: 'Select a Unit',
        disabled: true,
      },
      {
        value: 'unit1',
        text: 'Unit 1',
      },
      {
        value: 'unit2',
        text: 'Unit 2',
      },
      {
        value: 'unit3',
        text: 'Unit 3',
      }],
    }
  },
  mounted() {
    this.initTrHeight()
  },
  created() {
    window.addEventListener('resize', this.initTrHeight)
    this.$store.commit('appConfig/UPDATE_NAV_MENU_HIDDEN', true)
    this.$http.get('/app-data/transDetail')
      .then(res => {
        this.dataPenjualan = res.data.find(data => data.id === parseInt(this.$route.params.id, 10))
      })
  },
  destroyed() {
    window.removeEventListener('resize', this.initTrHeight)
    this.$store.commit('appConfig/UPDATE_NAV_MENU_HIDDEN', this.menuHidden)
  },
  methods: {
    logoUrl() {
      return this.logoImg
    },
    paperOrientation() {
      // eslint-disable-next-line global-require
      return require('@/assets/scss/print/invoice.css')
      // The path could be '../assets/img.png', etc., which depends on where your vue file is
    },
    print() {
      this.$htmlToPaper('printReceipt', null, () => {
        console.warn('done')
      })
    },
    printLandscape() {
      // eslint-disable-next-line global-require
      // const paperorientation = require('@/assets/scss/print/landscape.css')
      // const paperorientation = this.paperInvoice
      // console.log(paperorientation)
      const localOptions = {
        styles: [
          'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
          'https://unpkg.com/kidlat-css/css/kidlat.css',
          // './landscape.css'
          // paperorientation,
        ],
      }
      this.$htmlToPaper('printMe', localOptions, () => {
        console.warn('done')
      })
    },
    repeateAgain() {
      this.items.push({
        id: this.nextTodoId += this.nextTodoId,
      })

      this.$nextTick(() => {
        this.trAddHeight(this.$refs.row[0].offsetHeight)
      })
    },
    initTrHeight() {
      this.trSetHeight(null)
      this.$nextTick(() => {
        this.trSetHeight(this.$refs.form.scrollHeight)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.repeater-form {
  overflow: hidden;
  transition: .35s height;
}
</style>
