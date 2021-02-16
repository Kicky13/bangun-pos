<template>
  <p
    v-if="$route.meta.resource !== 'PointSale'"
    class="clearfix mb-0"
  >
    <span class="float-md-left d-block d-md-inline-block mt-25">
      COPYRIGHT  © {{ new Date().getFullYear() }}
      <b-link
        class="ml-25"
        href="https://sisi.id"
        target="_blank"
      >PT. SISI</b-link>
      <span class="d-none d-sm-inline-block">, All rights Reserved</span>
    </span>

  </p>
</template>

<script>
import { BLink } from 'bootstrap-vue'

export default {
  components: {
    BLink,
  },
}
</script>
