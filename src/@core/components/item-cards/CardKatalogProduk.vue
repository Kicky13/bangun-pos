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
        :to="{ name: 'user-product-edit', params: {editid: product.id, editname: product.name, editqty: product.qty, editprice: product.price, editimage: product.image, editidproduk: product.id_produk, editkodeproduk: product.kode_produk, editnamaproduk: product.nama_produk, editimgproduk: product.img_produk, editidcategory: product.id_category, editnamacategory: product.nama_category, editidsubcategory: product.id_subcategory, editnamasubcategory: product.nama_subcategory, editidbrand: product.id_brand, editnamabrand: product.nama_brand, editidtype: product.id_type, editnamatype: product.nama_type, editiduom: product.id_uom, editnamauom: product.nama_uom, editisavailable: product.is_available}}"
      >
        <feather-icon
          icon="EditIcon"
        />
        <!-- <edit-icon size="1.5x" class="custom-class"></edit-icon> -->
      </b-button>
    </b-card-header>
    <b-card-body>
      <b-img
        v-if="product.image"
        :alt="`${product.id}-${product.name}`"
        style="background-color:white; border:none; max-width:90%; height: 150px; margin-bottom:1rem; margin-top:0.5rem"
        fluid
        center
        class="card-img-top"
        :src="product.image"
      />
      <b-img
        v-else
        :alt="`${product.id}-${product.name}`"
        style="background-color:white; border:none; max-width:90%; height: 150px; margin-bottom:1rem; margin-top:0.5rem"
        fluid
        center
        class="card-img-top"
        :src="require('@/assets/images/slider/06.jpg')"
      />
      <!-- <p class="font-italic">
        {{ product.id }}
      </p> -->
      <h5
        v-if="product.name.length<=40"
        style="height:3rem; font-weight:bold;"
      >
        <i>{{ product.id }}</i> / {{ product.name }}
      </h5>
      <h5
        v-else
        style="height:3rem; font-weight:bold;"
      >
        <i>{{ product.id }}</i> / {{ product.name.substring(0,40)+"..." }}
      </h5>
    </b-card-body>
    <div>
      <b-card-footer>
        <p
          class="font-italic"
          style="margin-bottom:1rem;"
        >
          Rp. {{ formatPrice(product.price) }} / {{ product.qty }}
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
