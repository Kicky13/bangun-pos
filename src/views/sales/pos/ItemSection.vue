<template>
  <div style="height: inherit">

    <!-- ECommerce Header -->
    <section id="ecommerce-header">
      <div class="row">
        <div class="col-sm-12">
          <div class="ecommerce-header-items">
            <div class="result-toggler">
              <feather-icon
                icon="MenuIcon"
                class="d-block d-lg-none"
                size="21"
                @click="mqShallShowLeftSidebar = true"
              />
              <div class="search-results">
                {{ totalProducts }} results found
              </div>
            </div>
            <div class="view-options d-flex">

              <!-- Sort Button -->
              <b-dropdown
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                :text="sortBy.text"
                right
                variant="outline-danger"
              >
                <b-dropdown-item
                  v-for="sortOption in sortByOptions"
                  :key="sortOption.value"
                  @click="sortBy=sortOption"
                >
                  {{ sortOption.text }}
                </b-dropdown-item>
              </b-dropdown>
              <!-- Filter Button -->
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="danger"
                style="margin-left: 5px;"
              >
                <span>KATEGORI</span>
              </b-button>
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="danger"
                style="margin-left: 5px;"
              >
                <span>SUB KATEGORI</span>
              </b-button>
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="danger"
                style="margin-left: 5px;"
              >
                <span>BRAND</span>
              </b-button>
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="secondary-outline"
              >
                <feather-icon
                  v-b-modal.listAntrian
                  :badge="$store.state['app-ecommerce'].cartItemsCount"
                  icon="ClockIcon"
                  size="30"
                />
              </b-button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Overlay -->
    <div class="body-content-overlay" />

    <!-- Searchbar -->
    <div class="ecommerce-searchbar mt-1">
      <b-row>
        <b-col cols="12">
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
          xl="4"
          md="12"
          sm="12"
          class="ecommerce-card"
          no-body
        >
          <!-- Product Details -->
          <b-link disabled :to="{ name: 'apps-e-commerce-product-details', params: { slug: product.slug } }">
            <mini-product-card
              :product="product"
              :item-click="handleCartActionClick"
              color="danger"
            />
          </b-link>
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
    <!-- Modal Section -->
    <!-- Table Antrian -->
    <b-modal
      id="listAntrian"
      centered
      size="xl"
      hide-footer
    >
      <!-- search input -->
      <div class="custom-search d-flex">
        <b-form-group>
          <div class="d-flex align-items-center">
            <b-input-group class="input-group-merge">
              <b-form-input
                v-model="searchTerm"
                placeholder="Search"
                type="text"
                class="d-inline-block"
              />
              <b-input-group-append is-text>
                <feather-icon
                  icon="SearchIcon"
                  class="text-muted"
                />
              </b-input-group-append>
            </b-input-group>
          </div>
        </b-form-group>
      </div><br>

      <!-- table -->
      <vue-good-table
        :columns="columns"
        :rows="rows"
        :rtl="direction"
        :search-options="{
          enabled: true,
          externalQuery: searchTerm }"
        :select-options="{
          enabled: true,
          selectOnCheckboxOnly: true, // only select when checkbox is clicked instead of the row
          selectionInfoClass: 'custom-class',
          selectionText: 'rows selected',
          clearSelectionText: 'clear',
          disableSelectInfo: true, // disable the select info panel on top
          selectAllByGroup: true, // when used in combination with a grouped table, add a checkbox in the header row to check/uncheck the entire group
        }"
        :pagination-options="{
          enabled: true,
          perPage:pageLength
        }"
      >
        <template
          slot="table-row"
          slot-scope="props"
        >
          <!-- Column: Status -->
          <span v-if="props.column.field === 'status'">
            <b-badge :variant="statusVariant(props.row.status)">
              {{ props.row.status }}
            </b-badge>
          </span>

          <!-- Column: Action -->
          <span v-else-if="props.column.field === 'action'">
            <span>
              <b-button
                v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                size="sm"
                variant="outline-secondary"
              >
                Lanjut
              </b-button>
              <b-button
                v-ripple.400="'rgba(234, 84, 85, 0.15)'"
                size="sm"
                variant="outline-danger"
              >
                Hapus
              </b-button>
            </span>
          </span>

          <!-- Column: Common -->
          <span v-else>
            {{ props.formattedRow[props.column.field] }}
          </span>
        </template>

        <!-- pagination -->
        <template
          slot="pagination-bottom"
          slot-scope="props"
        >
          <div class="d-flex justify-content-between flex-wrap">
            <div class="d-flex align-items-center mb-0 mt-1">
              <span class="text-nowrap ">
                Showing 1 to
              </span>
              <b-form-select
                v-model="pageLength"
                :options="['3','5','10']"
                class="mx-1"
                @input="(value)=>props.perPageChanged({currentPerPage:value})"
              />
              <span class="text-nowrap"> of {{ props.total }} entries </span>
            </div>
            <div>
              <b-pagination
                :value="1"
                :total-rows="props.total"
                :per-page="pageLength"
                first-number
                last-number
                align="right"
                prev-class="prev-item"
                next-class="next-item"
                class="mt-1 mb-0"
                @input="(value)=>props.pageChanged({currentPage:value})"
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
            </div>
          </div>
        </template>
      </vue-good-table>
    </b-modal>
    <!-- End of Table Antrian -->
  </div>
