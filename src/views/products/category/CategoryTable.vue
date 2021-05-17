<template>
  <b-card>
    <loading-grow v-if="isLoading" />
    <div>
      <b-row>
        <b-col
          lg="6"
          md="6"
          sm="12"
        >
          <b-form-group>
            <b-form-input
              v-model="searchTerm"
              placeholder="Masukkan Kata Pencarian..."
              type="text"
              class="d-inline-block"
            />
          </b-form-group>
        </b-col>
        <!-- <b-col
          lg="1"
          md="1"
          sm="12"
        >
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="secondary"
          >
            Cetak
          </b-button>
        </b-col> -->
        <b-col
          lg="1"
          md="1"
          sm="12"
        >
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            @click="tambahData"
          >
            Tambah
          </b-button>
        </b-col>
      </b-row>
    </div>
    <div class="demo-inline-spacing" />
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

        <!-- Column: Action -->
        <span v-if="props.column.field === 'action'">
          <span>
            <b-button
              v-ripple.400="'rgba(234, 84, 85, 0.15)'"
              size="sm"
              variant="outline-danger"
              @click="ubahData(props.row)"
            >
              Ubah
            </b-button>
            <b-button
              v-ripple.400="'rgba(234, 84, 85, 0.15)'"
              size="sm"
              variant="outline-danger"
              @click="hapusData(props.row)"
            >
              Hapus
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

    <!-- Add Customer -->
    <b-modal
      id="FormData"
      centered
      size="lg"
      title="Form Kategori"
      ok-title="Simpan"
      cancel-title="Tutup"
      ok-variant="danger"
      @ok="handleOk"
    >
      <b-form>
        <b-row>
          <b-col
            lg="12"
            md="12"
            sm="12"
          >
            <b-form-group
              label="Nama Kategori :"
              label-for="dataName"
            >
              <b-form-input
                id="dataName"
                v-model="inpName"
                :state="inpName.length > 0"
                name="dataName"
              />
              <b-form-invalid-feedback>
                Nama Kategori wajib diisi
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
              label="Keterangan :"
              label-for="dataNotes"
            >
              <b-form-textarea
                id="dataNotes"
                v-model="inpNotes"
                name="dataNotes"
                rows="4"
              />
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
      id="askDelete"
      centered
      size="sm"
      hide-header
      hide-header-close
      ok-title="Ya, Lanjutkan ..."
      cancel-title="Batalkan"
      ok-variant="danger"
      cancel-variant="secondary"
      @ok="handleDelete"
      @cancel="handleCancelDelete"
    >
      <div class="d-block text-center">
        <h3>Apakah Anda Sudah Yakin ?</h3>
      </div>
    </b-modal>
    <!-- End of Customer Add -->

  </b-card>
</template>

<script>
import {
  BButton, BPagination, BForm, BFormGroup, BFormInput, BFormSelect, BCard, BRow, BCol, BFormTextarea, BFormInvalidFeedback,
} from 'bootstrap-vue'
import { VueGoodTable } from 'vue-good-table'
import store from '@/store/index'
import Ripple from 'vue-ripple-directive'
import ApiService from '@/connection/apiService'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import LoadingGrow from '@core/components/loading-process/LoadingGrow.vue'

const appService = new ApiService()

