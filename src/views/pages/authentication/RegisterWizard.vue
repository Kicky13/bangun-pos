<template>
  <div>
    <form-wizard
      color="#ea5455"
      :title="null"
      :subtitle="null"
      finish-button-text="Submit"
      back-button-text="Previous"
      class="steps-transparent mb-3"
      @on-complete="formSubmitted"
    >
      <!-- tabs -->
      <tab-content
        v-for="tabpanel in wizardTabs"
        :key="tabpanel.id"
        :title="tabpanel.title"
        :icon="tabpanel.icon"
      >
        <!-- UserData -->
        <b-row v-if="tabpanel.code === 'userdata'">
          <b-col
            cols="12"
            class="mb-2"
          >
            <h5 class="mb-0">
              {{ tabpanel.title }}
            </h5>
            <small class="text-muted">
              {{ tabpanel.subtitle }}
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
                :state="ownerName.length > 0"
              />
              <b-form-invalid-feedback>
                Nama Pemilik wajib diisi
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
                :state="ownerNumber.length > 5 && ownerNumber.charAt(0) === '0'"
                type="number"
              />
              <b-form-invalid-feedback>
                Telp Pemilik wajib diisi
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
                :state="identitas.length > 0"
              />
              <b-form-invalid-feedback>
                Nomor Identitas Pemilik wajib diisi
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
                :state="address.length > 0"
              />
              <b-form-invalid-feedback>
                Alamat Pemilik wajib diisi
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>

        <!-- Support Data -->
        <b-row v-else-if="tabpanel.code === 'support'">
          <b-col
            cols="12"
            class="mb-2"
          >
            <h5 class="mb-0">
              {{ tabpanel.title }}
            </h5>
            <small class="text-muted">
              {{ tabpanel.subtitle }}
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
                  <span>Delete</span>
                </b-button>
              </b-col>
              <b-col cols="12">
                <hr>
              </b-col>
            </b-row>
          </div>
        </b-row>

        <!-- Shop Data -->
        <b-row v-else>
          <b-col
            cols="12"
            class="mb-2"
          >
            <h5 class="mb-0">
              {{ tabpanel.title }}
            </h5>
            <small class="text-muted">
              {{ tabpanel.subtitle }}
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
                :state="shopName.length > 0"
              />
              <b-form-invalid-feedback>
                Nama Toko wajib diisi
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
                :state="shopNumber.length > 5 && shopNumber.charAt(0) === '0'"
              />
              <b-form-invalid-feedback>
                Telp Toko wajib diisi
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
                :state="address.length > 0"
              />
              <b-form-invalid-feedback>
                Alamat Toko wajib diisi
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
      shopLogo: null,
      token: this.formData.token,
      shopCode: this.formData.kode_toko,
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
    this.initTrHeight()
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
      const cashier = []
      const inputItems = this.items
      inputItems.forEach(item => {
        const cashierID = item.namecash
        console.log(cashierID.length)
        if (cashierID.length > 0) {
          cashier.push(cashierID)
          this.cashier.push(cashierID)
        }
      })
      if (this.formValidate()) {
        authService.register({
          nama_toko: this.shopName,
          telp_toko: this.shopNumber,
          alamat: this.address,
          nama_pemilik: this.ownerName,
          no_identitas: this.identitas,
          telp_pemilik: this.ownerNumber,
          alamat_pemilik: this.address,
          kasir: cashier,
          kode_toko: this.shopCode,
        }).then(response => {
          console.log(response)
          const { data } = response
          if (data.result) {
            const userData = authService.getDataToken(data.token)
            const toko = this.setDataUser(userData)
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

      if (!this.ownerName && this.ownerName === '') {
        errMsg.push('Nama Pemilik wajib diisi')
      }
      if (!this.shopName && this.shopName === '') {
        errMsg.push('Nama Toko wajib diisi')
      }
      if (this.ownerNumber.length > 5) {
        errMsg.push('Telp Pemilik wajib diisi minimal 6 karakter')
      }
      if (this.shopNumber.length > 5) {
        errMsg.push('Telp Toko wajib diisi minimal 6 karakter')
      }
      if (!this.ownerNumber.charAt(0) === '0') {
        errMsg.push('no Telp wajib diawali dengan 0')
      }
      if (!this.shopNumber.charAt(0) === '0') {
        errMsg.push('no Telp Toko wajib diawali dengan 0')
      }
      if (!this.address && this.address === '') {
        errMsg.push('Alamat wajib diisi')
      }
      if (!this.identitas && this.identitas === '') {
        errMsg.push('No Identitas wajib diisi')
      }
      if (this.cashier.length === 0) {
        errMsg.push('Cashier minimal 1')
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
