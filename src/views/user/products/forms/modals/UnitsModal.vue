<template>
  <b-modal
    id="unitsAdd"
    v-model="modalShow"
    centered
    size="lg"
    title="Tambah Units / UOM"
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
            label="Kode Unit :"
            label-for="unitCode"
          >
            <b-form-input
              id="unitCode"
              v-model="unitCode"
              name="unitCode"
              :disabled="true"
            />
          </b-form-group>
        </b-col> -->
        <b-col
          lg="6"
          md="6"
          sm="12"
        >
          <b-form-group
            label="Nama Unit :"
            label-for="unitName"
          >
            <b-form-input
              id="unitName"
              v-model="unitName"
              :state="unitName.length > 0"
              name="unitName"
            />
            <b-form-invalid-feedback>
              Nama Satuan / Unit wajib diisi
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
            label-for="unitNotes"
          >
            <b-form-textarea
              id="unitNotes"
              v-model="unitNotes"
              name="unitNotes"
              rows="5"
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
      unitCode: '',
      unitName: '',
      unitNotes: '',
      modalShow: false,
    }
  },
  mounted() {
  },
  methods: {
    async saveData(e) {
      e.preventDefault()
      const param = {
        kode_uom: this.unitCode,
        nama_uom: this.unitName,
        note_uom: this.unitNotes,
      }
      axios({
        method: 'post',
        url: 'uom/store',
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
          this.$parent.setListUOM()
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
      this.unitCode = ''
      this.unitName = ''
      this.unitNotes = ''
    },
  },
}
</script>
