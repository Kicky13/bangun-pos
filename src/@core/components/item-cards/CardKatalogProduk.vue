<template>
  <b-card
    class="text-center"
    no-body
    style="height:21rem"
  >
    <b-card-header class="text-right">
      <b-button
        :variant="color"
        tag="a"
        class="btn-icon"
        :to="{ name: 'user-product-edit'}"
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
        style="background-color:white; border:none; max-width:90%;"
        fluid
        center
        class="card-img-top"
        :src="product.image"
      />
    </b-link>
    <div>
      <p class="font-italic">
        20200101000{{ product.id }}
      </p>
      <h5>
        {{ product.id }}-{{ product.name }}
      </h5>
      <!-- <h5 v-if="product.name.length<=15">
        {{ product.id }}-{{ product.name }}
      </h5>
      <h5 v-else>
        {{ product.id }}-{{ product.name.substring(0,15)+"..." }}
      </h5> -->
      <p class="font-italic">
        {{ product.price }}
      </p>
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
