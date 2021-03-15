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
        label="Nama Toko :"
        label-for="shopname"
      >
        <b-form-input
          id="shopname"
          v-model="shopName"
        />
      </b-form-group>
    </b-col>
    <b-col md="6">
      <b-form-group
        label="Logo Toko :"
        label-for="shoplogo"
      >
        <b-form-file
          id="shoplogo"
        />
      </b-form-group>
    </b-col>
    <b-col md="6">
      <b-form-group
        label="Telp. Toko :"
        label-for="shopphone"
      >
        <b-form-input
          id="shopphone"
          v-model="shopNumber"
          type="number"
        />
      </b-form-group>
      <b-form-group
        label="Alamat :"
        label-for="shopaddress"
      >
        <b-form-textarea
          id="shopaddress"
          v-model="address"
          rows="3"
        />
      </b-form-group>
    </b-col>
    <b-col md="6">
      <b-form-group label="Logo Preview :">
        <b-img
          v-bind="previewSetting"
          :src="require('@/assets/images/slider/06.jpg')"
          alt="Logo"
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
  BFormFile,
  BFormTextarea,
  BImg,
} from 'bootstrap-vue'

export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormFile,
    BFormTextarea,
    BImg,
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
    shopName: {
      type: String,
      required: false,
      default: '',
    },
    shopNumber: {
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
  data() {
    return {
      previewSetting: {
        fluid: true,
        thumbnail: true,
        width: 230,
        height: 210,
      },
    }
  },
}
</script>
