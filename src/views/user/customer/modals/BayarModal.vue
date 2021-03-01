<template>
  <!-- select 2 demo -->
    <b-modal
      id="modal-select2"
      size="lg"
      title="title"
      ok-title="Simpan"
      cancel-variant="outline-secondary"
    >
      <b-container>
        <b-row>
          <b-col cols="6">
            <b-form-group
              label="Kode Customer"
              label-for="code-customer"
            >
              <b-form-input
                id="code-customer"
                placeholder="Masukkan Code Customer"
              />
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
              label="Nama Customer"
              label-for="nama-customer"
            >
              <b-form-input
                id="nama-customer"
                placeholder="Masukkan Nama Customer"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="6">
            <b-form-group
              label="Sisa Hutang"
              label-for="sisa-hutnag"
            >
              <b-form-input
                id="sisa-hutang"
                placeholder="nominal"
              />
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
              label="Tipe Pembayaran"
              label-for="tipe-pembayaran"
            >
              <v-select
                id="tipe-pembayaran"
                v-model="selected"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="option"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col cols="2">
          </b-col>
          <b-col cols="10">
            <b-form-group
              label="No. Pembayaran"
              label-for="no-pembayaran"
              label-cols-md="5"
              label-align="right"
              class="font-weight-bold"
            >
              <b-form-input
                id="no-pembayaran"
                placeholder="nominal"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="2">
          </b-col>
          <b-col cols="10">
            <b-form-group
              label="Bayar"
              label-for="bayar"
              label-cols-md="5"
              class="font-weight-bold text-right"
            >
              <b-form-input
                id="bayar"
                placeholder="nominal"
              />
            </b-form-group>
          </b-col>
        </b-row>
      </b-container>
    </b-modal>
</template>

<script>
import { 
  BModal, BContainer, BRow, BCol, BFormGroup, BFormInput,
 } from "bootstrap-vue"
import vSelect from 'vue-select'
// import store from '@/store/index'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BModal, 
    BContainer, 
    BRow, 
    BCol, 
    BFormGroup, 
    BFormInput,
    vSelect,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  props: {
    title:String,
  }
}
</script>