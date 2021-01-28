<template>
  <b-card
    class="text-center"
  >
    <b-avatar
      class="mb-1"
      :variant="`light-${color}`"
      size="45"
    >
      <b-link :to="{ name: 'apps-e-commerce-product-details', params: { slug: product.slug } }">
        <b-img
          :alt="`${product.name}-${product.id}`"
          fluid
          class="card-img-top"
          :src="product.image"
        />
      </b-link>
    </b-avatar>
    <div class="truncate">
      <h2 class="mb-25 font-weight-bolder">
        {{ product.price }}
      </h2>
      <span v-if="product.name.length<=15">{{ product.id }}-{{ product.name }}</span>
      <span v-else>{{ product.id }}-{{ product.name.substring(0,15)+"..." }}</span>
    </div>
    <div
      style="margin-top: 5px;"
      class="text-center"
    >
      <b-button
        :variant="color"
        tag="a"
        class="btn-cart"
        @click="itemClick(product)"
      >
        <feather-icon
          icon="ShoppingCartIcon"
          class="mr-50"
        />
        <span>{{ product.isInCart ? 'View In Cart' : 'Add to Cart' }}</span>
      </b-button>
    </div>
  </b-card>
</template>

<script>
import {
  BCard, BAvatar, BButton, BLink, BImg,
} from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BAvatar,
    BButton,
    BLink,
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