export default {
  components: {
    BButton,
    BForm,
    VueGoodTable,
    BPagination,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BFormTextarea,
    BFormInvalidFeedback,
    BCard,
    BRow,
    BCol,
    LoadingGrow,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      inpId: '',
      inpCode: '',
      inpName: '',
      inpNotes: '',
      isLoading: false,
      editForm: false,
      deleteData: [],
      tokoBangunanList: [],
      selectedToko: '',
      pageLength: 10,
      dir: false,
      columns: [
        {
          label: 'ID',
          field: 'encodedID',
        },
        {
          label: 'Kode',
          field: 'code',
        },
        {
          label: 'Nama',
          field: 'name',
        },
        {
          label: 'Keterangan',
          field: 'notes',
        },
        {
          label: 'Action',
          field: 'action',
        },
      ],
      rows: [],
      searchTerm: '',
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
  watch: {},
  created() {
    this.fetchDataList()
  },
  methods: {
    formatPrice(value) {
      const val = (value / 1).toFixed(2).replace('.', ',')
      const formatedval = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      return `Rp. ${formatedval}`
    },
    fetchDataList() {
      this.isLoading = true
      appService.getAdminCategory().then(response => {
        this.rows = []
        const res = response.data
        this.isLoading = false
        const resdata = res.data
        if (resdata) {
          resdata.forEach(this.setupRows)
        }
      }).catch(err => {
        console.log(err)
        this.isLoading = false
      })
    },
    setupRows(data) {
      const res = {
        encodedID: data.id,
        code: data.kode_category,
        name: (data.nama_category).toUpperCase(),
        notes: data.notes,
      }
      this.rows.push(res)
    },
    refreshTable() {
      this.rows = []
      this.fetchDataList()
    },
    clearForm() {
      this.inpId = ''
      this.inpCode = ''
      this.inpName = ''
      this.inpNotes = ''
    },
    tambahData() {
      this.clearForm()
      this.editForm = false
      this.$bvModal.show('FormData')
    },
    ubahData(propsData) {
      this.clearForm()
      this.setForm(propsData)
      this.editForm = true
      this.$bvModal.show('FormData')
    },
    setForm(data) {
      console.log(data)
      console.log('a')
      this.inpId = data.encodedID
      this.inpCode = data.code
      this.inpName = data.name
      this.inpNotes = data.notes
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
      this.$bvModal.show('FormData')
    },
    handleCancelDelete() {
      this.deleteData = []
    },
    handleSubmit() {
      // console.log('OK')
      this.isLoading = true
      if (this.editForm) {
        this.fetchUpdateCustomer()
      } else {
        this.fetchDataInsert()
      }
    },
    fetchUpdateCustomer() {
      const data = {
        // id_category: this.inpId,
        kode_category: this.inpCode,
        nama_category: this.inpName,
        notes: this.inpNotes,
      }
      appService.updateAdminCategory(this.inpId, data).then(response => {
        console.log(response)
        this.$toast({
          component: ToastificationContent,
          position: 'top-right',
          props: {
            title: 'Berhasil Memperbarui Data',
            icon: 'CoffeIcon',
            variant: 'success',
            text: 'Berhasil Memperbarui Data Kategori',
          },
        })
        this.clearForm()
        this.fetchDataList()
        this.editForm = false
      }).catch(err => {
        console.log(err)
      })
    },
    fetchDataInsert() {
      const data = {
        kode_category: this.inpCode,
        nama_category: this.inpName,
        notes: this.inpNotes,
      }
      appService.addAdminCategory(data).then(response => {
        const res = response.data
        console.log(res)
        if (res.result) {
          this.$toast({
            component: ToastificationContent,
            position: 'top-right',
            props: {
              title: 'Berhasil Menyimpan Data',
              icon: 'CoffeIcon',
              variant: 'success',
              text: 'Berhasil Menyimpan Data Kategori',
            },
          })
          this.fetchDataList()
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
    hapusData(propsData) {
      console.log(propsData)
      this.deleteData = propsData
      console.log(this.deleteData)
      this.$bvModal.show('askDelete')
    },
    handleDelete() {
      console.log(this.deleteData)
      appService.deleteAdminCategory(this.deleteData.encodedID).then(response => {
        console.log(response)
        this.fetchDataList()
        this.$toast({
          component: ToastificationContent,
          position: 'top-right',
          props: {
            title: 'Berhasil Dihapus',
            icon: 'CoffeIcon',
            variant: 'success',
            text: 'Kategori Berhasil Dihapus',
          },
        })
      }).catch(err => {
        console.log(err)
      })
    },
    formValidate() {
      const errMsg = []
      if (this.inpName.length === 0) {
        errMsg.push('Nama Kategori Wajib Diisi')
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
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>

<style lang="scss" scoped>
.vgt-table {
  font-size: 12px !important;
}
.v-select {
  &.item-selector-title,
  &.payment-selector {
    background-color: #fff;

    .dark-layout & {
      background-color: unset;
    }
  }
}
</style>
