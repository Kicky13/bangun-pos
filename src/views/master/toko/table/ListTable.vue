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
            style="width: 500px !important;"
          >
            <b-form-input
              v-model="searchTerm"
              placeholder="Search Here..."
              type="text"
              class="d-inline-block"
            />
          </div>
        </b-form-group>
      </div>
      <div style="float:left; !important; margin-left:10px;">
        <b-form-group>
          <b-form-input
            id="customer"
            v-model="selectedToko"
            placeholder="Semua Toko Bangunan"
            list="tb-list"
          />
          <datalist id="tb-list">
            <option
              v-for="cl in tokoBangunanList"
              :key="cl.text"
            >
              {{ cl.text }}
            </option>
          </datalist>
        </b-form-group>
      </div>
      <!-- <div style="float:left; !important; margin-left:10px;">
        <vue-select
          class="vue-select"
          name="select3"
          :options="options3"
          :model.sync="result3"
          :searchable="true"
          language="zh-CN"
        />
      </div> -->
      <div style="float:left; !important; margin-left:10px;">
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          variant="secondary"
          style="margin-top: -15px;"
        >
          Print
        </b-button>
      </div>
    </div>

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
        <span v-if="props.column.field === 'stCustomer'">
          <span>
            <b-button
              v-ripple.400="'rgba(234, 84, 85, 0.15)'"
              size="sm"
              :variant="paymentVariant(props.row.statusCust)"
            >
              {{ props.row.statusCust }}
            </b-button>
          </span>
        </span>
        <!-- <span v-if="props.column.field === 'statusCust'">
          <b-badge :variant="paymentVariant(props.row.statusCust)">
            {{ props.row.statusCust }}
          </b-badge>
        </span> -->

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
  </b-card>
</template>

