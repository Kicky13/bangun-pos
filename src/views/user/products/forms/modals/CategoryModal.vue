<template>
  <b-modal
    id="categoryAdd"
    v-model="modalShow"
    centered
    size="lg"
    title="Tambah Kategori"
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
            label="Kode Kategori :"
            label-for="categoryCode"
          >
            <b-form-input
              id="categoryCode"
              v-model="categoryCode"
              name="categoryCode"
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
            label="Nama Kategori :"
            label-for="categoryName"
          >
            <b-form-input
              id="categoryName"
              v-model="categoryName"
              :state="categoryName.length > 0"
              name="categoryName"
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
            label="Notes :"
            label-for="categoryNotes"
          >
            <b-form-textarea
              id="categoryNotes"
              v-model="categoryNotes"
              name="categoryNotes"
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
      categoryCode: '',
      categoryName: '',
      categoryNotes: '',
      modalShow: false,
    }
  },
  mounted() {
  },
  methods: {
    async saveData(e) {
      e.preventDefault()
      const param = {
        kode_category: this.categoryCode,
        nama_category: this.categoryName,
        note_category: this.categoryNotes,
      }
      axios({
        method: 'post',
        url: 'category/store',
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
          this.$parent.setListCategory()
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
      this.categoryCode = ''
      this.categoryName = ''
      this.categoryNotes = ''
    },
  },
}
</script>
