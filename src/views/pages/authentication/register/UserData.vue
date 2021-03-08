<template>
  <b-row>
    <b-col
      cols="12"
      class="mb-2"
    >
      <h5 class="mb-0">
        {{ title }}
      </h5>
      <small class="text-muted">
        {{ subtitle }}
      </small>
    </b-col>
    <b-col md="6">
      <b-form-group
        label="Nama :"
        label-for="name"
      >
        <b-form-input
          id="nama"
          v-model="owner"
        />
      </b-form-group>
    </b-col>
    <b-col md="6" />
    <b-col md="6">
      <b-form-group
        label="No. Handphone :"
        label-for="phone"
      >
        <b-form-input
          id="phone"
          v-model="ownerNumber"
          type="number"
        />
      </b-form-group>
    </b-col>
    <b-col md="6">
      <b-form-group
        label="No. Identitas :"
        label-for="identity"
      >
        <b-form-input
          id="identity"
          type="number"
        />
      </b-form-group>
    </b-col>
    <b-col md="12">
      <b-form-group
        label="Alamat :"
        label-for="address"
      >
        <b-form-textarea
          id="address"
          v-model="address"
          rows="3"
        />
      </b-form-group>
    </b-col>
  </b-row>
</template>

<script>
import {
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BFormTextarea,
} from 'bootstrap-vue'

export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormTextarea,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: false,
      default: '',
    },
    ownerNumber: {
      type: String,
      required: false,
      default: '+62',
    },
    address: {
      type: String,
      required: false,
      default: '',
    },
  },
}
</script>
