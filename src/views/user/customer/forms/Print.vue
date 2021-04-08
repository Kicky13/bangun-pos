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
                    Rp. {{ formatPrice(item.price) }}
                  </td>
                  <td style="text-align: center;">
                    {{ item.quantity }}
                  </td>
                  <td style="text-align: right;">
                    <b>Rp. {{ formatPrice((item.price * item.quantity)) }}</b>
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
                    <b>Rp. {{ formatPrice(dataPenjualan.subtotal) }}</b>
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
                    <b>Rp. {{ formatPrice(dataPenjualan.disc) }}</b>
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
                    <b>Rp. {{ formatPrice(dataPenjualan.tax) }}</b>
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
                    <b>Rp. {{ formatPrice(dataPenjualan.ship) }}</b>
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
                    <b>Rp. {{ formatPrice(dataPenjualan.subtotal) }}</b>
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
                    <b>Rp. {{ formatPrice(dataPenjualan.ship) }}</b>
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
                    <b>Rp. {{ formatPrice(dataPenjualan.ship) }}</b>
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
                    Rp. {{ formatPrice(item.price) }}
                  </td>
                  <td style="text-align: center;">
                    {{ item.quantity }}
                  </td>
                  <td style="text-align: right;">
                    <b>Rp. {{ formatPrice((item.price * item.quantity)) }}</b>
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
                    <b>Rp. {{ formatPrice(dataPenjualan.subtotal) }}</b>
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
                    <b>Rp. {{ formatPrice(dataPenjualan.disc) }}</b>
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
                    <b>Rp. {{ formatPrice(dataPenjualan.tax) }}</b>
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
                    <b>Rp. {{ formatPrice(dataPenjualan.ship) }}</b>
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
                    <b>Rp. {{ formatPrice(dataPenjualan.subtotal) }}</b>
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
                    <b>Rp. {{ formatPrice(dataPenjualan.ship) }}</b>
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
                    <b>Rp. {{ formatPrice(dataPenjualan.ship) }}</b>
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
import ApiService from '@/connection/apiService'
// import someStyle from '@/assets/scss/print/landscape.css'

const appService = new ApiService()

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
      dataPenjualan: {
        id: '53922ae4305e48aa941999a0362b45b5',
        date: '2020-11-18',
        saleCode: 'TB001/2021/00000000001',
        ref: 'jago-022129',
        biller: 'Kasir 01',
        saleStatus: 'Draft',
        customer: 'Munib',
        subtotal: '1000000',
        disc: '25000',
        ship: '50000',
        tax: '0',
        typePayment: 'KREDIT',
        paymentStatus: 'LUNAS',
      },
      uuId: '53922ae4305e48aa941999a0362b45b5',
      // eslint-disable-next-line global-require
      logoImg: require('@/assets/images/logo/POSRetailBlack.png'),
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
    }
  },
  mounted() {
    // console.log(this.$route.params.id)
    this.getDetailTransaction(this.$route.params.id)
  },
  created() {
    window.addEventListener('resize', this.initTrHeight)
    this.$store.commit('appConfig/UPDATE_NAV_MENU_HIDDEN', true)
    // this.$http.get('/app-data/transDetail')
    //   .then(res => {
    //     this.dataPenjualan = res.data.find(data => data.id === parseInt(this.$route.params.id, 10))
    //   })
  },
  destroyed() {
    window.removeEventListener('resize', this.initTrHeight)
    this.$store.commit('appConfig/UPDATE_NAV_MENU_HIDDEN', this.menuHidden)
  },
  methods: {
    async getDetailTransaction(paramid) {
      console.log(paramid)
      this.uuId = paramid
      appService.getDetailTransaction(this.uuId).then(response => {
        const { data } = response
        if (data.data) {
          console.log(data.data)
        }
      })
    },
    logoUrl() {
      return this.logoImg
    },
    formatPrice(value) {
      const val = (value / 1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    print() {
      this.$htmlToPaper('printReceipt', null, () => {
        console.warn('done')
      })
    },
    printLandscape() {
      const localOptions = {
        styles: [
          'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
          'https://unpkg.com/kidlat-css/css/kidlat.css',
        ],
      }
      this.$htmlToPaper('printMe', localOptions, () => {
        console.warn('done')
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
