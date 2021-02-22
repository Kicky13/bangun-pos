<template>
  <b-navbar-nav class="nav">
    <b-nav-item
      id="HomeButton"
      :to="{ name: 'user-dashboard'}"
    >
      <feather-icon
        icon="HomeIcon"
        size="21"
        stroke="white"
      />
    </b-nav-item>

  </b-navbar-nav>
</template>

<script>
import {
  BNavbarNav, BNavItem,
} from 'bootstrap-vue'

export default {
  components: {
    BNavbarNav, BNavItem,
  },
}
</script>
