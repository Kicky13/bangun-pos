<template>
  <b-card
    class="text-center"
    no-body
  >
    <b-card-header class="text-right">
      <b-button
        :variant="color"
        tag="a"
        class="btn-icon"
        @click="itemClick(product)"
      >
        <feather-icon
          icon="EditIcon"
        />
        <!-- <edit-icon size="1.5x" class="custom-class"></edit-icon> -->
      </b-button>
    </b-card-header>
    <b-link :to="{ name: 'apps-e-commerce-product-details', params: { slug: product.slug } }">
      <b-img
        :alt="`${product.name}-${product.id}`"
        thumbnail
        style="background-color:white; border:none"
        fluid
        center
        class="card-img-top"
        :src="product.image"
      />
    </b-link>
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
    </div>
  </b-card>
</template>

<script>
import {
  BCard, BButton, BLink, BImg,
} from 'bootstrap-vue'
// import { EditIcon } from 'vue-feather-icons'

export default {
  components: {
    BCard,
    // BAvatar,
    BButton,
    BLink,
    BImg,
    // EditIcon,
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
