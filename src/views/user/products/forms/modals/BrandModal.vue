<template>
  <b-modal
    id="brandAdd"
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
        <b-col cols="6">
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
        </b-col>
        <b-col cols="6">
          <b-form-group
            label="Nama Brand :"
            label-for="brandName"
          >
            <b-form-input
              id="brandName"
              v-model="brandName"
              name="brandName"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
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
  BModal, VBModal, BRow, BCol, BFormGroup, BFormInput, BFormTextarea,
} from 'bootstrap-vue'
// import vSelect from 'vue-select'
// import store from '@/store/index'
import Ripple from 'vue-ripple-directive'
import axios from '@axios'
import authService from '@/connection/connection'

export default {
  components: {
    BModal,
    BFormTextarea,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
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
        note_brand: this.brandNotes,
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
        } else {
          // console.log('Permintaan Gagal Diproses')
          this.modalShow = true
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
