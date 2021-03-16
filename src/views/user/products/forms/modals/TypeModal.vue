<template>
  <b-modal
    id="typeAdd"
    centered
    size="lg"
    title="Tambah Tipe"
    ok-title="Simpan"
    cancel-title="Tutup"
    ok-variant="danger"
  >
    <b-form>
      <b-row>
        <b-col cols="6">
          <b-form-group
            label="Kode Tipe :"
            label-for="typeCode"
          >
            <b-form-input
              id="typeCode"
              :disabled="true"
            />
          </b-form-group>
        </b-col>
        <b-col cols="6">
          <b-form-group
            label="Nama Tipe :"
            label-for="typeName"
          >
            <b-form-input id="typeName" />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <b-form-group
            label="Notes :"
            label-for="typeNotes"
          >
            <b-form-textarea
              id="typeNotes"
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
