<template>
  <div>
    <b-row align-h="center">
      <b-col
        cols="12"
        lg="12"
      >
        <b-card id="printReceipt">
          <!-- Customer Form Section -->
          <div>
            <table width="100%">
              <tbody>
                <tr>
                  <td colspan="2">
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
                  <td width="40%">
                    Kode Penjualan
                  </td>
                  <td width="60%">
                    : {{ dataPenjualan.saleCode }}
                  </td>
                </tr>
                <!-- <tr>
                  <td width="40%">
                    Tgl Transaksi
                  </td>
                  <td width="60%">
                    : {{ dataPenjualan.date }}
                  </td>
                </tr> -->
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
                    : {{ dataPenjualan.ref }}
                  </td>
                </tr>
                <tr>
                  <td width="40%">
                    Kasir
                  </td>
                  <td width="60%">
                    : {{ dataPenjualan.biller }}
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
                    colspan="4"
                    style="text-align: right;"
                  >
                    <hr>
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
                <!-- <tr v-if="dataPenjualan.includetax === false">
                  <td
                    colspan="2"
                    style="text-align: right;"
                  >
                    <b>Pajak (@ {{ dataPenjualan.percenttax }}%):</b>
                  </td>
                  <td
                    colspan="2"
                    style="text-align: right;"
                  >
                    <b>Rp. {{ formatPrice(dataPenjualan.tax) }}</b>
                  </td>
                </tr> -->
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
                    <b>Rp. {{ formatPrice(dataPenjualan.grandTotal) }}</b>
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
                    <b>Status :</b>
                  </td>
                  <td
                    colspan="2"
                    style="text-align: right;"
                  >
                    <b>{{ dataPenjualan.paymentStatus }}</b>
                  </td>
                </tr>
                <!-- <tr>
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
                    {{ dataPenjualan.noPemb }}
                  </td>
                </tr> -->
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
                    <b>Rp. {{ formatPrice(dataPenjualan.bayar) }}</b>
                  </td>
                </tr>
                <tr v-if="dataPenjualan.typePayment === 'CASH'">
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
                    <b>Rp. {{ formatPrice(dataPenjualan.kembalian) }}</b>
                  </td>
                </tr>
                <tr v-else>
                  <td
                    colspan="2"
                    style="text-align: right;"
                  >
                    <b>Kurang Bayar :</b>
                  </td>
                  <td
                    colspan="2"
                    style="text-align: right;"
                  >
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
                    Cetak : {{ dataPenjualan.date }}
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
          <!-- End Cart Section -->
        </b-card>
        <!-- Action Button Section -->
        <div style="display: none;">
          <b-row>
            <b-col
              cols="12"
              md="6"
            >
              <b-button
                v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                class="mb-1"
                block
                @click="print"
              >
                Cetak (Struk 58mm)
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
// import { heightTransition } from '@core/mixins/ui/transition'
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
  props: {
    detail: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  data() {
    return {
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
        percenttax: 0,
        includetax: false,
        note: '',
        tglCetak: '',
      },
      items: [],
      // eslint-disable-next-line global-require
      logoImg: require('@/assets/images/logo/POSRetailBlack.png'),
    }
  },
  watch: {
    detail: {
      immediate: true,
      handler() {
        if (this.detail.id) {
          console.log(this.detail)
          const mPenjualan = this.detail
          this.dataPenjualan.id = mPenjualan.id
          this.dataPenjualan.date = mPenjualan.date
          this.dataPenjualan.saleCode = mPenjualan.kode_transaksi
          this.dataPenjualan.ref = mPenjualan.no_referensi
          this.dataPenjualan.biller = mPenjualan.cashier ? mPenjualan.cashier.name : ''
          this.dataPenjualan.customer = mPenjualan.customer === null ? '' : mPenjualan.customer.nama
          this.dataPenjualan.subtotal = mPenjualan.sub_total
          this.dataPenjualan.disc = mPenjualan.discount
          this.dataPenjualan.ship = mPenjualan.shipping
          this.dataPenjualan.tax = mPenjualan.tax
          this.dataPenjualan.grandTotal = (mPenjualan.sub_total + mPenjualan.tax + mPenjualan.shipping) - mPenjualan.discount
          this.dataPenjualan.paymentStatus = mPenjualan.status === 'PAID' ? 'LUNAS' : 'BELUM LUNAS'
          this.dataPenjualan.typePayment = mPenjualan.payment_type
          this.dataPenjualan.telpToko = mPenjualan.toko.telp_toko
          this.dataPenjualan.namaToko = mPenjualan.toko.nama_toko
          this.dataPenjualan.alamatToko = mPenjualan.toko.alamat
          this.dataPenjualan.logoToko = mPenjualan.toko.logo
          this.dataPenjualan.percenttax = mPenjualan.percent_tax
          this.dataPenjualan.includetax = mPenjualan.include_tax
          this.dataPenjualan.bayar = mPenjualan.money_paid
          this.dataPenjualan.kembalian = mPenjualan.change
          this.dataPenjualan.kurangBayar = mPenjualan.payment_type === 'CASH' ? 0 : mPenjualan.debt
          this.dataPenjualan.note = mPenjualan.note ? mPenjualan.note : ''
          this.items = []
          const itemlist = this.detail.detail
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
        }
      },
    },
  },
  mounted() {
    this.getWaktuCetak()
  },
  created() {
    this.getWaktuCetak()
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
    logoUrl() {
      return this.logoImg
    },
    formatPrice(value) {
      const val = (value / 1).toFixed(0).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    async print() {
      await this.getWaktuCetak()
      this.$htmlToPaper('printReceipt', null, () => {
        console.warn('done')
      })
    },
    async printLandscape() {
      await this.getWaktuCetak()
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
