<template>
  <div>
    <loading-grow v-if="isLoading" />
    <form-wizard
      color="#b20838"
      :title="null"
      :subtitle="null"
      finish-button-text="Simpan"
      back-button-text="Sebelumnya"
      next-button-text="Lanjut"
      class="steps-transparent mb-3"
      @on-complete="confirmSubmit"
    >
      <!-- tabs -->
      <tab-content
        title="Data Pemilik"
        icon="feather icon-user"
        :before-change="validateFirstTab"
      >
        <b-row>
          <b-col
            cols="12"
            class="mb-2"
          >
            <h5 class="mb-0">
              Data Pemilik
            </h5>
            <small class="text-muted">
              Isi data diri anda sebagai pemilik toko
            </small>
          </b-col>
          <b-col md="6">
            <b-form-group
              label="Nama :"
              label-for="name"
            >
              <b-form-input
                id="nama"
                v-model="ownerName"
                :state="ownerName.length > 2"
              />
              <b-form-invalid-feedback>
                Nama Pemilik Wajib Diisi
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col md="6" />
          <b-col md="6">
            <b-form-group
              label="No. Handphone :"
              label-for="phone"
            >
              <b-form-input
                id="phone"
                v-model="ownerNumber"
                :state="ownerNumber.length >= 10 && ownerNumber.length <= 12 && ownerNumber.charAt(0) === '0'"
                type="number"
              />
              <b-form-invalid-feedback>
                Telp Pemilik Wajib Diisi Minimal 10 Karakter, Maksimal 12 Karakter dan dan Diawali Angka 0 (Contoh Format : 081234567890)
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group
              label="No. Identitas :"
              label-for="identity"
            >
              <b-form-input
                id="identity"
                v-model="identitas"
                type="number"
                :state="identitas.length > 0 && identitas.length === 16"
              />
              <b-form-invalid-feedback>
                Nomor Identitas Pemilik Wajib Diisi 16 Angka
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col md="12">
            <b-form-group
              label="Alamat :"
              label-for="address"
            >
              <b-form-textarea
                id="address"
                v-model="address"
                rows="3"
                :state="address.length > 3"
              />
              <b-form-invalid-feedback>
                Alamat Pemilik Wajib Diisi
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
      </tab-content>
      <tab-content
        title="Data Toko"
        icon="feather icon-shopping-bag"
        :before-change="validateSecondTab"
      >
        <b-row>
          <b-col
            cols="12"
            class="mb-2"
          >
            <h5 class="mb-0">
              Data Toko
            </h5>
            <small class="text-muted">
              Lengkapi form dibawah ini dengan data toko anda
            </small>
          </b-col>
          <b-col md="6">
            <b-form-group
              label="Nama Toko :"
              label-for="shopname"
            >
              <b-form-input
                id="shopname"
                v-model="shopName"
                :state="shopName.length > 2"
              />
              <b-form-invalid-feedback>
                Nama Toko Wajib Diisi
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group
              label="Logo Toko (* .PNG / .JPEG Maks 500KB) :"
              label-for="shoplogo"
            >
              <b-form-file
                id="shoplogo"
                accept="image/jpeg, image/png"
                :state="logoSize <= 500000 && allowedTipeFile === 1"
                @change="saveImage"
              />
              <b-form-invalid-feedback>
                Ukuran Maksimal 500kB dengan tipe .PNG / .JPEG
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group
              label="Telp. Toko :"
              label-for="shopphone"
            >
              <b-form-input
                id="shopphone"
                v-model="shopNumber"
                type="number"
                :state="shopNumber.length >= 10 && shopNumber.length <= 12 && shopNumber.charAt(0) === '0'"
              />
              <b-form-invalid-feedback>
                Telp Toko Wajib Diisi Minimal 10 Karakter, Maksimal 12 Karakter dan Diawali Angka 0 (Contoh Format : 081234567890)
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group
              label="Alamat :"
              label-for="shopaddress"
            >
              <b-form-textarea
                id="shopaddress"
                v-model="shopAddress"
                rows="3"
                :state="shopAddress.length > 3"
              />
              <b-form-invalid-feedback>
                Alamat Toko Wajib Diisi
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Logo Preview :">
              <b-img
                v-if="imageURL"
                v-bind="previewSetting"
                :src="imageURL"
                alt="Logo"
                style="min-width: 100%"
              />
              <b-img
                v-else
                v-bind="previewSetting"
                :src="require('@/assets/images/slider/06.jpg')"
                alt="Logo"
                style="min-width: 100%"
              />
            </b-form-group>
          </b-col>
        </b-row>
      </tab-content>
      <tab-content
        title="Data Pendukung"
        icon="feather icon-briefcase"
        :before-change="validateLastTab"
      >
        <b-row>
          <b-col
            cols="12"
            class="mb-2"
          >
            <h5 class="mb-0">
              Data Pendukung
            </h5>
            <small class="text-muted">
              Lengkapi form dibawah ini untuk mempermudah transaksi anda
            </small>
          </b-col>
          <b-col md="12">
            <h3>Data Kasir</h3>
            <div>
              <b-button
                variant="primary"
                class="btn-icon"
                style="margin-bottom: 10px;"
                @click="repeateAgain"
              >
                <feather-icon icon="PlusIcon" />
                <span>Tambahkan Kasir</span>
              </b-button>
            </div>
          </b-col>
          <div style="margin-left: 10px;">
            <b-row
              v-for="(item, index) in cashierList"
              :id="item.uuid"
              :key="item.uuid"
              ref="row"
            >

              <!-- Item Name -->
              <b-col md="8">
                <b-form-group
                  label="Kasir"
                  label-for="cashier"
                >
                  <b-form-input
                    id="cashier"
                    v-model="item.name"
                    type="text"
                  />
                </b-form-group>
              </b-col>

              <!-- Remove Button -->
              <b-col
                md="4"
              >
                <b-button
                  v-ripple.400="'rgba(234, 84, 85, 0.15)'"
                  variant="outline-danger"
                  class="btn-icon mt-0 mt-md-2"
                  @click="removeItem(index, item)"
                >
                  <feather-icon
                    icon="XIcon"
                  />
                  <span>Hapus</span>
                </b-button>
              </b-col>
              <b-col cols="12">
                <hr>
              </b-col>
            </b-row>
          </div>
        </b-row>
      </tab-content>
    </form-wizard>
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
      @ok="deleteCashier"
      @cancel="handleCancelDelete"
    >
      <div class="d-block text-center">
        <h3>Apakah Anda Sudah Yakin ?</h3>
      </div>
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
      @ok="formSubmitted"
      @cancel="handleCancelSubmit"
    >
      <div class="d-block text-center">
        <h3>Apakah Anda Sudah Yakin ?</h3>
      </div>
    </b-modal>
    <alert-token />
  </div>