</template>

<script>
import {
  BDropdown, BDropdownItem, BRow, BCol, BInputGroup, BInputGroupAppend, BFormInput, BPagination, BButton, BLink, BModal, VBModal, BFormSelect, BBadge,
} from 'bootstrap-vue'
import { VueGoodTable } from 'vue-good-table'
import Ripple from 'vue-ripple-directive'
import { watch } from '@vue/composition-api'
import { useResponsiveAppLeftSidebarVisibility } from '@core/comp-functions/ui/app'
// import ShopLeftFilterSidebar from './ECommerceShopLeftFilterSidebar.vue'
import MiniProductCard from '@core/components/item-cards/MiniProductCard.vue'
import { useShopFiltersSortingAndPagination, useShopUi, useShopRemoteData } from '@/@fake-db/data/Pos/dummyFilter'
import FeatherIcon from '@/@core/components/feather-icon/FeatherIcon.vue'
import store from '@/store/index'
// import antrianModule from '@/views/sales/pos/antrianModule'
import { useEcommerceUi } from './ActionHandling'

export default {
  directives: {
    Ripple,
    'b-modal': VBModal,
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
    BButton,
    // BCard,
    // BCardBody,
    BLink,
    // BImg,
    // BCardText,
    // BButton,
    BPagination,

    // SFC
    // ShopLeftFilterSidebar,
    MiniProductCard,
    FeatherIcon,
    BModal,
    VueGoodTable,
    BFormSelect,
    BBadge,
  },
  data() {
    return {
      pageLength: 5,
      dir: false,
      columns: [
        {
          label: 'Kode Penjualan',
          field: 'kodePenjualan',
        },
        {
          label: 'Customer',
          field: 'customer',
        },
        {
          label: 'Ref. Code',
          field: 'refCode',
        },
        {
          label: 'Sub. Total',
          field: 'subTotal',
        },
        {
          label: 'Diskon',
          field: 'diskon',
        },
        {
          label: 'Pajak',
          field: 'pajak',
        },
        {
          label: 'Ongkir',
          field: 'ongkir',
        },
        {
          label: 'Status',
          field: 'status',
        },
        {
          label: 'Action',
          field: 'action',
        },
      ],
      rows: [],
      searchTerm: '',
      status: [{
        1: 'Pending',
        2: 'Done',
      },
      {
        1: 'light-danger',
        2: 'light-success',
      }],
    }
  },
  computed: {
    statusVariant() {
      const statusColor = {
        /* eslint-disable key-spacing */
        Pending : 'light-danger',
        Done : 'light-success',
        /* eslint-enable key-spacing */
      }

      return status => statusColor[status]
    },
    direction() {
      if (store.state.appConfig.isRTL) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.dir = true
        return this.dir
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.dir = false
      return this.dir
    },
  },
  created() {
    this.$http.get('/app-data/salesPending')
      .then(res => { this.rows = res.data })
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
        perPage: filters.value.perPage,
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
  @import "../node_modules/vue-good-table/src/styles/style.scss";
</style>

<style lang="scss" scoped>
.item-view-radio-group ::v-deep {
  .btn {
    display: flex;
    align-items: center;
  }
}
</style>
