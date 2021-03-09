<template>
  <b-modal
    id="brandAdd"
    centered
    size="lg"
    title="Tambah Brand / Merek"
    ok-title="Simpan"
    cancel-title="Tutup"
    ok-variant="danger"
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
              :disabled="true"
            />
          </b-form-group>
        </b-col>
        <b-col cols="6">
          <b-form-group
            label="Nama Brand :"
            label-for="brandName"
          >
            <b-form-input id="brandName" />
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
