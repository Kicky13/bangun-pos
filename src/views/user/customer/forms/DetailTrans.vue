<template>
  <div>
    <loading-grow v-if="isLoading" />
    <b-row align-h="center">
      <b-col
        cols="12"
        lg="4"
      >
        <b-card
          id="printSmallReceipt"
          class="nonprintstruck"
          :class="{'printAble': isPrintStruck}"
          style="display: none;"
        >
          <!-- Customer Form Section -->
          <div>
            <table
              width="95%"
              class="tabelstruk"
            >
              <tbody style="font-size:12px;">
                <tr>
                  <td>
                    <b-img
                      v-if="dataPenjualan.logoToko"
                      :src="dataPenjualan.logoToko"
                      alt="Logo POS Retail"
                      style="margin-bottom : 20px; width: 100%"
                    />
                    <b-img
                      v-else
                      :src="require('@/assets/images/logo/POSRetailBlack.png')"
                      alt="Logo POS Retail"
                      style="margin-bottom : 20px; width: 100%"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    Kode Penjualan :
                  </td>
                </tr>
                <tr>
                  <td style="text-align: right;">
                    <b v-if="dataPenjualan.saleCode">{{ dataPenjualan.saleCode }}</b>
                    <b v-else> - </b>
                  </td>
                </tr>
                <tr>
                  <td>
                    Tgl Transaksi :
                  </td>
                </tr>
                <tr>
                  <td style="text-align: right;">
                    <b v-if="dataPenjualan.date">{{ dataPenjualan.date }}</b>
                    <b v-else> - </b>
                  </td>
                </tr>
                <tr>
                  <td>
                    Customer :
                  </td>
                </tr>
                <tr>
                  <td style="text-align: right;">
                    <b v-if="dataPenjualan.customer">{{ dataPenjualan.customer }}</b>
                    <b v-else> - </b>
                  </td>
                </tr>
                <tr>
                  <td>
                    No referensi :
                  </td>
                </tr>
                <tr>
                  <td style="text-align: right;">
                    <b v-if="dataPenjualan.ref">{{ dataPenjualan.ref }}</b>
                    <b v-else> - </b>
                  </td>
                </tr>
                <tr>
                  <td>
                    Kasir :
                  </td>
                </tr>
                <tr>
                  <td style="text-align: right;">
                    <b v-if="dataPenjualan.biller">{{ dataPenjualan.biller }}</b>
                    <b v-else> - </b>
                  </td>
                </tr>
              </tbody>
            </table>
            <hr>
          </div>
          <!-- End Customer Form Section -->

          <!-- Cart Section -->
          <div>
            <table
              width="95%"
              class="tabelstruk"
            >
              <thead style="text-align: center;">
                <th width="50%">
                  Barang
                </th>
                <th width="50%">
                  Sub Total
                </th>
              </thead>
              <tbody style="font-size:12px;">
                <tr
                  v-for="(item) in items"
                  :id="item.id"
                  :key="item.id"
                  ref="row"
                >
                  <td style="text-align: left;">
                    {{ item.name }}
                    <br>
                    @Rp. {{ formatPrice(item.price) }}
                    <br>
                    (<b>{{ item.quantity }} X {{ item.uom }}</b>)
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
                    <hr>
                  </td>
                </tr>
                <tr>
                  <td
                    colspan="2"
                  >
                    Sub Total :
                    <br>
                    <b style="float: right">Rp. {{ formatPrice(dataPenjualan.subtotal) }}</b>
                  </td>
                </tr>
                <tr>
                  <td
                    colspan="2"
                  >
                    Diskon :
                    <br>
                    <b style="float: right">Rp. {{ formatPrice(dataPenjualan.disc) }}</b>
                  </td>
                </tr>
                <tr>
                  <td
                    colspan="2"
                  >
                    Ongkos Kirim :
                    <br>
                    <b style="float: right">Rp. {{ formatPrice(dataPenjualan.ship) }}</b>
                  </td>
                </tr>
                <tr>
                  <td
                    colspan="2"
                  >
                    Grand Total :
                    <br>
                    <b style="float: right">Rp. {{ formatPrice(dataPenjualan.grandTotal) }}</b>
                  </td>
                </tr>
                <tr>
                  <td
                    colspan="2"
                  >
                    Tipe Pembayaran :
                    <br>
                    <b style="float: right">{{ dataPenjualan.typePayment }}</b>
                  </td>
                </tr>
                <tr>
                  <td
                    colspan="2"
                  >
                    Status :
                    <br>
                    <b style="float: right">{{ dataPenjualan.paymentStatus }}</b>
                  </td>
                </tr>
                <tr v-if="dataPenjualan.typePayment === 'CASH'">
                  <td
                    colspan="2"
                  >
                    Bayar :
                    <br>
                    <b style="float: right">Rp. {{ formatPrice(dataPenjualan.bayar) }}</b>
                  </td>
                </tr>
                <tr v-else>
                  <td
                    colspan="2"
                  >
                    Bayar :
                    <br>
                    <b style="float: right">Rp. {{ formatPrice(dataPenjualan.grandTotal-dataPenjualan.kurangBayar) }}</b>
                  </td>
                </tr>
                <tr v-if="dataPenjualan.typePayment === 'CASH'">
                  <td
                    colspan="2"
                  >
                    Kembalian :
                    <br>
                    <b style="float: right">Rp. {{ formatPrice(dataPenjualan.kembalian) }}</b>
                  </td>
                </tr>
                <tr v-else>
                  <td
                    colspan="2"
                  >
                    Kurang Bayar :
                    <br>
                    <b style="float: right">Rp. {{ formatPrice(dataPenjualan.kurangBayar) }}</b>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <hr>
          <div>
            <table
              width="95%"
              class="tabelstruk"
            >
              <tbody style="text-align: center;font-size:12px;">
                <tr v-if="dataPenjualan.includetax === true">
                  <td
                    style="text-align: left;"
                  >
                    Catatan :
                    <br>
                    ** Harga Produk Yang Tercantum Sudah Termasuk PPN **
                    <br>
                    <hr>
                  </td>
                </tr>
                <tr>
                  <td>
                    Telp : {{ dataPenjualan.telpToko }}
                  </td>
                </tr>
                <tr>
                  <td>
                    Cetak : {{ tglCetak }}
                  </td>
                </tr>
                <tr>
                  <td>
                    <h1>{{ dataPenjualan.namaToko }}</h1>
                  </td>
                </tr>
                <tr>
                  <td>
                    {{ dataPenjualan.alamatToko }}
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
        lg="12"
        md="12"
        sm="12"
      >
        <b-card
          id="printMe"
          class="nonprintstruck"
          :class="{'printAble': isPrintinvoice}"
        >
          <!-- Customer Form Section -->
          <div>
            <table width="100%">
              <tbody>
                <tr>
                  <td
                    rowspan="5"
                    width="30%"
                  >
                    <b-img
                      v-if="dataPenjualan.logoToko"
                      :src="dataPenjualan.logoToko"
                      alt="Logo POS Retail"
                      style="margin-bottom : 20px; width: 100%"
                    />
                    <b-img
                      v-else
                      :src="require('@/assets/images/logo/POSRetailBlack.png')"
                      alt="Logo POS Retail"
                      style="margin-bottom : 20px; width: 100%"
                    />
                  </td>
                  <td
                    rowspan="5"
                    width="15%"
                  />
                  <td width="25%">
                    Kode Penjualan
                  </td>
                  <td width="30%">
                    : {{ dataPenjualan.saleCode }}
                  </td>
                </tr>
                <tr>
                  <td>
                    Tgl Transaksi
                  </td>
                  <td>
                    : {{ dataPenjualan.date }}
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
                    : {{ dataPenjualan.ref }}
                  </td>
                </tr>
                <tr>
                  <td>
                    Kasir
                  </td>
                  <td>
                    : {{ dataPenjualan.biller }}
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
                <th width="10%">
                  Satuan
                </th>
                <th width="25%">
                  Harga
                </th>
                <th width="10%">
                  Jumlah
                </th>
                <th width="25%">
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
                    {{ item.name }}
                  </td>
                  <td style="text-align: right;">
                    {{ item.uom }}
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
                    colspan="5"
                    style="text-align: right;"
                  >
                    <hr>
                  </td>
                </tr>
                <tr>
                  <td
                    colspan="4"
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
                    colspan="4"
                    style="text-align: right;"
                  >
                    <b>Diskon :</b>
                  </td>
                  <td style="text-align: right;">
                    <b>Rp. {{ formatPrice(dataPenjualan.disc) }}</b>
                  </td>
                </tr>
                <!-- <tr v-if="dataPenjualan.includetax === false">
                  <td
                    colspan="4"
                    style="text-align: right;"
                  >
                    <b>Pajak (@ {{ dataPenjualan.percenttax }}%):</b>
                  </td>
                  <td style="text-align: right;">
                    <b>Rp. {{ formatPrice(dataPenjualan.tax) }}</b>
                  </td>
                </tr> -->
                <tr>
                  <td
                    colspan="4"
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
                    colspan="4"
                    style="text-align: right;"
                  >
                    <b>Grand Total :</b>
                  </td>
                  <td style="text-align: right;">
                    <b>Rp. {{ formatPrice(dataPenjualan.grandTotal) }}</b>
                  </td>
                </tr>
                <tr>
                  <td
                    colspan="4"
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
                    colspan="4"
                    style="text-align: right;"
                  >
                    <b>Status :</b>
                  </td>
                  <td style="text-align: right;">
                    <b>{{ dataPenjualan.paymentStatus }}</b>
                  </td>
                </tr>
                <!-- <tr>
                  <td
                    colspan="4"
                    style="text-align: right;"
                  >
                    No. Pembayaran :
                  </td>
                  <td style="text-align: right;">
                    {{ dataPenjualan.noPemb }}
                  </td>
                </tr> -->
                <tr v-if="dataPenjualan.typePayment === 'CASH'">
                  <td
                    colspan="4"
                    style="text-align: right;"
                  >
                    <b>Bayar :</b>
                  </td>
                  <td style="text-align: right;">
                    <b>Rp. {{ formatPrice(dataPenjualan.bayar) }}</b>
                  </td>
                </tr>
                <tr v-else>
                  <td
                    colspan="4"
                    style="text-align: right;"
                  >
                    <b>Bayar :</b>
                  </td>
                  <td style="text-align: right;">
                    <b>Rp. {{ formatPrice(dataPenjualan.grandTotal-dataPenjualan.kurangBayar) }}</b>
                  </td>
                </tr>
                <tr v-if="dataPenjualan.typePayment === 'CASH'">
                  <td
                    colspan="4"
                    style="text-align: right;"
                  >
                    <b>Kembalian :</b>
                  </td>
                  <td style="text-align: right;">
                    <b>Rp. {{ formatPrice(dataPenjualan.kembalian) }}</b>
                  </td>
                </tr>
                <tr v-else>
                  <td
                    colspan="4"
                    style="text-align: right;"
                  >
                    <b>Kurang Bayar :</b>
                  </td>
                  <td style="text-align: right;">
                    <b>Rp. {{ formatPrice(dataPenjualan.kurangBayar) }}</b>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <hr>
          <div>
            <table width="100%">
              <tbody style="text-align: center;">
                <tr v-if="dataPenjualan.includetax === true">
                  <td
                    colspan="2"
                    style="text-align: left;"
                  >
                    Catatan :
                    <br>
                    ** Harga Produk Yang Tercantum Sudah Termasuk PPN **
                    <br>
                    <hr>
                  </td>
                </tr>
                <tr>
                  <td width="50%">
                    Telp : {{ dataPenjualan.telpToko }}
                  </td>
                  <td width="50%">
                    Cetak : {{ tglCetak }}
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                    <h1>{{ dataPenjualan.namaToko }}</h1>
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                    {{ dataPenjualan.alamatToko }}
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
              md="4"
            />
            <b-col
              cols="12"
              md="4"
            >
              <b-button
                v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                class="mb-1 bt-print"
                block
                @click="wprintstruk"
              >
                Cetak Invoice
              </b-button>
            </b-col>
            <b-col
              cols="12"
              md="4"
            >
              <b-button
                v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                class="mb-1 bt-print"
                block
                @click="wprintinvoice"
              >
                Cetak Struck (58mm)
              </b-button>
            </b-col>
          </b-row>
        </div>
        <!-- End Action Button Section -->
      </b-col>
    </b-row>
    <alert-token />
  </div>
