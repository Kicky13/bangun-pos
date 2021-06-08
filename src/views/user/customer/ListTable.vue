<template>
  <b-card>
    <loading-grow v-if="isLoading" />
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
        lg="4"
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
        lg="1"
        md="3"
        sm="12"
      >
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          variant="primary"
          style="margin-bottom : 10px;"
          @click="cetakDataCustomer"
        >
          Print
        </b-button>
      </b-col>
      <b-col
        lg="5"
        md="6"
        sm="12"
      >
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          variant="primary"
          style="margin-right : 5px; margin-bottom : 10px;"
          @click="confirmDelete"
        >
          Hapus
        </b-button>
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          variant="primary"
          style="margin-bottom : 10px;"
          @click="addCustomer"
        >
          Tambahkan Customer
        </b-button>
      </b-col>
    </b-row>
    <br>
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
              @click="pembayaran(props.row)"
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
    <!-- table -->
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
      <!-- table -->
      <table width="100%">
        <thead style="text-align: center;">
          <th>Kode Customer</th>
          <th>Customer</th>
          <th>No. Handphone</th>
          <th>Jumlah Trans.</th>
          <th>Nilai Total Trans.</th>
          <th>Total Hutang</th>
          <th>Hutang Dibayar</th>
          <th>Sisa Hutang</th>
        </thead>
        <tbody>
          <tr
            v-for="(item) in dataCustomer"
            :id="item.transId"
            :key="item.transId"
            ref="row"
          >
            <td>
              {{ item.custCode }}
            </td>
            <td>
              {{ item.customer }}
            </td>
            <td style="text-align: center">
              {{ item.nohp }}
            </td>
            <td style="text-align: center">
              {{ item.jumTrans }}
            </td>
            <td style="text-align: right">
              {{ formatPrice(item.totalTrans) }}
            </td>
            <td style="text-align: right">
              {{ formatPrice(item.totalHutang) }}
            </td>
            <td style="text-align: right">
              {{ formatPrice(item.sudahBayar) }}
            </td>
            <td style="text-align: right">
              {{ formatPrice(item.sisaHutang) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pay Debt -->
    <b-modal
      id="listBayar"
      centered
      size="lg"
      ok-title="Simpan"
      cancel-variant="outline-secondary"
      @ok="handleSubmitPay"
    >
      <b-form>
        <b-row>
          <b-col
            lg="6"
            md="12"
            sm="12"
          >
            <b-form-group
              label="Kode Customer"
              label-for="code-customer"
            >
              <b-form-input
                id="code-customer"
                v-model="customerCode"
                placeholder="Masukkan Code Customer"
                disabled
              />
            </b-form-group>
          </b-col>
          <b-col
            lg="6"
            md="12"
            sm="12"
          >
            <b-form-group
              label="Nama Customer"
              label-for="nama-customer"
            >
              <b-form-input
                id="nama-customer"
                v-model="customerName"
                placeholder="Masukkan Nama Customer"
                disabled
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col
            lg="6"
            md="12"
            sm="12"
          >
            <b-form-group
              label="Sisa Hutang"
              label-for="sisa-hutnag"
            >
              <b-form-input
                id="sisa-hutang"
                v-model="remainingDebt"
                placeholder="nominal"
                disabled
              />
            </b-form-group>
          </b-col>
          <b-col
            lg="6"
            md="12"
            sm="12"
          >
            <b-form-group
              label="Tipe Pembayaran"
              label-for="tipe-pembayaran"
            >
              <b-form-select
                id="tipe-pembayaran"
                v-model="selectedType"
                :options="typeItem"
              />
              <b-form-invalid-feedback>
                Pilih salah satu tipe pembayaran
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col
            lg="6"
            md="12"
            sm="12"
          />
          <b-col
            lg="6"
            md="12"
            sm="12"
          >
            <b-form-group
              label="No. Pembayaran"
              label-for="no-pembayaran"
              class="font-weight-bold"
            >
              <b-form-input
                id="no-pembayaran"
                v-model="paymentID"
                placeholder="nominal"
                disabled
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col
            lg="6"
            md="12"
            sm="12"
          />
          <b-col
            lg="6"
            md="12"
            sm="12"
          >
            <b-form-group
              label="Bayar"
              label-for="bayar"
              class="font-weight-bold"
            >
              <b-form-input
                id="bayar"
                v-model="paySum"
                :state="paySum !== '' && parseInt(paySum) <= remainingDebt"
                placeholder="nominal"
                @keyup="formatBayar"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <!-- <b-row class="mt-2">
          <b-col cols="2" />
          <b-col cols="10">
            <b-form-group
              label="No. Pembayaran"
              label-for="no-pembayaran"
              label-cols-md="5"
              label-align="right"
              class="font-weight-bold"
            >
              <b-form-input
                id="no-pembayaran"
                v-model="paymentID"
                placeholder="nominal"
                disabled
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="2" />
          <b-col cols="10">
            <b-form-group
              label="Bayar"
              label-for="bayar"
              label-cols-md="5"
              class="font-weight-bold text-right"
            >
              <b-form-input
                id="bayar"
                v-model="paySum"
                :state="paySum !== '' && parseInt(paySum) <= remainingDebt"
                placeholder="nominal"
                @keyup="formatBayar"
              />
            </b-form-group>
            <b-form-invalid-feedback>
              Jumlah yg dibayarkan tidak boleh 0
            </b-form-invalid-feedback>
          </b-col>
        </b-row> -->
      </b-form>
    </b-modal>
    <b-modal
      id="askPay"
      centered
      size="sm"
      hide-header
      hide-header-close
      ok-title="Ya, Lanjutkan ..."
      cancel-title="Batalkan"
      ok-variant="danger"
      cancel-variant="secondary"
      @ok="fetchPayDebt"
      @cancel="handleCancelPay"
    >
      <div class="d-block text-center">
        <h3>Apakah Anda Sudah Yakin ?</h3>
      </div>
    </b-modal>
    <!-- <End of pay debt /> -->

    <!-- Add Customer -->
    <b-modal
      id="customerAdd"
      centered
      size="lg"
      :title="formTitle"
      ok-title="Simpan"
      cancel-title="Tutup"
      ok-variant="danger"
      @ok="handleOk"
    >
      <b-form>
        <b-row>
          <b-col
            lg="6"
            md="12"
            sm="12"
          >
            <b-form-group
              label="Nama Customer :"
              label-for="customerName"
            >
              <b-form-input
                id="customerName"
                v-model="customerName"
                :state="customerName.length > 2"
              />
              <b-form-invalid-feedback>
                Nama Customer Wajib Diisi Minimal 3 Karakter
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col
            lg="6"
            md="12"
            sm="12"
          >
            <b-form-group
              label-for="reference"
              label="No. Referensi (Tukang JagoBagun) :"
            >
              <b-form-input
                id="reference"
                v-model="jagobangunRef"
                type="text"
                inputmode="numeric"
                @keyup="numberOnly($event, 'jagobangunRef')"
              />
              <!-- <b-form-invalid-feedback>
                Nomor Referensi Wajib Diisi 16 Angka
              </b-form-invalid-feedback> -->
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col
            lg="6"
            md="12"
            sm="12"
          >
            <b-form-group
              label="Nomor Handphone : "
              label-for="phone"
            >
              <b-form-input
                id="phone"
                v-model="customerPhone"
                :formatter="formatContact"
                :state="customerPhone.length >= 10 && customerPhone.length <= 12 && customerPhone.charAt(0) === '0'"
                type="text"
                inputmode="numeric"
                @keyup="numberOnly($event, 'customerPhone')"
              />
              <b-form-invalid-feedback>
                Telepon Customer Wajib Diisi Minimal 10 Karakter, Maksimal 12 Karakter dan dan Diawali Angka 0 (Contoh Format : 081234567890)
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col
            lg="6"
            md="12"
            sm="12"
          >
            <b-form-group
              label-for="ktp"
              label="Nomor Identitas/KTP"
            >
              <b-form-input
                id="ktp"
                v-model="identityNumber"
                type="text"
                inputmode="numeric"
                :state="identityNumber.length === 0 || identityNumber.length === 16"
                :formatter="formatIdentitas"
                @keyup="numberOnly($event, 'identityNumber')"
              />
              <b-form-invalid-feedback>
                Nomor Identitas Customer Wajib Diisi 16 Angka
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col
            lg="12"
            md="12"
            sm="12"
          >
            <b-form-group
              label="Alamat :"
              label-for="address"
            >
              <b-form-textarea
                id="address"
                v-model="customerAddress"
                rows="4"
              />
              <!-- <b-form-invalid-feedback>
                Nama Customer Wajib Diisi Minimal 3 Karakter
              </b-form-invalid-feedback> -->
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
    </b-modal>
    <b-modal
      id="askSubmit"
      centered
      size="lg"
      hide-header
      hide-header-close
      ok-title="Ya, Lanjutkan ..."
      cancel-title="Batalkan"
      ok-variant="danger"
      cancel-variant="secondary"
      @ok="handleSubmit"
      @cancel="handleCancel"
    >
      <div class="d-block text-center">
        <h3>Apakah Anda Sudah Yakin ?</h3>
      </div>
    </b-modal>
    <b-modal
      id="confirmDelete"
      centered
      size="sm"
      hide-header
      hide-header-close
      ok-title="Ya, Lanjutkan ..."
      cancel-title="Batalkan"
      ok-variant="danger"
      cancel-variant="secondary"
      @ok="handleDelete"
      @cancel="cancelDelete"
    >
      <div class="d-block text-center">
        <h3>Apakah Anda Yakin Menghapus data berikut ?</h3>
      </div>
    </b-modal>
    <alert-token />
    <!-- End of Customer Add -->
  </b-card>
</template>

<script>
import {
  BButton, BPagination, BFormGroup, BFormInput, BFormSelect, BCard, BModal, VBModal, BRow, BCol, BFormTextarea, BForm, BFormInvalidFeedback, BImg,
} from 'bootstrap-vue'
import { VueGoodTable } from 'vue-good-table'
import store from '@/store/index'
import Ripple from 'vue-ripple-directive'
import ApiService from '@/connection/apiService'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import LoadingGrow from '@core/components/loading-process/LoadingGrow.vue'
import AlertToken from '@core/components/expired-token/AlertToken.vue'
// import AddCustomer from './forms/modals/Add.vue'
// import { codeBasic } from './search'

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
    BImg,
    // AddCustomer,
    BModal,
    BRow,
    BCol,
    BFormTextarea,
    BForm,
    BFormInvalidFeedback,
    LoadingGrow,
    AlertToken,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  data() {
    return {
      userData: null,
      formTitle: 'Tambah Customer',
      custUuid: '',
      customerCode: '',
      remainingDebt: 0,
      paymentID: '',
      paySum: 0,
      selectedType: 1,
      customerName: '',
      customerPhone: '',
      jagobangunRef: '',
      identityNumber: '',
      customerAddress: '',
      selectedPembayaran: null,
      selectedStatus: null,
      isLoading: false,
      editForm: false,
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
          label: 'Kode Customer',
          field: 'custCode',
        },
        {
          label: 'Encoded ID',
          field: 'encodedID',
          hidden: true,
        },
        {
          label: 'ID Customer',
          field: 'customerID',
          hidden: true,
        },
        {
          label: 'Alamat Customer',
          field: 'address',
          hidden: true,
        },
        {
          label: 'No. References',
          field: 'noref',
          hidden: true,
        },
        {
          label: 'No Identitas',
          field: 'identitas',
          hidden: true,
        },
        {
          label: 'Customer',
          field: 'customer',
        },
        {
          label: 'No. Handphone',
          field: 'nohp',
        },
        {
          label: 'Jumlah Trans.',
          field: 'jumTrans',
        },
        {
          label: 'Nilai Total Trans.',
          field: 'totalTrans',
          tdClass: 'text-right',
          formatFn: this.formatPrice,
        },
        {
          label: 'Total Hutang',
          field: 'totalHutang',
          tdClass: 'text-right',
          formatFn: this.formatPrice,
        },
        {
          label: 'Hutang Dibayar',
          field: 'sudahBayar',
          tdClass: 'text-right',
          formatFn: this.formatPrice,
        },
        {
          label: 'Sisa Hutang',
          field: 'sisaHutang',
          tdClass: 'text-right',
          formatFn: this.formatPrice,
        },
        {
          label: 'Action',
          field: 'action',
        },
      ],
      rows: [],
      dataCustomer: [],
      searchTerm: '',
      selected: 'Cash',
      option: ['Cash', 'Kredit'],
    }
  },
  computed: {
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
  watch: {},
  created() {
    this.getDataUser()
    this.fetchCustomerList()
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
    numberOnly(e, field) {
      const num = /[^0-9]/gi
      const dataValue = e.target.value.replace(num, '')
      if (field === 'jagobangunRef') {
        this.jagobangunRef = dataValue
      } else if (field === 'customerPhone') {
        this.customerPhone = dataValue
      } else if (field === 'identityNumber') {
        this.identityNumber = dataValue
      }
    },
    formatContact(e) {
      return String(e).substring(0, 12)
    },
    formatIdentitas(e) {
      return String(e).substring(0, 16)
    },
    formatBayar() {
      this.paySum = this.paySum.replace(/[^0-9]/g, '')
      if (parseInt(this.paySum, 10) > this.remainingDebt) {
        this.paySum = `${this.remainingDebt}`
      }
    },
    cetakDataCustomer() {
      this.isLoading = true
      const { selectedRows } = this.$refs.dataCustomer
      if (selectedRows.length < 1) {
        this.dataCustomer = this.rows
        // this.$router.push({ name: 'user-customer-print', params: { dataCustomer: this.rows } })
      } else {
        this.dataCustomer = selectedRows
        // this.$router.push({ name: 'user-customer-print', params: { dataCustomer: selectedRows } })
      }
      setTimeout(() => {
        this.isLoading = false
        this.printLandscape()
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
    formatRefCode() {
      this.jagobangunRef = this.jagobangunRef.replace(/[^0-9-]/g, '')
    },
    formatPrice(value) {
      const val = (value / 1).toFixed(2).replace('.', ',')
      const formatedval = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      return `Rp. ${formatedval}`
    },
    fetchCustomerList() {
      this.isLoading = true
      appService.getCustomer({
        limit: 50,
        q: '',
        page: 1,
      }).then(response => {
        console.log(response)
        this.rows = []
        const res = response.data
        this.isLoading = false
        if (res.result) {
          const resdata = res.data
          if (resdata) {
            resdata.forEach(this.setupRows)
          }
        } else {
          this.$bvModal.show('tokenExpired')
        }
      }).catch(err => {
        console.log(err)
        this.isLoading = false
      })
    },
    clearForm() {
      this.customerName = ''
      this.customerPhone = '0'
      this.jagobangunRef = ''
      this.identityNumber = ''
      this.customerAddress = ''
    },
    setForm(data) {
      console.log(data)
      this.custUuid = data.encodedID ?? ''
      this.customerID = data.custCode ?? ''
      this.customerName = data.customer ?? ''
      this.customerPhone = data.nohp ?? ''
      this.jagobangunRef = data.noref ?? ''
      this.identityNumber = data.identitas ?? ''
      this.customerAddress = data.address ?? ''
    },
    setupRows(data) {
      const res = {
        encodedID: data.uuid,
        custCode: data.kode_customer,
        customerID: data.id,
        customer: data.nama,
        shopName: data.toko.name,
        nohp: data.telp_customer,
        noref: data.no_references,
        address: data.alamat,
        identitas: data.no_identitas,
        jumTrans: data.total_transaction,
        totalTrans: data.sum_transaction,
        totalHutang: data.paid_debt + data.remaining_debt,
        sudahBayar: data.paid_debt,
        sisaHutang: data.remaining_debt,
      }
      this.rows.push(res)
    },
    addCustomer() {
      this.editForm = false
      this.clearForm()
      this.formTitle = 'Tambah Customer'
      this.$bvModal.show('customerAdd')
    },
    editData(propsData) {
      this.setForm(propsData)
      this.editForm = true
      this.formTitle = 'Edit Customer'
      this.$bvModal.show('customerAdd')
    },
    handleOk(okBtn) {
      if (this.formValidate()) {
        this.$bvModal.show('askSubmit')
      } else {
        this.$toast({
          component: ToastificationContent,
          position: 'top-right',
          props: {
            title: 'Form Tidak Lengkap',
            icon: 'AlertTriangleIcon',
            variant: 'danger',
            text: 'Mohon Untuk Melengkapi Form Sebelum Menyimpan Data',
          },
        })
        okBtn.preventDefault()
      }
    },
    handleCancel() {
      this.$bvModal.show('customerAdd')
    },
    handleSubmit() {
      // console.log('OK')
      this.isLoading = true
      if (this.editForm) {
        this.fetchUpdateCustomer()
      } else {
        this.fetchCustomerInsert()
      }
    },
    fetchUpdateCustomer() {
      const data = {
        nama_customer: this.customerName,
        telp_customer: this.customerPhone,
        no_identitas: this.identityNumber,
        alamat: this.customerAddress,
        no_references: this.jagobangunRef,
      }
      appService.updateCustomer(this.custUuid, data).then(response => {
        console.log(response)
        this.clearForm()
        this.fetchCustomerList()
        this.editForm = false
      }).catch(err => {
        console.log(err)
      })
    },
    fetchCustomerInsert() {
      const data = {
        nama_customer: this.customerName,
        telp_customer: this.customerPhone,
        no_identitas: this.identityNumber,
        alamat: this.customerAddress,
        no_references: this.jagobangunRef,
      }
      appService.addCustomer(data).then(response => {
        const res = response.data
        console.log(res)
        if (res.result) {
          this.fetchCustomerList()
          this.clearForm()
        } else {
          const errMsg = res.message

          errMsg.forEach(msg => {
            this.$toast({
              component: ToastificationContent,
              position: 'top-right',
              props: {
                title: 'Error',
                icon: 'AlertCircleIcon',
                variant: 'danger',
                text: msg,
              },
            })
          })
        }
        this.isLoading = false
      }).catch(err => {
        console.log(err)
        this.isLoading = false
      })
    },
    confirmDelete(okBtn) {
      const { selectedRows } = this.$refs.dataCustomer
      if (selectedRows.length > 0) {
        this.$bvModal.show('confirmDelete')
      } else {
        this.$toast({
          component: ToastificationContent,
          position: 'top-right',
          props: {
            title: 'ERROR',
            icon: 'AlertTriangleIcon',
            variant: 'danger',
            text: 'Centang salah satu data untuk dihapus',
          },
        })
        okBtn.preventDefault()
      }
    },
    cancelDelete() {
      this.$bvModal.hide('confirmDelete')
    },
    handleDelete() {
      this.isLoading = true
      const { selectedRows } = this.$refs.dataCustomer
      // console.log(selectedRows)
      if (selectedRows.length > 0) {
        selectedRows.forEach(this.fetchDeleteCustomer)
        this.isLoading = false
      } else {
        this.isLoading = false
        this.$toast({
          component: ToastificationContent,
          position: 'top-right',
          props: {
            title: 'Peringatan',
            icon: 'CoffeIcon',
            variant: 'danger',
            text: 'Pilih 1 atau Lebih Data Customer Untuk DiHapus',
          },
        })
      }
    },
    fetchDeleteCustomer(data) {
      appService.deleteCustomer(data.encodedID).then(response => {
        console.log(response)
        if (response.data.result) {
          this.fetchCustomerList()
          this.$toast({
            component: ToastificationContent,
            position: 'top-right',
            props: {
              title: 'Berhasil Dihapus',
              icon: 'CoffeIcon',
              variant: 'success',
              text: 'Customer Berhasil Dihapus',
            },
          })
        } else {
          this.$toast({
            component: ToastificationContent,
            position: 'top-right',
            props: {
              title: 'Gagal Dihapus',
              icon: 'CoffeIcon',
              variant: 'danger',
              text: 'Customer Sudah memiliki transaksi',
            },
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    formValidate() {
      const errMsg = []
      if (this.customerName.length < 3) {
        errMsg.push('Nama Customer Wajib Diisi, Minimal 3 Karakter')
      }
      if (this.customerPhone.length < 10 || this.customerPhone.length > 12) {
        errMsg.push('Telp Customer Wajib Diisi Minimal 10 Karakter & Maksimal 12 Karakter')
      }
      if (this.customerPhone.charAt(0) === '0') {
        console.log('No Telp Pemilik Sudah Diawali Dengan Angka 0')
      } else {
        errMsg.push('No Telp Pemilik Wajib Diawali Dengan Angka 0')
      }
      if (this.identityNumber.length > 0 && this.identityNumber.length < 16) {
        errMsg.push('Nomor Identitas Wajib Diisi 16 Digits Angka')
      }
      errMsg.forEach(msg => {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: msg,
            icon: 'AlertCircleIcon',
            variant: 'danger',
          },
        })
      })
      if (errMsg.length === 0) {
        return true
      }
      return false
    },
    pembayaran(propsData) {
      console.log(propsData)
      this.setBayar(propsData)
      this.$bvModal.show('listBayar')
    },
    validatePay() {
      const errMsg = []

      if (this.customerCode.length === 0) {
        errMsg.push('CustomerCode')
      }
      if (this.customerName.length === 0) {
        errMsg.push('CustomerName')
      }
      // if (parseInt(this.paySum, 10) === 0) {
      //   errMsg.push('Jumlah yang Dibayarkan Tidak Valid')
      // }
      if (this.paySum === '') {
        console.log(this.paySum)
        errMsg.push('Inputan yang Dibayarkan Tidak Valid')
      } else {
        console.log(this.paySum)
      }
      if (this.selectedType === null) {
        errMsg.push('SelectedType')
      }
      if (this.paymentID === 0) {
        errMsg.push('PayID')
      }
      if (this.paySum.charAt(0) === '0') {
        errMsg.push('Jumlah yang Dibayarkan Tidak Valid')
      } else {
        console.log('No Telp Pemilik Sudah Diawali Dengan Angka 0')
      }
      if (parseInt(this.paySum, 10) > this.remainingDebt) {
        // errMsg.push('paySum')
        errMsg.push('Jumlah yang dibayarkan tidak boleh melebihi hutang')
        // this.$toast({
        //   component: ToastificationContent,
        //   position: 'top-right',
        //   props: {
        //     title: 'Error',
        //     icon: 'AlertCircleIcon',
        //     variant: 'danger',
        //     text: 'Jumlah yang dibayarkan tidak boleh melebihi hutang',
        //   },
        // })
      }
      if (errMsg.length === 0) {
        return true
      }
      errMsg.forEach(msg => {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Error',
            icon: 'AlertCircleIcon',
            variant: 'danger',
            text: msg,
          },
        })
      })
      return false
    },
    handleSubmitPay(okBtn) {
      if (this.validatePay()) {
        this.$bvModal.show('askPay')
      } else {
        // this.$toast({
        //   component: ToastificationContent,
        //   position: 'top-right',
        //   props: {
        //     title: 'Error',
        //     icon: 'AlertCircleIcon',
        //     variant: 'danger',
        //     text: 'Please complete form',
        //   },
        // })
        okBtn.preventDefault()
      }
    },
    handleCancelPay() {
      this.$bvModal.show('listBayar')
    },
    fetchPayDebt() {
      this.isLoading = true
      appService.payDebt({
        id_customer: this.paymentID,
        id_debt: this.paymentID,
        pay_amount: this.paySum,
        type_payment: this.selectedType,
        tax: 0,
        notes: 'test pay',
        customer_code: this.customerCode,
        cashback: 0,
      }).then(response => {
        console.log(response)
        this.clearBayar()
        this.fetchCustomerList()
        this.$$bvModal.hide('listBayar')
      }).catch(err => {
        if (err.request) {
          const errMsg = JSON.parse(err.request.response)
          this.isLoading = false
          const msg = errMsg.errors
          if (msg.id_customer) {
            this.$toast({
              component: ToastificationContent,
              position: 'top-right',
              props: {
                title: 'Error',
                icon: 'AlertCircleIcon',
                variant: 'danger',
                text: msg.id_customer[0],
              },
            })
          }
        }
      })
    },
    setBayar(data) {
      this.customerCode = data.custCode ?? ''
      this.customerName = data.customer ?? ''
      this.remainingDebt = data.sisaHutang ?? ''
      this.paymentID = data.encodedID ?? ''
      this.paySum = '0'
    },
    clearBayar() {
      this.customerCode = ''
      this.customerName = ''
      this.paymentID = ''
      this.remainingDebt = 0
      this.paySum = '0'
      this.paymentID = 0
    },
    refreshTable() {
      this.rows = []
      this.fetchCustomerList()
    },
  },
}
</script>
