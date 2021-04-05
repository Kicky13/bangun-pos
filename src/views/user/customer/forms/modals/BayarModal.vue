<template>
  <b-modal
    id="listBayar"
    size="lg"
    ok-title="Simpan"
    cancel-variant="outline-secondary"
  >
    <b-form>
      <b-row>
        <b-col cols="6">
          <b-form-group
            label="Kode Customer"
            label-for="code-customer"
          >
            <b-form-input
              id="code-customer"
              v-model="customerCode"
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
              v-model="customerName"
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
              v-model="remainingDebt"
              placeholder="nominal"
            />
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group
            label="Tipe Pembayaran"
            label-for="tipe-pembayaran"
          >
            <b-form-select
              id="tipe-pembayaran"
              v-model="selectedType"
              :options="typeItem"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="mt-2">
        <b-col cols="2" />
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
              v-model="paymentID"
              placeholder="nominal"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="2" />
        <b-col cols="10">
          <b-form-group
            label="Bayar"
            label-for="bayar"
            label-cols-md="5"
            class="font-weight-bold text-right"
          >
            <b-form-input
              id="bayar"
              v-model="paySum"
              placeholder="nominal"
            />
          </b-form-group>
        </b-col>
      </b-row>
    </b-form>
  </b-modal>
</template>

<script>
import {
  BModal, BRow, BCol, BFormGroup, BFormInput, VBModal, BForm, BFormSelect,
} from 'bootstrap-vue'
// import vSelect from 'vue-select'
// import store from '@/store/index'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BModal,
    // BContainer,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    // vSelect,
    BForm,
    BFormSelect,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  props: {
    dataCustomer: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      customerCode: '',
      customerName: '',
      remainingDebt: 0,
      paymentID: '',
      paySum: 0,
      selectedType: null,
      typeItem: [
        {
          value: null,
          text: 'Select Pembayaran',
          disabled: true,
        },
        {
          value: null,
          text: 'KREDIT',
        },
        {
          value: null,
          text: 'CASH',
        },
      ],
    }
  },
  created() {
    this.initiateModal()
  },
  methods: {
    initiateModal() {
      if (this.dataCustomer) {
        this.setBayar(this.dataCustomer)
      }
    },
    setBayar(data) {
      this.customerCode = data.custCode
      this.customerName = data.customer
      this.remainingDebt = data.sisaHutang
    },
    clearBayar() {
      this.customerCode = ''
      this.customerName = ''
      this.remainingDebt = 0
      this.paymentID = ''
      this.paySum = 0
    },
  },
}
</script>
