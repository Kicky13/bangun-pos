<template>
  <div style="height: inherit">

    <!-- Overlay -->
    <div class="body-content-overlay" />

    <!-- Searchbar -->
    <div class="ecommerce-searchbar mt-1">
      <b-row>
        <b-col cols="6">
          <b-input-group class="input-group-merge">
            <b-form-input
              v-model="filters.q"
              placeholder="Search Product"
              class="search-product"
            />
            <b-input-group-append is-text>
              <feather-icon
                icon="SearchIcon"
                class="text-muted"
              />
            </b-input-group-append>
          </b-input-group>
        </b-col>
        <b-col cols="6">
          <div class="view-options d-flex">
            <!-- Filter Button -->
            <b-dropdown
              v-ripple.400="'rgba(234, 84, 85, 0.15)'"
              text="Kategori"
              right
              variant="outline-primary"
              style="margin-left: 5px;"
            >
              <b-dropdown-item
                v-for="sortOption in sortByOptions"
                :key="sortOption.value"
                @click="sortBy=sortOption"
              >
                {{ sortOption.text }}
              </b-dropdown-item>
            </b-dropdown>
            <b-dropdown
              v-ripple.400="'rgba(234, 84, 85, 0.15)'"
              text="Sub Kategori"
              right
              variant="outline-primary"
              style="margin-left: 5px;"
            >
              <b-dropdown-item
                v-for="sortOption in sortByOptions"
                :key="sortOption.value"
                @click="sortBy=sortOption"
              >
                {{ sortOption.text }}
              </b-dropdown-item>
            </b-dropdown>
            <b-dropdown
              v-ripple.400="'rgba(234, 84, 85, 0.15)'"
              text="Brand"
              right
              variant="outline-primary"
              style="margin-left: 5px;"
            >
              <b-dropdown-item
                v-for="sortOption in sortByOptions"
                :key="sortOption.value"
                @click="sortBy=sortOption"
              >
                {{ sortOption.text }}
              </b-dropdown-item>
            </b-dropdown>
            <b-button
              v-ripple.400="'rgba(234, 84, 85, 0.15)'"
              variant="primary"
              style="margin-left: 5px;"
              class="btn-sm"
            >
              <!-- <span>Brand</span> -->
              <feather-icon
                icon="GridIcon"
              />
            </b-button>
            <b-button
              v-ripple.400="'rgba(234, 84, 85, 0.15)'"
              variant="primary"
              style="margin-left: 5px;"
              class="btn-sm"
            >
              <!-- <span>Brand</span> -->
              <feather-icon
                icon="ListIcon"
              />
            </b-button>
          </div>
        </b-col>
      </b-row>
    </div>

    <!-- Products -->
    <section
      style="margin-top: 10px;"
      class="match-height"
    >
      <b-row>
        <b-col
          v-for="product in products"
          :key="product.id"
          xl="2"
          md="6"
          sm="10"
          class="ecommerce-card"
          no-body
        >
          <!-- Product Details -->
          <mini-product-card
            :product="product"
            :item-click="handleCartActionClick"
          />
        </b-col>
      </b-row>
    </section>

    <!-- Pagination -->
    <section>
      <b-row>
        <b-col cols="12">
          <b-pagination
            v-model="filters.page"
            :total-rows="totalProducts"
            :per-page="filters.perPage"
            first-number
            align="center"
            last-number
            class="pagination-danger"
          >
            <template #prev-text>
              <feather-icon
                icon="ChevronLeftIcon"
                size="18"
              />
            </template>
            <template #next-text>
              <feather-icon
                icon="ChevronRightIcon"
                size="18"
              />
            </template>
          </b-pagination>
        </b-col>
      </b-row>
    </section>

    <!-- Sidebar -->
    <!-- <portal to="content-renderer-sidebar-detached-left">
      <shop-left-filter-sidebar
        :filters="filters"
        :filter-options="filterOptions"
        :mq-shall-show-left-sidebar.sync="mqShallShowLeftSidebar"
      />
    </portal> -->
  </div>
</template>

<script>
import {
  BDropdown, BDropdownItem, BRow, BCol, BInputGroup, BInputGroupAppend, BFormInput, BPagination, BButton,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { watch } from '@vue/composition-api'
import { useResponsiveAppLeftSidebarVisibility } from '@core/comp-functions/ui/app'
// import ShopLeftFilterSidebar from './ECommerceShopLeftFilterSidebar.vue'
import MiniProductCard from '@core/components/item-cards/CardKatalogProduk.vue'
import { useShopFiltersSortingAndPagination, useShopUi, useShopRemoteData } from '@/@fake-db/data/Pos/dummyFilter'
import { useEcommerceUi } from './ActionHandling'

export default {
  directives: {
    Ripple,
  },
  components: {
    // BSV
    BDropdown,
    BDropdownItem,
    // BFormRadioGroup,
    // BFormRadio,
    BRow,
    BCol,
    BInputGroup,
    BInputGroupAppend,
    BFormInput,
    // BCard,
    // BCardBody,
    // BLink,
    // BImg,
    // BCardText,
    BButton,
    BPagination,

    // SFC
    // ShopLeftFilterSidebar,
    MiniProductCard,
  },
  setup() {
    const {
      filters, filterOptions, sortBy, sortByOptions,
    } = useShopFiltersSortingAndPagination()

    const { handleCartActionClick, toggleProductInWishlist } = useEcommerceUi()

    const {
      itemView, itemViewOptions, totalProducts,
    } = useShopUi()

    const { products, fetchProducts } = useShopRemoteData()

    const { mqShallShowLeftSidebar } = useResponsiveAppLeftSidebarVisibility()

    // Wrapper Function for `fetchProducts` which can be triggered initially and upon changes of filters
    const fetchShopProducts = () => {
      fetchProducts({
        q: filters.value.q,
        sortBy: sortBy.value.value,
        page: filters.value.page,
        perPage: 12,
      })
        .then(response => {
          products.value = response.data.products
          totalProducts.value = response.data.total
        })
    }

    fetchShopProducts()

    watch([filters, sortBy], () => {
      fetchShopProducts()
    }, {
      deep: true,
    })

    return {
      // useShopFiltersSortingAndPagination
      filters,
      filterOptions,
      sortBy,
      sortByOptions,

      // useShopUi
      itemView,
      itemViewOptions,
      totalProducts,
      toggleProductInWishlist,
      handleCartActionClick,

      // useShopRemoteData
      products,

      // mqShallShowLeftSidebar
      mqShallShowLeftSidebar,
    }
  },
}
</script>

<style lang="scss">
@import "~@core/scss/base/pages/app-ecommerce.scss";
</style>

<style lang="scss" scoped>
.item-view-radio-group ::v-deep {
  .btn {
    display: flex;
    align-items: center;
  }
}
</style>
