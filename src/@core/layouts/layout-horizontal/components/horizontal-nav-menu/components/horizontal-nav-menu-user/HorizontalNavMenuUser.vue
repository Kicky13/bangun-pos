<template>
  <div
    v-if="$route.meta.redTitle || $route.meta.redSubs"
    style="color: #ea5455; background-color: #ea5455;"
    class="content-header navbar-container align-items-center"
  >
    <div
      style="margin-left: 30px; margin-top: 20px; margin-bottom: 20px;"
    >
      <b-row>
        <h3 style="color: white;">
          {{ $route.meta.redTitle }}
        </h3>
      </b-row>
      <b-row>
        <h5 style="color: white">
          {{ $route.meta.redSubs }}
        </h5>
      </b-row>
    </div>
  </div>
</template>

<script>
import {
  BRow,
} from 'bootstrap-vue'

export default {
  components: {
    BRow,
    // BCol,
    // BBreadcrumb,
    // BBreadcrumbItem,
  },
}
</script>

<style lang="scss">
@import "~@core/scss/base/core/menu/menu-types/horizontal-menu.scss";
</style>