<script>
import {
  BButton, BPagination, BFormGroup, BFormInput, BFormSelect, BCard,
} from 'bootstrap-vue'
import { VueGoodTable } from 'vue-good-table'
import store from '@/store/index'
import Ripple from 'vue-ripple-directive'
import ApiService from '@/connection/apiService'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import LoadingGrow from '@core/components/loading-process/LoadingGrow.vue'
// import vueSelect from 'vue-select'
// import AlertToken from '@core/components/expired-token/AlertToken.vue'
// import AddCustomer from './forms/modals/Add.vue'
// import { codeBasic } from './search'
// import 'vue-select/dist/vue-select.css'

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
    // AddCustomer,
    // BModal,
    // BRow,
    // BCol,
    // BFormTextarea,
    // BForm,
    // BFormInvalidFeedback,
    LoadingGrow,
    // vueSelect,
    // AlertToken,
  },
  directives: {
    // 'b-modal': VBModal,
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
          label: 'Toko Bangunan',
          field: 'shopName',
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
          label: 'Status',
          field: 'stCustomer',
          sortable: false,
          filterOptions: {
            enabled: true,
            filterDropdownItems: ['TERMINATED', 'ACTIVE'],
          },
        },
        // {
        //   label: 'Action',
        //   field: 'action',
        // },
      ],
      rows: [],
      searchTerm: '',
      selected: 'Cash',
      option: ['Cash', 'Kredit'],
      // options3: [{
      //   label: 'group1',
      //   options: [{
      //     text: 'name1',
      //     value: 'value1',
      //   }, {
      //     text: 'name2',
      //     value: 'value2',
      //   }, {
      //     text: 'name3',
      //     value: 'value3',
      //   }],
      // }, {
      //   label: 'group2',
      //   options: [{
      //     text: 'name4',
      //     value: 'value4',
      //   }, {
      //     text: 'name5',
      //     value: 'value5',
      //   }, {
      //     text: 'name6',
      //     value: 'value6',
      //   }],
      // }],
      // result3: '',
    }
  },
  computed: {
    paymentVariant() {
      const statusColor = {
        ACTIVE: 'outline-secondary',
        TERMINATED: 'outline-danger',
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
    searchTerm: {
      immediate: true,
      handler() {
        this.fetchCustomerList()
      },
    },
    selectedToko: {
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
    formatRefCode() {
      // console.log(this.productCode)
      this.jagobangunRef = this.jagobangunRef.replace(/[^0-9-]/g, '')
      // console.log(this.productCode)
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
      })
    },
    fetchCustomerList() {
      this.isLoading = true
      appService.getCustomerList({
        // limit: 50,
        q: this.searchTerm,
        id_toko: this.selectedToko ? this.tokoBangunanList.find(list => list.text === this.selectedToko).value : '',
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
    clearForm() {
      this.customerName = ''
      this.customerPhone = 0
      this.jagobangunRef = ''
      this.identityNumber = ''
      this.customerAddress = ''
    },
    setForm(data) {
      this.custUuid = data.encodedID
      this.customerID = data.custCode
      this.customerName = data.customer
      this.customerPhone = data.nohp
      this.jagobangunRef = ''
      this.identityNumber = data.identitas
      this.customerAddress = data.address
    },
    setupRows(data) {
      const res = {
        encodedID: data.uuid,
        custCode: data.kode_customer,
        customerID: data.id,
        customer: data.nama,
        shopName: `${data.toko.kode_toko} - ${data.toko.nama_toko}`,
        nohp: data.telp_customer,
        address: data.alamat,
        identitas: data.no_identitas,
        statusCust: data.status,
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
      this.$bvModal.show('customerAdd')
    },
    editData(propsData) {
      this.setForm(propsData)
      this.editForm = true
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
            title: 'Form incomplete',
            icon: 'AlertTriangleIcon',
            variant: 'danger',
            text: 'Please complete form before submit',
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
        // console.log(res)
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
    handleDelete() {
      this.isLoading = true
      const { selectedRows } = this.$refs.dataCustomer
      if (selectedRows.length > 0) {
        selectedRows.forEach(this.fetchDeleteCustomer)
      } else {
        this.$toast({
          component: ToastificationContent,
          position: 'top-right',
          props: {
            title: 'Error',
            icon: 'CoffeIcon',
            variant: 'danger',
            text: 'Select 1 or more item to delete',
          },
        })
      }
    },
    fetchDeleteCustomer(data) {
      appService.deleteCustomer(data.encodedID).then(response => {
        console.log(response)
        this.fetchCustomerList()
        this.$toast({
          component: ToastificationContent,
          position: 'top-right',
          props: {
            title: 'Deleted',
            icon: 'CoffeIcon',
            variant: 'success',
            text: 'Item deleted',
          },
        })
      }).catch(err => {
        console.log(err)
      })
    },
    formValidate() {
      const errMsg = []

      if (this.customerName.length < 3) {
        errMsg.push('customerName')
      }
      if (this.customerPhone.length < 10 && this.customerPhone.length > 12) {
        errMsg.push('customerPhone')
      }
      if (!this.customerPhone.charAt(0) === '0') {
        errMsg.push('customerPhoneFormat')
      }

      if (errMsg.length === 0) {
        return true
      }
      return false
    },
    pembayaran(propsData) {
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
      if (this.paySum === 0) {
        errMsg.push('PayAmount')
      }
      if (this.selectedType === null) {
        errMsg.push('SelectedType')
      }
      if (this.paymentID === 0) {
        errMsg.push('PayID')
      }
      if (this.paySum > this.remainingDebt) {
        this.paySum = this.remainingDebt
      }

      if (errMsg.length === 0) {
        return true
      }
      return false
    },
    handleSubmitPay(okBtn) {
      if (this.validatePay()) {
        this.$bvModal.show('askPay')
      } else {
        this.$toast({
          component: ToastificationContent,
          position: 'top-right',
          props: {
            title: 'Error',
            icon: 'AlertCircleIcon',
            variant: 'danger',
            text: 'Please complete form',
          },
        })
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
      this.customerCode = data.custCode
      this.customerName = data.customer
      this.remainingDebt = data.sisaHutang
      this.paymentID = data.encodedID
      this.paySum = 0
    },
    clearBayar() {
      this.customerCode = ''
      this.customerName = ''
      this.paymentID = ''
      this.remainingDebt = 0
      this.paySum = 0
      this.paymentID = 0
    },
    refreshTable() {
      this.rows = []
      this.fetchCustomerList()
    },
  },
}
</script>

<style lang="scss">
.vgt-table {
  font-size: 12px !important;
}
</style>
