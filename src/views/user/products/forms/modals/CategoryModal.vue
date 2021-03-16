<template>
  <b-modal
    id="categoryAdd"
    centered
    size="lg"
    title="Tambah Kategori"
    ok-title="Simpan"
    cancel-title="Tutup"
    ok-variant="danger"
  >
    <b-form>
      <b-row>
        <b-col cols="6">
          <b-form-group
            label="Kode Kategori :"
            label-for="categoryCode"
          >
            <b-form-input
              id="categoryCode"
              :disabled="true"
            />
          </b-form-group>
        </b-col>
        <b-col cols="6">
          <b-form-group
            label="Nama Kategori :"
            label-for="categoryName"
          >
            <b-form-input id="categoryName" />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <b-form-group
            label="Notes :"
            label-for="categoryNotes"
          >
            <b-form-textarea
              id="categoryNotes"
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
}
</script>
