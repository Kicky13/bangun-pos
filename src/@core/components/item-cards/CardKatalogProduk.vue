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
        :to="{ name: 'user-product-edit'}"
      >
        <feather-icon
          icon="EditIcon"
        />
        <!-- <edit-icon size="1.5x" class="custom-class"></edit-icon> -->
      </b-button>
    </b-card-header>
    <b-card-body>
      <b-img
        :alt="`${product.name}-${product.id}`"
        style="background-color:white; border:none; max-width:90%;"
        fluid
        center
        class="card-img-top"
        :src="product.image"
      />
      <p class="font-italic">
        {{ product.id }}
      </p>
      <h5
        v-if="product.name.length<=40"
        style="height:3rem; font-weight:bold;"
      >
        {{ product.id }}-{{ product.name }}
      </h5>
      <h5
        v-else
        style="height:3rem; font-weight:bold;"
      >
        {{ product.id }}-{{ product.name.substring(0,40)+"..." }}
      </h5>
    </b-card-body>
    <div>
      <b-card-footer>
        <p class="font-italic">
          {{ product.price }} / QTY
        </p>
      </b-card-footer>
    </div>
  </b-card>
</template>

<script>
import {
  BCard, BButton, BImg,
} from 'bootstrap-vue'
// import { EditIcon } from 'vue-feather-icons'

export default {
  components: {
    BCard,
    // BAvatar,
    BButton,
    // BLink,
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
