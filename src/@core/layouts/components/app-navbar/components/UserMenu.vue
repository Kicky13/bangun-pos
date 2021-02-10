<template>
  <b-nav-item-dropdown
    id="dropdown-grouped"
    variant="link"
    class="dropdown-language"
    right
  >
    <template #button-content>
      <feather-icon
        size="21"
        icon="MenuIcon"
      />
    </template>
    <b-dropdown-item
      v-for="menuData in locales"
      :key="menuData.locale"
      :to="{ name: menuData.path }"
    >
      <span class="ml-50">{{ menuData.name }}</span>
    </b-dropdown-item>
  </b-nav-item-dropdown>
</template>

<script>
import { BNavItemDropdown, BDropdownItem } from 'bootstrap-vue'

export default {
  components: {
    BNavItemDropdown,
    BDropdownItem,
  },
  // ! Need to move this computed property to comp function once we get to Vue 3
  computed: {
    currentLocale() {
      return this.locales.find(l => l.locale === this.$i18n.locale)
    },
  },
  setup() {
    /* eslint-disable global-require */
    const locales = [
      {
        name: 'Produk',
        path: 'user-product',
      },
      {
        name: 'Penjualan',
        path: 'user-sale',
      },
      {
        name: 'Customer',
        path: 'user-customer',
      },
    ]
    /* eslint-disable global-require */

    return {
      locales,
    }
  },
}
</script>

<style>

</style>
