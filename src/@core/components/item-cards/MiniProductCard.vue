<template>
  <b-card
    class="text-center"
  >
    <b-button
      v-if="product.is_available === 0"
      :variant="color"
      tag="a"
      class="btn-icon float-sm-right d-md-block d-none"
      style="margin: 1.5rem; position: absolute; opacity: 0.5; width: 80%;"
    >
      <span>Tidak Tersedia</span>
    </b-button>
    <b-button
      v-if="product.is_available === 0"
      :variant="color"
      tag="a"
      class="btn-icon float-sm-right d-sm-block d-xs-block d-xl-none d-lg-none d-md-none"
      style="margin: 0.5rem; position: absolute; opacity: 0.5; width: 80%;"
    >
      <span>Tidak Tersedia</span>
    </b-button>
    <!-- <b-link disabled :to="{ name: 'apps-e-commerce-product-details', params: { slug: product.slug } }"> -->
    <b-img
      :alt="`${product.nama_produk}-${product.id_produk}`"
      thumbnail
      style="background-color:white;
      border:none;
      max-width:90%;
      height: 175px;
      margin-top: 0.5rem;"
      fluid
      class="card-img-top d-md-block d-none"
      :src="product.img_produk"
      :title="`${product.nama_produk}`"
    />
    <b-img
      :alt="`${product.nama_produk}-${product.id_produk}`"
      thumbnail
      style="background-color:white;
      border:none;
      max-width:90%;
      height: 110px;
      margin-top: 0.5rem;"
      fluid
      class="card-img-top d-sm-block d-xs-block d-xl-none d-lg-none d-md-none"
      :src="product.img_produk"
      :title="`${product.nama_produk}`"
    />
    <!-- </b-link> -->
    <div class="truncate text-center d-md-block d-none">
      <div v-if="product.nama_produk.length<=15">
        <small class="text-dark">
          [{{ product.kode_produk }}]
        </small>
        <h5>{{ product.nama_produk }}</h5>
      </div>
      <div v-else>
        <small class="text-dark">
          [{{ product.kode_produk }}]
        </small>
        <h5>{{ product.nama_produk.substring(0,15) + "..." }}</h5>
      </div>
      <hr style="margin: 7px 0;">
      <span class="font-italic text-dark">
        Rp. {{ formatPrice(product.price) }} / {{ product.nama_uom }}
      </span>
    </div>
    <div class="truncate text-center d-sm-block d-xs-block d-xl-none d-lg-none d-md-none">
      <div v-if="product.nama_produk.length<=20">
        <small class="text-dark">
          [{{ product.kode_produk }}]
        </small><br>
        <span style="font-size: 10px; color: black !important;">{{ product.nama_produk }}</span>
      </div>
      <div v-else>
        <small class="text-dark">
          [{{ product.kode_produk }}]
        </small><br>
        <span style="font-size: 10px; color: black !important;">{{ product.nama_produk.substring(0,20) + "..." }}</span>
      </div>
      <hr style="margin: 7px 0;">
      <span
        class="font-italic text-dark"
        style="font-size: 10px;"
      >
        Rp. {{ formatPrice(product.price) }} / {{ product.nama_uom }}
      </span>
    </div>
  </b-card>
</template>

<script>
import {
  BCard, BImg, BButton,
} from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BButton,
    // BAvatar,
    // BButton,
    // BLink,
    BImg,
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
    // itemClick: {
    //   type: Function,
    //   required: true,
    // },
    color: {
      type: String,
      default: 'primary',
    },
  },
  methods: {
    formatPrice(value) {
      const val = (value / 1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
  },
}
</script>

<style scoped>
.card-body {
  padding: 0rem;
  margin-bottom: 0.5rem;
}
</style>
