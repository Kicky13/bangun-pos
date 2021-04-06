<template>
  <b-row style="background: black !important;">
    <b-col
      cols="12"
      style="background: black !important;"
    >
      <p
        v-if="$route.meta.resource !== 'PointSale'"
        class="clearfix mb-0"
        style="text-align:center; margin-top: 15px; margin-bottom: 15px !important;"
      >
        <span class="d-block d-md-inline-block mt-25">
          COPYRIGHT  © {{ new Date().getFullYear() }}
          <b-link
            class="ml-25"
            href="https://sisi.id"
            target="_blank"
            style="color: red !important; font-weight: bold;"
          >PT Sinergi Informatika Semen Indonesia</b-link>
          <span class="d-none d-sm-inline-block">, anak usaha dari PT Semen Indonesia TBK. All rights reserved.</span>
        </span>
      </p>
    </b-col>
  </b-row>
</template>

<script>
import {
  BLink, BRow, BCol,
} from 'bootstrap-vue'

export default {
  components: {
    BLink,
    BRow,
    BCol,
  },
}
</script>

<style scoped>
.text-white {
  color: white;
}
.text-link {
  font-size: initial;
}
.btn-cs {
  background: white;
  color: black;
  padding: 0.5rem;
  border-radius: 20px;
  display: flex;
  text-align: left;
}
.circle-cs {
  background-color: #b20838;
  border-radius: 50%;
  margin-right: 5px;
}
</style>
