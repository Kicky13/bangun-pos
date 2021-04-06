<template>
  <b-modal
    id="typeAdd"
    v-model="modalShow"
    centered
    size="lg"
    title="Tambah Tipe"
    ok-title="Simpan"
    cancel-title="Tutup"
    ok-variant="danger"
    @ok="saveData($event)"
    @show="resetModal"
    @hidden="resetModal"
  >
    <b-form>
      <b-row>
        <b-col
          lg="6"
          md="6"
          sm="12"
        >
          <b-form-group
            label="Kode Tipe :"
            label-for="typeCode"
          >
            <b-form-input
              id="typeCode"
              v-model="typeCode"
              name="typeCode"
              :disabled="true"
            />
          </b-form-group>
        </b-col>
        <b-col
          lg="6"
          md="6"
          sm="12"
        >
          <b-form-group
            label="Nama Tipe :"
            label-for="typeName"
          >
            <b-form-input
              id="typeName"
              v-model="typeName"
              :state="typeName.length > 0"
              name="typeName"
            />
            <b-form-invalid-feedback>
              Nama Tipe wajib diisi
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
            label-for="typeNotes"
          >
            <b-form-textarea
              id="typeNotes"
              v-model="typeNotes"
              name="typeNotes"
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
  BModal, VBModal, BRow, BCol, BFormGroup, BFormInput, BFormTextarea, BFormInvalidFeedback,
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
      typeCode: '',
      typeName: '',
      typeNotes: '',
      modalShow: false,
    }
  },
  mounted() {
  },
  methods: {
    async saveData(e) {
      e.preventDefault()
      const param = {
        kode_type: this.typeCode,
        nama_type: this.typeName,
        note_type: this.typeNotes,
      }
      axios({
        method: 'post',
        url: 'type/store',
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
          this.$parent.setListType()
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
      this.typeCode = ''
      this.typeName = ''
      this.typeNotes = ''
    },
  },
}
</script>