</template>

<script>
import {
  BRow, BCol, BCard, BButton, VBModal, BImg, // BForm, BFormGroup, BFormInput, BAlert, BFormSelect, BInputGroup,
} from 'bootstrap-vue'
import { heightTransition } from '@core/mixins/ui/transition'
import Ripple from 'vue-ripple-directive'
import ApiService from '@/connection/apiService'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import LoadingGrow from '@core/components/loading-process/LoadingGrow.vue'
import AlertToken from '@core/components/expired-token/AlertToken.vue'
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
    LoadingGrow,
    AlertToken,
    // someStyle,
  },
  directives: {
    Ripple,
    'b-modal': VBModal,
  },
  mixins: [heightTransition],
  data() {
    return {
      isPrintStruck: false,
      isPrintinvoice: true,
      isLoading: false,
      dataPenjualan: {
        id: null,
        noPemb: null,
        qty: null,
        date: null,
        saleCode: null,
        ref: null,
        biller: null,
        customer: null,
        subtotal: 0,
        disc: 0,
        ship: 0,
        tax: 0,
        grandTotal: 0,
        bayar: 0,
        kembalian: 0,
        kurangBayar: 0,
        typePayment: null,
        paymentStatus: null,
        telpToko: null,
        namaToko: null,
        alamatToko: null,
        logoToko: null,
        percent_tax: 0,
        include_tax: false,
        note: '',
        tglCetak: '',
      },
      uuId: '53922ae4305e48aa941999a0362b45b5',
      // eslint-disable-next-line global-require
      logoImg: require('@/assets/images/logo/POSRetailBlack.png'),
      items: [],
    }
  },
  mounted() {
    this.getWaktuCetak()
    // console.log(this.$route.params.id)
    this.getDetailTransaction(this.$route.params.id)
  },
  created() {
    this.getWaktuCetak()
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
    async getWaktuCetak() {
      const currentdate = new Date()
      const tanggal = parseInt(currentdate.getDate(), 10) < 10 ? `0${currentdate.getDate()}` : currentdate.getDate()
      const bulan = parseInt(currentdate.getMonth() + 1, 10) < 10 ? `0${currentdate.getMonth() + 1}` : currentdate.getMonth() + 1
      const tahun = parseInt(currentdate.getFullYear(), 10) < 10 ? `0${currentdate.getFullYear()}` : currentdate.getFullYear()
      const jam = parseInt(currentdate.getHours(), 10) < 10 ? `0${currentdate.getHours()}` : currentdate.getHours()
      const menit = parseInt(currentdate.getMinutes(), 10) < 10 ? `0${currentdate.getMinutes()}` : currentdate.getMinutes()
      const detik = parseInt(currentdate.getSeconds(), 10) < 10 ? `0${currentdate.getSeconds()}` : currentdate.getSeconds()
      // console.log(`${tahun}-${bulan}-${tanggal} ${jam}:${menit}:${detik}`)
      this.tglCetak = `${tahun}-${bulan}-${tanggal} ${jam}:${menit}:${detik}`
    },
    async getDetailTransaction(paramid) {
      this.isLoading = true
      console.log(paramid)
      this.uuId = paramid
      this.items = []
      appService.getDetailTransaction(this.uuId).then(response => {
        const { data } = response
        this.isLoading = false
        if (data.result) {
          if (data.data) {
            console.log(data.data)
            const mPenjualan = data.data
            this.dataPenjualan.id = mPenjualan.id
            this.dataPenjualan.date = mPenjualan.date
            this.dataPenjualan.saleCode = mPenjualan.kode_transaksi
            this.dataPenjualan.ref = mPenjualan.no_referensi
            this.dataPenjualan.biller = mPenjualan.cashier.name
            this.dataPenjualan.customer = mPenjualan.customer === null ? '' : mPenjualan.customer.nama
            this.dataPenjualan.subtotal = mPenjualan.sub_total
            this.dataPenjualan.disc = mPenjualan.discount
            this.dataPenjualan.ship = mPenjualan.shipping
            this.dataPenjualan.tax = mPenjualan.tax
            this.dataPenjualan.grandTotal = (mPenjualan.sub_total + mPenjualan.tax + mPenjualan.shipping) - mPenjualan.discount
            // if (mPenjualan.payment_type === 1) {
            //   this.dataPenjualan.typePayment = 'CASH'
            // } else {
            //   this.dataPenjualan.typePayment = 'KREDIT'
            // }
            // this.dataPenjualan.paymentStatus = 'PAID'
            this.dataPenjualan.paymentStatus = mPenjualan.status === 'PAID' ? 'LUNAS' : 'BELUM LUNAS'
            this.dataPenjualan.typePayment = mPenjualan.payment_type
            this.dataPenjualan.telpToko = mPenjualan.toko.telp_toko
            this.dataPenjualan.namaToko = mPenjualan.toko.nama_toko
            this.dataPenjualan.alamatToko = mPenjualan.toko.alamat
            this.dataPenjualan.logoToko = mPenjualan.toko.logo
            this.dataPenjualan.percenttax = mPenjualan.percent_tax
            this.dataPenjualan.includetax = mPenjualan.include_tax
            this.dataPenjualan.note = mPenjualan.note ? mPenjualan.note : ''
            this.dataPenjualan.bayar = mPenjualan.money_paid
            this.dataPenjualan.kembalian = mPenjualan.change
            this.dataPenjualan.kurangBayar = mPenjualan.payment_type === 'CASH' ? 0 : mPenjualan.debt
            const itemlist = data.data.detail
            this.items = []
            itemlist.forEach(item => {
              this.items.push({
                id: item.id_detail,
                name: item.product.nama_produk,
                uom: item.product.nama_uom,
                quantity: item.qty,
                price: item.price,
                subtotal: (item.price * item.qty),
              })
            })
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
      })
    },
    logoUrl() {
      return this.logoImg
    },
    formatPrice(value) {
      const val = (value / 1).toFixed(0).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    async wprintstruk() {
      this.isLoading = true
      this.isPrintStruck = false
      this.isPrintinvoice = true
      if (this.isPrintinvoice) {
        // alert('Cetak Invoice')
        // console.log('Cetak Invoice')
      }
      await this.getWaktuCetak()
      this.isLoading = false
      setTimeout(() => {
        window.print()
      }, 1000)
    },
    async wprintinvoice() {
      this.isLoading = true
      this.isPrintStruck = true
      this.isPrintinvoice = false
      if (this.isPrintStruck) {
        // alert('Cetak Struk')
        // console.log('Cetak Struk')
      }
      await this.getWaktuCetak()
      this.isLoading = false
      setTimeout(() => {
        window.print()
      }, 1000)
    },
    print() {
      this.getWaktuCetak()
      this.$htmlToPaper('printReceipt', null, () => {
        console.warn('done')
      })
    },
    printLandscape() {
      this.getWaktuCetak()
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

<style lang="scss">
@media print {

  // Global Styles
  body {
    background-color: transparent !important;
    // width: 80mm;
    // height: 100mm;
  }
  .btn-scroll-to-top, .content-header, .bt-print, .horizontal-menu-wrapper, .nonprintstruck, .nonPrintAble {
    display: none !important;
  }
  nav.header-navbar {
    display: none;
  }
  .header-navbar-shadow {
    display: none !important;
  }
  .printAble {
    display: block !important;
  }
  .tabelstruk {
    margin-left : 10px;
    margin-right : 5px;
  }
  #printSmallReceipt {
    max-width: 27%;
    width: 27%;
  }
  .printstruck {
    max-width: 27%;
    width: 27%;
  }
  .printstruck, #printMe, #printSmallReceipt, .nonprintstruck {
    margin-top: -50px;
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
