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
      <div style="float:left;width: 200px !important; margin-left:10px;">
        <b-form-group
          label="Status"
          label-for="status"
          label-cols-md="4"
        >
          <b-form-select
            id="status"
            v-model="selectedStatus"
            :options="statusItems"
          />
        </b-form-group>
      </div>
      <div style="float:left; !important; margin-left:10px;">
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          variant="secondary"
          style="margin-top: -15px;"
        >
          Print
        </b-button>
      </div>
      <div style="float:left; !important; margin-left:10px;">
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          variant="primary"
          style="margin-top: -15px;"
        >
          Delete
        </b-button>
      </div>
      <div style="float:left; !important; margin-left:10px;">
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          v-b-modal.customerAdd
          variant="primary"
          style="margin-top: -15px;"
        >
          Tambahkan Customer
        </b-button>
      </div>
    </div>

    <!-- table -->
    <vue-good-table
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
              :to="{ name: 'user-customer-list-trans'}"
            >
              List Trans.
            </b-button>
            <b-button
              v-ripple.400="'rgba(234, 84, 85, 0.15)'"
              v-b-modal.listBayar
              size="sm"
              variant="outline-danger"
            >
              Bayar
            </b-button>
            <b-button
              v-ripple.400="'rgba(234, 84, 85, 0.15)'"
              size="sm"
              variant="outline-danger"
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

    <!-- Modal Section -->
    <bayar-modal />
    <add-customer />

    <!-- Add Customer -->
    <b-modal
      id="customerAdd"
      centered
      size="lg"
      title="Tambah Customer"
      ok-title="Simpan"
      cancel-title="Tutup"
      ok-variant="danger"
      @ok="handleOk"
    >
      <b-form>
        <b-row>
          <b-col cols="6">
            <b-form-group
              label="Nama Customer :"
              label-for="customerName"
            >
              <b-form-input
                id="customerName"
                v-model="customerName"
                :state="customerName.length > 0"
              />
              <b-form-invalid-feedback>
                Nama Customer wajib diisi
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group
              label-for="reference"
              label="No. Referensi (Tukang JagoBagun) :"
            >
              <b-form-input
                id="reference"
                v-model="jagobangunRef"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="6">
            <b-form-group
              label="Nomor Handphone : "
              label-for="phone"
            >
              <b-form-input
                id="phone"
                v-model="customerPhone"
                :state="customerPhone.length > 0 && customerPhone.charAt(0) === '0'"
                type="number"
              />
              <b-form-invalid-feedback>
                Telepon Customer wajib diisi dengan benar
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group
              label-for="ktp"
              label="Nomor Identitas/KTP"
            >
              <b-form-input
                id="ktp"
                v-model="identityNumber"
                :state="identityNumber.length > 0"
                type="number"
              />
              <b-form-invalid-feedback>
                No Identitas Customer wajib diisi
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <b-form-group
              label="Alamat :"
              label-for="address"
            >
              <b-form-textarea
                id="address"
                v-model="customerAddress"
                :state="customerAddress.length > 0"
                rows="4"
              />
              <b-form-invalid-feedback>
                Alamat Customer wajib diisi
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
    </b-modal>
    <b-modal
      id="askSubmit"
      centered
      size="sm"
      hide-header
      hide-header-close
      ok-title="Yes"
      cancel-title="No"
      ok-variant="danger"
      cancel-variant="secondary"
      @ok="handleSubmit"
      @cancel="handleCancel"
    >
      <div class="d-block text-center">
        <h3>Proceed ?</h3>
      </div>
    </b-modal>
    <!-- End of Customer Add -->
  </b-card>
</template>

<script>
import {
  BButton, BPagination, BFormGroup, BFormInput, BFormSelect, BCard, BModal, VBModal, BRow, BCol, BFormTextarea, BForm, BFormInvalidFeedback,
} from 'bootstrap-vue'
import { VueGoodTable } from 'vue-good-table'
import store from '@/store/index'
import Ripple from 'vue-ripple-directive'
import BayarModal from './forms/modals/BayarModal.vue'
import AddCustomer from './forms/modals/Add.vue'
import ApiService from '@/connection/apiService'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import LoadingGrow from '@core/components/loading-process/LoadingGrow.vue'
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
    BayarModal,
    AddCustomer,
    BModal,
    BRow,
    BCol,
    BFormTextarea,
    BForm,
    BFormInvalidFeedback,
    LoadingGrow,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  data() {
    return {
      customerName: '',
      customerPhone: '',
      jagobangunRef: '',
      identityNumber: '',
      customerAddress: '',
      selectedPembayaran: null,
      selectedStatus: null,
      isLoading: false,
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
          label: 'Total Trans.',
          field: 'totalTrans',
        },
        {
          label: 'Sudah Bayar',
          field: 'sudahBayar',
        },
        {
          label: 'Sisa Hutang',
          field: 'sisaHutang',
        },
        {
          label: 'Action',
          field: 'action',
        },
      ],
      rows: [],
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
  created() {
    this.fetchCustomerList()
  },
  methods: {
    fetchCustomerList() {
      appService.getCustomer({
        limit: 50,
        q: '',
        page: 1,
      }).then(response => {
        const res = response.data.data
        if (res.length > 0) {
          console.log(res)
        // this.rows = res
        } else {
          this.$toast({
            component: ToastificationContent,
            position: 'top-right',
            props: {
              title: 'Data Not Found',
              icon: 'CoffeeIcon',
              variant: 'danger',
              text: 'Data empty on server, using dummy data now',
            },
          })
          this.$http.get('/app-data/customerUser')
            .then(resData => { this.rows = resData.data })
        }
      }).catch(err => {
        console.log(err)
      })
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
      console.log('OK')
      this.isLoading = true
      this.fetchCustomerInsert()
    },
    fetchCustomerInsert() {
      appService.addCustomer({
        nama_customer: this.customerName,
        telp_customer: this.customerPhone,
        no_identitas: this.identityNumber,
        alamat: this.customerAddress,
        no_references: this.jagobangunRef,
      }).then(response => {
        console.log(response)
        this.isLoading = false
      }).catch(err => {
        console.log(err)
        this.isLoading = false
      })
    },
    formValidate() {
      const errMsg = []

      if (this.customerName.length === 0) {
        errMsg.push('customerName')
      }
      if (this.customerPhone.length === 0) {
        errMsg.push('customerPhone')
      }
      if (!this.customerPhone.charAt(0) === '0') {
        errMsg.push('customerPhoneFormat')
      }
      if (this.identityNumber.length === 0) {
        errMsg.push('identityNumber')
      }
      if (this.customerAddress.length === 0) {
        errMsg.push('customerAddress')
      }

      console.log(this.customerPhone.charAt(0))

      if (errMsg.length === 0) {
        return true
      }
      return false
    },
  },
}
</script>
