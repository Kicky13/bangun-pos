<template>
  <b-card
    class="text-center"
  >
    <!-- <b-link disabled :to="{ name: 'apps-e-commerce-product-details', params: { slug: product.slug } }"> -->
    <b-img
      :alt="`${product.nama_produk}-${product.id_produk}`"
      thumbnail
      style="background-color:white;
      border:none;
      max-width:90%;
      height: 175px;
      margin-top: 0.5rem;
      object-fit: cover;"
      fluid
      class="card-img-top"
      :src="product.img_produk"
    />
    <!-- </b-link> -->
    <div class="truncate text-center">
      <h5 class="mb-25 font-weight-bolder">
        Rp. {{ formatPrice(product.price) }} / PCS
      </h5>
      <span
        v-if="product.nama_produk.length<=15"
        style="color: black;"
      >{{ product.id_produk }}-{{ product.nama_produk }}</span>
      <span
        v-else
        style="color: black;"
      >{{ product.id_produk }}-{{ product.nama_produk.substring(0,15)+"..." }}</span>
    </div>
  </b-card>
</template>

<script>
import {
  BCard, BImg,
} from 'bootstrap-vue'

export default {
  components: {
    BCard,
    // BAvatar,
    // BButton,
    // BLink,
    BImg,
  },
  props: {
    product: {
      type: Array,
      required: true,
    },
    itemClick: {
      type: Function,
      required: true,
    },
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
