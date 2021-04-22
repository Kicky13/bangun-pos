<template>
  <b-modal
    id="subcategoryAdd"
    v-model="modalShow"
    centered
    size="lg"
    title="Tambah Sub Kategori"
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
            label="Kode Sub Kategori :"
            label-for="subcategoryCode"
          >
            <b-form-input
              id="subcategoryCode"
              v-model="subcategoryCode"
              name="subcategoryCode"
              :disabled="true"
            />
          </b-form-group>
        </b-col>
        <b-col
          lg="6"
          md="6"
          sm="12"
        /> -->
        <b-col
          lg="6"
          md="6"
          sm="12"
        >
          <b-form-group
            label="Kategori :"
            label-for="categoryCode"
          >
            <b-form-select
              id="category"
              v-model="selectedCategory"
              :state="selectedCategory != null"
              name="category"
              :options="categoryItems"
            />
            <b-form-invalid-feedback>
              Kategori wajib dipilih
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
        <b-col
          lg="6"
          md="6"
          sm="12"
        >
          <b-form-group
            label="Nama Sub Kategori :"
            label-for="subcategoryName"
          >
            <b-form-input
              id="subcategoryName"
              v-model="subcategoryName"
              :state="subcategoryName.length > 0"
              name="subcategoryName"
            />
            <b-form-invalid-feedback>
              Nama Sub Kategori wajib diisi
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
            label-for="subcategoryNotes"
          >
            <b-form-textarea
              id="subcategoryNotes"
              v-model="subcategoryNotes"
              name="subcategoryNotes"
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
  BModal, VBModal, BRow, BCol, BFormGroup, BFormInput, BFormTextarea, BFormSelect, BFormInvalidFeedback,
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
    BFormSelect,
    BFormInvalidFeedback,
    //  vSelect,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  data() {
    return {
      menuHidden: this.$store.state.appConfig.layout.menu.hidden,
      selectedCategory: null,
      subcategoryCode: '',
      subcategoryName: '',
      subcategoryNotes: '',
      modalShow: false,
      categoryItems: [
        {
          value: null,
          text: 'Pilih salah satu kategori',
          disabled: true,
        },
      ],
    }
  },
  mounted() {
    this.setListCategory()
  },
  methods: {
    async saveData(e) {
      e.preventDefault()
      const param = {
        id_category: this.selectedCategory,
        kode_category: this.subcategoryCode,
        nama_category: this.subcategoryName,
        note_category: this.subcategoryNotes,
      }
      axios({
        method: 'post',
        url: 'subcategory/store',
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
          this.$parent.setListSubCategory()
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
      this.subcategoryCode = ''
      this.subcategoryName = ''
      this.subcategoryNotes = ''
      this.selectedCategory = null
    },
    setListCategory() {
      axios({
        method: 'post',
        url: 'category',
        headers: {
          token: authService.getHeaderToken(),
          'content-type': 'application/json',
          accept: 'application/json',
        },
      }).then(response => {
        const { data } = response
        this.categoryItems = []
        this.categoryItems.push({
          value: null,
          text: 'Pilih salah satu kategori',
          disabled: true,
        })
        if (data.data) {
          // console.log(data.data)
          const categorylist = data.data
          categorylist.forEach(item => {
            this.categoryItems.push({
              value: item.id,
              text: item.nama_category,
            })
          })
        }
      })
    },
  },
}
</script>
