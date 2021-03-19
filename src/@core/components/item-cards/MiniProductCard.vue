<template>
  <b-card
    class="text-center"
  >
    <!-- <b-link disabled :to="{ name: 'apps-e-commerce-product-details', params: { slug: product.slug } }"> -->
    <b-img
      :alt="`${product.name}-${product.id}`"
      thumbnail
      sizes="35"
      style="background-color: white; border: none"
      fluid
      class="card-img-top"
      :src="product.image"
    />
    <!-- </b-link> -->
    <div class="truncate text-center">
      <h5 class="mb-25 font-weight-bolder">
        {{ product.price }} / PCS
      </h5>
      <span
        v-if="product.name.length<=15"
        style="color: black;"
      >{{ product.id }}-{{ product.name }}</span>
      <span
        v-else
        style="color: black;"
      >{{ product.id }}-{{ product.name.substring(0,15)+"..." }}</span>
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
}
</script>
