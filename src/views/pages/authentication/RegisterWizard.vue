<template>
  <div>
    <loading-grow v-if="isLoading" />
    <form-wizard
      color="#b20838"
      :title="null"
      :subtitle="null"
      finish-button-text="Submit"
      back-button-text="Previous"
      class="steps-transparent mb-3"
      @on-complete="formSubmitted"
    >
      <!-- tabs -->

      <!-- Ownerdata -->
      <tab-content
        key="1"
        title="Data Pemilik"
        icon="feather icon-user"
        :before-change="validationOwner"
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
              Isi Data diri anda sebagai pemilik toko
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

      <!-- ShopData -->
      <tab-content
        key="2"
        title="Data Toko"
        icon="feather icon-shopping-bag"
        :before-change="validationShop"
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
                :state="shopName.length > 3"
              />
              <b-form-invalid-feedback>
                Nama Toko Wajib Diisi
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group
              label="Logo Toko :"
              label-for="shoplogo"
            >
              <b-form-file
                id="shoplogo"
                @change="saveImage"
              />
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
                v-model="address"
                rows="3"
                :state="address.length > 3"
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
              />
              <b-img
                v-else
                v-bind="previewSetting"
                :src="require('@/assets/images/slider/06.jpg')"
                alt="Logo"
              />
            </b-form-group>
          </b-col>
        </b-row>
      </tab-content>

      <!-- Support Data -->
      <tab-content
        key="3"
        title="Data Pendukung"
        icon="feather icon-briefcase"
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
              Lengkapi form dibawah ini untuk mempermudah anda bertransaksi
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
              v-for="(item, index) in items"
              :id="item.id"
              :key="item.id"
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
                    v-model="item.namecash"
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
                  @click="removeItem(index)"
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
import { heightTransition } from '@core/mixins/ui/transition'
import authService from '@/connection/connection'
import { getHomeRouteForLoggedInUser } from '@/auth/utils'
import LoadingGrow from '@core/components/loading-process/LoadingGrow.vue'

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
        width: 230,
        height: 210,
      },
      ownerName: this.formData.nama_pemilik ?? '',
      ownerNumber: this.formData.telp_pemilik ?? '',
      shopName: this.formData.nama_toko ?? '',
      shopNumber: this.formData.telp_toko ?? '',
      address: this.formData.alamat ?? '',
      identitas: this.formData.no_identitas ?? '',
      shopCode: this.formData.kode_toko ?? '',
      shopLogo: null,
      token: this.formData.token,
      imageURL: null,
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
    localStorage.removeItem('userData')
    // this.initTrHeight()
    authService.setRegisterToken(this.formData.token)
    console.log(this.formData)
  },
  created() {
    window.addEventListener('resize', this.initTrHeight)
  },
  destroyed() {
    window.removeEventListener('resize', this.initTrHeight)
  },
  methods: {
    async formSubmitted() {
      this.isLoading = true
      const param = new FormData()
      const cashier = []
      const inputItems = this.items
      inputItems.forEach(item => {
        const cashierID = item.namecash
        console.log(cashierID.length)
        if (cashierID.length > 0) {
          cashier.push(cashierID)
          param.append('kasir[]', cashierID)
          this.cashier.push(cashierID)
        }
      })
      if (this.formValidate()) {
        param.append('nama_toko', this.shopName)
        param.append('logo_toko', this.shopLogo)
        param.append('telp_toko', this.shopNumber)
        param.append('alamat', this.address)
        param.append('nama_pemilik', this.ownerName)
        param.append('no_identitas', this.identitas)
        param.append('telp_pemilik', this.ownerNumber)
        param.append('alamat_pemilik', this.address)
        // param.append('kasir', cashier)
        param.append('kode_toko', this.shopCode)
        authService.register(param).then(response => {
          const { data } = response
          if (data.result) {
            const userData = authService.getDataToken(data.token)
            const toko = this.setDataUser(userData)
            localStorage.removeItem('userData')
            localStorage.setItem('userData', JSON.stringify(toko))
            authService.setToken(data.token)
            console.log(data.token)
            const userAbility = authService.getAbility(userData.role)
            this.$ability.update(userAbility)

            this.$router.replace(getHomeRouteForLoggedInUser(userData.role))
              .then(() => {
                this.$toast({
                  component: ToastificationContent,
                  position: 'top-right',
                  props: {
                    title: `Welcome ${toko.fullName || toko.username}`,
                    icon: 'CoffeeIcon',
                    variant: 'success',
                    text: `You have successfully logged in as ${userData.role}. Now you can start to explore!`,
                  },
                })
              })
              .catch(error => {
                console.log(error)
                this.isLoading = false
              })
          } else {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: data.status,
                icon: 'AlertCircleIcon',
                variant: 'danger',
              },
            })
          }
        })
      } else {
        console.log(this.formErr)
      }
    },
    repeateAgain() {
      this.items.push({
        id: this.nextTodoId += this.nextTodoId,
        namecash: '',
      })

      this.$nextTick(() => {
        this.trAddHeight(this.$refs.row[0].offsetHeight)
      })
    },
    removeItem(index) {
      this.items.splice(index, 1)
      this.trTrimHeight(this.$refs.row[0].offsetHeight)
    },
    initTrHeight() {
      this.trSetHeight(null)
      this.$nextTick(() => {
        this.trSetHeight(this.$refs.form.scrollHeight)
      })
    },
    saveImage(e) {
      const logo = e.target.files[0]
      this.shopLogo = logo
      this.imageURL = URL.createObjectURL(logo)
      console.log(logo)
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
    validationOwner() {
      const errMsg = []

      if (this.ownerName.length < 3) {
        errMsg.push('Nama Pemilik Wajib Diisi minimal 3 karakter')
      }
      if (this.ownerNumber.charAt(0) !== '0') {
        errMsg.push('No Telp Pemilik Wajib Diawali Dengan Angka 0')
      }
      if (this.ownerNumber.length < 10 || this.ownerNumber.length > 12) {
        errMsg.push('Telp Pemilik Wajib Diisi Minimal 10 Karakter & Maksimal 12 Karakter')
      }
      if (this.identitas.length !== 16) {
        errMsg.push('No Identitas Wajib Diisi nomor 16 karakter')
      }
      if (!this.address && this.address === '') {
        errMsg.push('Alamat Wajib Diisi')
      }

      if (errMsg.length > 0) {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Lengkapi terlebih dahulu form sebelum melanjutkan',
            icon: 'AlertCircleIcon',
            variant: 'danger',
          },
        })
      }
      return new Promise((resolve, reject) => {
        if (errMsg.length === 0) {
          console.log(errMsg)
          resolve(true)
        } else {
          reject()
        }
      })
    },
    validationShop() {
      const errMsg = []

      if (!this.shopName && this.shopName === '') {
        errMsg.push('Nama Toko Wajib Diisi')
      }
      if (this.shopNumber.length < 10 || this.shopNumber.length > 12) {
        errMsg.push('Telp Toko Wajib Diisi Minimal 10 Karakter & Maksimal 12 Karakter')
      }
      if (!this.shopNumber.charAt(0) === '0') {
        errMsg.push('No Telp Toko Wajib Diawali Dengan Angka 0')
      }
      if (!this.address && this.address === '') {
        errMsg.push('Alamat Wajib Diisi')
      }
      if (this.shopLogo) {
        const { name, size } = this.shopLogo
        const fileExt = name.split('.').pop()

        if (fileExt !== 'jpg' && fileExt !== 'png') {
          errMsg.push('Logo harus berekstensi jpg atau png')
        }
        if (size > 5000000) {
          errMsg.push('Ukuran maksimal file 5mb')
        }
      }

      console.log(errMsg)

      if (errMsg.length > 0) {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Lengkapi terlebih dahulu form sebelum melanjutkan',
            icon: 'AlertCircleIcon',
            variant: 'danger',
          },
        })
      }

      return new Promise((resolve, reject) => {
        if (errMsg.length === 0) {
          resolve(true)
        } else {
          reject()
        }
      })
    },
    formValidate() {
      const errMsg = []

      if (!this.ownerName.length > 3) {
        errMsg.push('Nama Pemilik Wajib Diisi minimal 3 karakter')
      }
      if (!this.shopName && this.shopName === '') {
        errMsg.push('Nama Toko Wajib Diisi')
      }
      if (this.ownerNumber.length < 10 || this.ownerNumber.length > 12) {
        errMsg.push('Telp Pemilik Wajib Diisi Minimal 10 Karakter & Maksimal 12 Karakter')
      }
      if (this.shopNumber.length < 10) {
        errMsg.push('Telp Toko Wajib Diisi Minimal 10 Karakter & Maksimal 12 Karakter')
      }
      if (!this.ownerNumber.charAt(0) === '0') {
        errMsg.push('No Telp Pemilik Wajib Diawali Dengan Angka 0')
      }
      if (!this.shopNumber.charAt(0) === '0') {
        errMsg.push('No Telp Toko Wajib Diawali Dengan Angka 0')
      }
      if (!this.address && this.address === '') {
        errMsg.push('Alamat Wajib Diisi')
      }
      if (!this.identitas.length === 16) {
        errMsg.push('No Identitas Wajib Diisi nomor 16 karakter')
      }
      if (this.cashier.length === 0) {
        errMsg.push('tambahkan Cashier Minimal 1')
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
