<template>
  <b-modal
    id="customerAdd"
    centered
    size="lg"
    title="Tambah Customer"
    ok-title="Simpan"
    cancel-title="Tutup"
    ok-variant="danger"
  >
    <b-form>
      <b-row>
        <b-col cols="6">
          <b-form-group
            label="Nama Customer :"
            label-for="customerName"
          >
            <b-form-input id="customerName" />
          </b-form-group>
        </b-col>
        <b-col cols="6">
          <b-form-group
            label-for="reference"
            label="No. Referensi (Tukang JagoBagun) :"
          >
            <b-form-input id="reference" />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="6">
          <b-form-group
            label="Nomor Handphone : "
            label-for="phone"
          >
            <b-form-input id="phone" />
          </b-form-group>
        </b-col>
        <b-col cols="6">
          <b-form-group
            label-for="ktp"
            label="Nomor Identitas/KTP"
          >
            <b-form-input id="ktp" />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <b-form-group
            label="Alamat :"
            label-for="address"
          >
            <b-form-textarea
              id="address"
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
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BModal,
    BFormTextarea,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
}
</script>