</template>

<script>
import { FormWizard, TabContent } from 'vue-form-wizard'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import {
  BRow, BCol, BFormGroup, BFormTextarea, BFormInput, BButton, BImg, BFormFile, BFormInvalidFeedback,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import ApiService from '@/connection/apiService'
import { heightTransition } from '@core/mixins/ui/transition'
import authService from '@/connection/connection'
import LoadingGrow from '@core/components/loading-process/LoadingGrow.vue'
import AlertToken from '@core/components/expired-token/AlertToken.vue'

const appService = new ApiService()

export default {
  directives: {
    Ripple,
  },
  components: {
    FormWizard,
    TabContent,
    BRow,
    BCol,
    BButton,
    BImg,
    BFormFile,
    BFormGroup,
    BFormTextarea,
    BFormInput,
    BFormInvalidFeedback,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
    LoadingGrow,
    AlertToken,
  },
  mixins: [heightTransition],
  props: {
    formData: {
      type: Object,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      deletedCashier: null,
      removeIndex: 0,
      isLoading: false,
      items: [{
        id: 1,
        namecash: '',
      }],
      cashier: [],
      nextTodoId: 2,
      previewSetting: {
        fluid: true,
        thumbnail: true,
        // width: 230,
        // height: 210,
      },
      ownerName: '',
      ownerNumber: '',
      shopName: '',
      shopNumber: '',
      shopAddress: '',
      address: '',
      identitas: '',
      shopCode: '',
      logoSize: 0,
      allowedTipeFile: 1,
      shopLogo: null,
      token: '',
      imageURL: null,
      defaultImageURL: null,
      cashierList: [],
      selectedContry: 'select_value',
      selectedLanguage: 'nothing_selected',
      wizardTabs: [
        {
          id: 1,
          code: 'userdata',
          title: 'Data Pemilik',
          subtitle: 'Isi data diri anda sebagai pemilik toko',
          icon: 'feather icon-user',
        },
        {
          id: 2,
          code: 'shop',
          title: 'Data Toko',
          subtitle: 'Lengkapi form dibawah ini dengan data toko anda',
          icon: 'feather icon-shopping-bag',
        },
        {
          id: 3,
          code: 'support',
          title: 'Data Pendukung',
          subtitle: 'Lengkapi form dibawah ini untuk mempermudah transaksi anda',
          icon: 'feather icon-briefcase',
        },
      ],
    }
  },
  mounted() {
  },
  created() {
    this.fetchProfile()
    window.addEventListener('resize', this.initTrHeight)
  },
  destroyed() {
    window.removeEventListener('resize', this.initTrHeight)
  },
  methods: {
    validateFirstTab() {
      const errMsg = []
      if ((!this.ownerName && this.ownerName === '') || this.ownerName.length < 3) {
        errMsg.push('Nama Pemilik Wajib Diisi, Minimal 3 Karakter')
      }
      if (this.ownerNumber.length < 10 || this.ownerNumber.length > 12) {
        errMsg.push('Telp Pemilik Wajib Diisi Minimal 10 Karakter & Maksimal 12 Karakter')
      }
      if (this.ownerNumber.charAt(0) === '0') {
        console.log('No Telp Pemilik Sudah Diawali Dengan Angka 0')
      } else {
        errMsg.push('No Telp Pemilik Wajib Diawali Dengan Angka 0')
      }
      if ((!this.address && this.address === '') || this.address.length < 3) {
        errMsg.push('Alamat Wajib Diisi, Minimal 3 Karakter')
      }
      if ((!this.identitas && this.identitas === '') || this.identitas.length !== 16) {
        errMsg.push('No Identitas Wajib Diisi 16 Digits Angka')
      }
      if (errMsg.length === 0) {
        return true
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
      return false
    },
    validateSecondTab() {
      const errMsg = []
      if ((!this.shopName && this.shopName === '') || this.shopName.length < 3) {
        errMsg.push('Nama Toko Wajib Diisi, Minimal 3 Karakter')
      }
      if (this.shopNumber.length < 10 || this.shopNumber.length > 12) {
        errMsg.push('Telp Toko Wajib Diisi Minimal 10 Karakter & Maksimal 12 Karakter')
      }
      if (this.shopNumber.charAt(0) === '0') {
        console.log('No Telp Pemilik Sudah Diawali Dengan Angka 0')
      } else {
        errMsg.push('No Telp Pemilik Wajib Diawali Dengan Angka 0')
      }
      if ((!this.shopAddress && this.shopAddress === '') || this.ownerName.length < 3) {
        errMsg.push('Alamat Wajib Diisi, Minimal 3 Karakter')
      }
      if (this.logoSize > 500000) {
        errMsg.push('Ukuran Logo Tidak Boleh Melebihi 500KB')
      }
      if (this.allowedTipeFile === 0) {
        errMsg.push('Harus Menggunkan File Dengan Tipe .PNG / .JPEG')
      }
      if (errMsg.length === 0) {
        return true
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
      return false
    },
    validateLastTab() {
      const errMsg = []
      if (errMsg.length === 0) {
        return true
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
      return false
    },
    async fetchProfile() {
      this.cashierList = []
      this.isLoading = true
      appService.getProfileUser().then(response => {
        const { data } = response
        const res = response.data.data
        this.isLoading = false
        if (data.result) {
          // console.log(res)
          this.ownerName = res.nama_pemilik ?? ''
          this.ownerNumber = res.telp_pemilik ?? ''
          this.identitas = res.no_identitas ?? ''
          this.address = res.alamat ?? ''
          this.shopName = res.nama_toko ?? ''
          this.shopNumber = res.telp_toko ?? ''
          this.shopAddress = res.alamat_pemilik ?? ''
          this.shopCode = res.kode_toko ?? ''
          // this.shopLogo = res.logo_toko
          // this.token = res.kode_toko
          this.imageURL = res.logo_toko ?? null
          this.defaultImageURL = res.logo_toko ?? null
          const itemlist = res.kasir
          itemlist.forEach(item => {
            this.cashierList.push({
              id: item.id,
              name: item.name,
              uuid: item.uuid,
              status: 'update',
            })
          })
        } else {
          this.$bvModal.show('tokenExpired')
        }
      }).catch(err => {
        console.log(err)
        this.isLoading = false
      })
    },
    async formSubmitted() {
      this.isLoading = true
      const param = new FormData()
      const cashier = []
      const inputItems = this.cashierList
      inputItems.forEach(item => {
        const cashierID = item.name
        // console.log(cashierID.length)
        if (cashierID.length > 0) {
          cashier.push(cashierID)
          param.append('kasir[]', cashierID)
          param.append('status[]', item.status)
          param.append('id_kasir[]', item.uuid)
          this.cashier.push(cashierID)
        }
      })
      if (this.formValidate()) {
        param.append('nama_toko', this.shopName)
        // param.append('logo_toko', this.shopLogo)
        if (this.shopLogo !== null) {
          param.append('logo_toko', this.shopLogo)
        }
        param.append('telp_toko', this.shopNumber)
        param.append('alamat_toko', this.shopAddress)
        param.append('nama_pemilik', this.ownerName)
        param.append('no_identitas', this.identitas)
        param.append('telp_pemilik', this.ownerNumber)
        param.append('alamat_pemilik', this.address)
        // param.append('kasir', cashier)
        param.append('kode_toko', this.shopCode)
        appService.updateProfileUser(param).then(response => {
          const { data } = response
          this.isLoading = false
          if (data.result) {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: data.message,
                icon: 'CoffeeIcon',
                variant: 'success',
              },
            })
            this.fetchProfile()
          } else {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: data.message,
                icon: 'AlertCircleIcon',
                variant: 'danger',
              },
            })
          }
        })
      } else {
        this.isLoading = false
        console.log(this.formErr)
      }
    },
    repeateAgain() {
      this.cashierList.push({
        id: 0,
        name: '',
        uuid: null,
        status: 'insert',
      })
      // this.$nextTick(() => {
      //   this.trAddHeight(this.$refs.row[0].offsetHeight)
      // })
    },
    removeItem(index, item) {
      // console.log(index)
      // this.items.splice(index, 1)
      if (item.id === 0) {
        this.cashierList.splice(index, 1)
      } else {
        // console.log(item)
        this.removeIndex = index
        this.confirmDelete(item)
      }
      // this.trTrimHeight(this.$refs.row[0].offsetHeight)
    },
    handleCancelDelete() {
      this.deleteCashier = null
    },
    handleCancelSubmit() {
      console.log('Batal Submit')
    },
    confirmSubmit() {
      this.$bvModal.show('askSubmit')
    },
    confirmDelete(param) {
      this.deleteCashier = param.uuid
      this.$bvModal.show('askDelete')
    },
    async deleteCashier() {
      this.isLoading = true
      appService.deleteCashier(this.deleteCashier).then(response => {
        const { data } = response
        this.isLoading = false
        if (data.result) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: data.message,
              icon: 'CoffeeIcon',
              variant: 'success',
            },
          })
          this.cashierList.splice(this.removeIndex, 1)
        } else {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: data.message,
              icon: 'AlertCircleIcon',
              variant: 'danger',
            },
          })
        }
      })
    },
    initTrHeight() {
      this.trSetHeight(null)
      this.$nextTick(() => {
        this.trSetHeight(this.$refs.form.scrollHeight)
      })
    },
    saveImage(e) {
      const logo = e.target.files[0]
      // console.log(logo)
      if (logo) {
        this.logoSize = logo.size
        // console.log(this.logoSize)
        if (logo.size <= 500000 && ((logo.type).toLowerCase() === 'image/png' || (logo.type).toLowerCase() === 'image/jpeg' || (logo.type).toLowerCase() === 'image/jpg')) {
          this.allowedTipeFile = 1
          this.shopLogo = logo
          this.imageURL = URL.createObjectURL(logo)
        } else {
          this.shopLogo = null
          this.imageURL = null
          if (logo.size > 500000) {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Ukuran Logo Tidak Boleh Melebihi 500KB',
                icon: 'AlertCircleIcon',
                variant: 'danger',
              },
            })
          }
          if ((logo.type).toLowerCase() === 'image/png' || (logo.type).toLowerCase() === 'image/jpeg' || (logo.type).toLowerCase() === 'image/jpg') {
            console.log(logo.type)
          } else {
            this.allowedTipeFile = 0
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Harus Menggunkan File Dengan Tipe .PNG / .JPEG',
                icon: 'AlertCircleIcon',
                variant: 'danger',
              },
            })
          }
        }
      } else {
        this.shopLogo = null
        this.imageURL = this.defaultImageURL
        this.logoSize = 0
      }
    },
    setDataUser(data) {
      const userAbility = authService.getAbility(data.role)
      const { toko } = data
      const userData = {
        id: toko.id_toko,
        fullName: toko.nama_pemilik,
        username: toko.kode_toko,
        password: data.role,
        // eslint-disable-next-line global-require
        avatar: require('@/assets/images/avatars/13-small.png'),
        email: 'user@demo.com',
        role: data.role,
        ability: userAbility,
      }
      return userData
    },
    formValidate() {
      const errMsg = []
      if ((!this.ownerName && this.ownerName === '') || this.ownerName.length < 3) {
        errMsg.push('Nama Pemilik Wajib Diisi, Minimal 3 Karakter')
      }
      if (this.ownerNumber.length < 10 || this.ownerNumber.length > 12) {
        errMsg.push('Telp Pemilik Wajib Diisi Minimal 10 Karakter & Maksimal 12 Karakter')
      }
      if (this.ownerNumber.charAt(0) === '0') {
        console.log('No Telp Pemilik Sudah Diawali Dengan Angka 0')
      } else {
        errMsg.push('No Telp Pemilik Wajib Diawali Dengan Angka 0')
      }
      if ((!this.address && this.address === '') || this.address.length < 3) {
        errMsg.push('Alamat Wajib Diisi, Minimal 3 Karakter')
      }
      if ((!this.identitas && this.identitas === '') || this.identitas.length !== 16) {
        errMsg.push('No Identitas Wajib Diisi 16 Digits Angka')
      }
      if ((!this.shopName && this.shopName === '') || this.shopName.length < 3) {
        errMsg.push('Nama Toko Wajib Diisi, Minimal 3 Karakter')
      }
      if (this.shopNumber.length < 10 || this.shopNumber.length > 12) {
        errMsg.push('Telp Toko Wajib Diisi Minimal 10 Karakter & Maksimal 12 Karakter')
      }
      if (this.shopNumber.charAt(0) === '0') {
        console.log('No Telp Pemilik Sudah Diawali Dengan Angka 0')
      } else {
        errMsg.push('No Telp Pemilik Wajib Diawali Dengan Angka 0')
      }
      if ((!this.shopAddress && this.shopAddress === '') || this.ownerName.length < 3) {
        errMsg.push('Alamat Wajib Diisi, Minimal 3 Karakter')
      }
      if (this.logoSize > 500000) {
        errMsg.push('Ukuran Logo Tidak Boleh Melebihi 500KB')
      }
      if (this.allowedTipeFile === 0) {
        errMsg.push('Harus Menggunkan File Dengan Tipe .PNG / .JPEG')
      }
      if (this.cashier.length === 0) {
        errMsg.push('Tambahkan Cashier Minimal 1')
      }
      if (errMsg.length === 0) {
        return true
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
      return false
    },
  },
}
</script>
