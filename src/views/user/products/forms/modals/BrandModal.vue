<template>
  <b-modal
    id="brandAdd"
    v-model="modalShow"
    centered
    size="lg"
    title="Tambah Brand / Merek"
    ok-title="Simpan"
    cancel-title="Tutup"
    ok-variant="danger"
    @ok="saveData($event)"
    @show="resetModal"
    @hidden="resetModal"
  >
    <b-form>
      <b-row>
        <!-- <b-col
          lg="6"
          md="6"
          sm="12"
        >
          <b-form-group
            label="Kode Brand :"
            label-for="brandCode"
          >
            <b-form-input
              id="brandCode"
              v-model="brandCode"
              name="brandCode"
              :disabled="true"
            />
          </b-form-group>
        </b-col> -->
        <b-col
          lg="12"
          md="12"
          sm="12"
        >
          <b-form-group
            label="Nama Brand :"
            label-for="brandName"
          >
            <b-form-input
              id="brandName"
              v-model="brandName"
              :state="brandName.length > 0"
              name="brandName"
            />
            <b-form-invalid-feedback>
              Nama Brand / Merk wajib diisi
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
            label="Notes :"
            label-for="brandNotes"
          >
            <b-form-textarea
              id="brandNotes"
              v-model="brandNotes"
              name="brandNotes"
              rows="4"
            />
          </b-form-group>
        </b-col>
      </b-row>
    </b-form>
  </b-modal>
</template>

<script>
import {
  BModal, VBModal, BRow, BCol, BForm, BFormGroup, BFormInput, BFormTextarea, BFormInvalidFeedback,
} from 'bootstrap-vue'
// import vSelect from 'vue-select'
// import store from '@/store/index'
import Ripple from 'vue-ripple-directive'
import axios from '@axios'
import authService from '@/connection/connection'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    BModal,
    BForm,
    BFormTextarea,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormInvalidFeedback,
    // vSelect,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  data() {
    return {
      menuHidden: this.$store.state.appConfig.layout.menu.hidden,
      brandCode: '',
      brandName: '',
      brandNotes: '',
      modalShow: false,
    }
  },
  mounted() {
  },
  methods: {
    async saveData(e) {
      e.preventDefault()
      const param = {
        kode_brand: this.brandCode,
        nama_brand: this.brandName,
        notes: this.brandNotes,
      }
      axios({
        method: 'post',
        url: 'brand/store',
        headers: {
          token: authService.getHeaderToken(),
          'content-type': 'application/json',
          accept: 'application/json',
        },
        data: param,
      }).then(response => {
        // console.log(response)
        const { data } = response
        if (data.result) {
          // console.log('Permintaan Sukses')
          this.modalShow = false
          this.$toast({
            component: ToastificationContent,
            props: {
              title: data.message,
              icon: 'CoffeeIcon',
              variant: 'success',
            },
          })
          this.$parent.setListBrand()
        } else {
          // console.log('Permintaan Gagal Diproses')
          this.modalShow = true
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
    resetModal() {
      this.brandCode = ''
      this.brandName = ''
      this.brandNotes = ''
    },
  },
}
</script>
