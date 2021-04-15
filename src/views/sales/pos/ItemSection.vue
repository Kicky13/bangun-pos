<template>
  <div style="height: inherit">
    <!-- ECommerce Header -->
    <section id="ecommerce-header">
      <b-row>
        <b-col>
          <div class="ecommerce-header-items">
            <div class="result-toggler">
              <!-- Filter Information -->
              <small class="search-results">
                Menampilkan <strong>{{ totalProduct }}</strong> produk. Dengan Kategori dari <strong>{{ selectedCategory.name }}</strong>, Sub Kategori dari <strong>{{ selectedSubCategory.name }}</strong> dan Brand / Merk dari <strong>{{ selectedBrand.name }}</strong>.
              </small>
            </div>
            <div class="view-options d-flex mt-1">
              <!-- Sort Button -->
              <b-dropdown
                v-ripple.400="'rgba(234, 84, 85, 0.15)'"
                text="Urutkan"
                variant="outline-danger"
              >
                <b-dropdown-item
                  v-for="sortItem in sortList"
                  :key="sortItem.value"
                  @click="sortByPrice(sortItem)"
                >
                  {{ sortItem.text }}
                </b-dropdown-item>
              </b-dropdown>
              <!-- Filter Button -->
              <!-- Kategori -->
              <b-dropdown
                v-ripple.400="'rgba(234, 84, 85, 0.15)'"
                text="Kategori"
                variant="outline-danger"
                style="margin-left: 5px;"
              >
                <b-dropdown-item
                  v-for="categoryItem in categoryList"
                  :key="categoryItem.id"
                  @click="getCategory(categoryItem)"
                >
                  {{ categoryItem.name }}
                </b-dropdown-item>
              </b-dropdown>
              <!-- Sub Kategori -->
              <b-dropdown
                v-ripple.400="'rgba(234, 84, 85, 0.15)'"
                text="Sub Kategori"
                variant="outline-danger"
                style="margin-left: 5px;"
              >
                <b-dropdown-item
                  v-for="subCategoryItem in subCategoryList"
                  :key="subCategoryItem.id"
                  @click="getSubCategory(subCategoryItem)"
                >
                  {{ subCategoryItem.name }}
                </b-dropdown-item>
              </b-dropdown>
              <!-- Brand -->
              <b-dropdown
                v-ripple.400="'rgba(234, 84, 85, 0.15)'"
                text="Brand"
                variant="outline-primary"
                style="margin-left: 5px;"
              >
                <b-dropdown-item
                  v-for="brandItem in brandList"
                  :key="brandItem.id"
                  @click="getBrand(brandItem)"
                >
                  {{ brandItem.name }}
                </b-dropdown-item>
              </b-dropdown>
              <!-- Antrian -->
              <b-button
                v-ripple.400="'rgba(234, 84, 85, 0.15)'"
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
        </b-col>
      </b-row>
    </section>
    <!-- Overlay -->
    <div class="body-content-overlay" />
    <!-- Searchbar -->
    <div class="ecommerce-searchbar mt-1">
      <b-row>
        <b-col>
          <b-input-group class="input-group-merge">
            <b-form-input
              v-model="searchKeyword"
              placeholder="Cari Produk"
              class="search-product"
              @input="getAllProducts"
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
    <section class="mt-1 match-height">
      <b-row>
        <b-col
          v-for="product in productList"
          :key="product.id_produk"
          xl="4"
          sm="6"
          class="ecommerce-card"
          no-body
        >
          <!-- Product Details -->
          <b-link @click="addProductToCart(product)">
            <mini-product-card
              :product="product"
              color="danger"
            />
          </b-link>
        </b-col>
      </b-row>
    </section>
    <!-- Pagination -->
    <section>
      <b-row>
        <b-col>
          <b-pagination
            v-model="currentPage"
            :total-rows="totalProduct"
            :per-page="perPage"
            first-number
            align="center"
            last-number
            class="pagination-danger"
            @change="handlePageChange"
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
    <!-- Antrian Table -->
    <b-modal
      id="listAntrian"
      centered
      size="xl"
      hide-footer
    >
      <!-- Search Input -->
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
      <!-- Table -->
      <vue-good-table
        :columns="columns"
        :rows="rows"
        :rtl="direction"
        :search-options="{
          enabled: true,
          externalQuery: searchTerm
        }"
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
        <!-- Pagination -->
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
    <!-- End of Antrian Table -->
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
import MiniProductCard from '@core/components/item-cards/MiniProductCard.vue'
import { useShopFiltersSortingAndPagination, useShopUi, useShopRemoteData } from '@/@fake-db/data/Pos/dummyFilter'
import FeatherIcon from '@/@core/components/feather-icon/FeatherIcon.vue'
import store from '@/store/index'
import ApiService from '@/connection/apiService'
import { useEcommerceUi } from './ActionHandling'
import { parentComponent } from './PageContent.vue'

const appService = new ApiService()

export default {
  directives: {
    Ripple,
    'b-modal': VBModal,
  },
  components: {
    BDropdown,
    BDropdownItem,
    BRow,
    BCol,
    BInputGroup,
    BInputGroupAppend,
    BFormInput,
    BButton,
    BLink,
    BPagination,
    MiniProductCard,
    FeatherIcon,
    BModal,
    VueGoodTable,
    BFormSelect,
    BBadge,
  },
  data() {
    return {
      // Filter List
      sortList: [
        { text: 'Harga Terendah', value: 'price-asc' },
        { text: 'Harga Tertinggi', value: 'price-desc' },
      ],
      categoryList: [{
        id: null,
        name: 'Semua Kategori',
      }],
      subCategoryList: [{
        id: null,
        name: 'Semua Sub Kategori',
      }],
      brandList: [{
        id: null,
        name: 'Semua Brand / Merek',
      }],
      productList: [],
      // Selected Item
      selectedSort: '',
      selectedCategory: {
        id: null,
        name: 'Semua Kategori',
      },
      selectedSubCategory: {
        id: null,
        name: 'Semua Sub Kategori',
      },
      selectedBrand: {
        id: null,
        name: 'Semua Brand / Merek',
      },
      searchKeyword: '',
      totalProduct: 0,
      currentPage: 1,
      perPage: 6,
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
  mounted() {
    this.getAllCategories()
    this.getAllBrands()
    this.getAllAntrian()
    this.getAllProducts()
  },
  created() {
    this.$http.get('/app-data/salesPending')
      .then(res => { this.rows = res.data })
  },
  methods: {
    async getAllCategories() {
      appService.getCategoryList().then(response => {
        const { data } = response.data
        if (data) {
          data.forEach(item => {
            this.categoryList.push({
              id: item.id,
              name: item.nama_category,
            })
          })
        }
      })
    },
    async getAllSubCategoriesByCategory({ id }) {
      const param = {
        id_category: id,
      }
      appService.getSubcategoryList(param).then(response => {
        const { data } = response.data
        if (data) {
          this.subCategoryList.push({
            id: null,
            name: 'Semua Sub Kategori',
          })
          if (param.id_category) {
            data.forEach(item => {
              this.subCategoryList.push({
                id: item.id,
                name: item.nama_category,
              })
            })
          }
        }
      })
    },
    async getAllBrands() {
      appService.getBrandList().then(response => {
        const { data } = response.data
        if (data) {
          data.forEach(item => {
            this.brandList.push({
              id: item.id,
              name: item.nama_brand,
            })
          })
        }
      })
    },
    async sortByPrice({ value }) {
      this.selectedSort = value
      this.getAllProducts()
    },
    async getCategory(param) {
      this.subCategoryList = []
      this.selectedCategory = {
        id: param.id,
        name: param.name,
      }
      this.selectedSubCategory = {
        id: null,
        name: 'Semua Sub Kategori',
      }
      await this.getAllSubCategoriesByCategory(this.selectedCategory)
      this.getAllProducts()
    },
    async getSubCategory(param) {
      this.selectedSubCategory = {
        id: param.id,
        name: param.name,
      }
      this.getAllProducts()
    },
    async getBrand(param) {
      this.selectedBrand = {
        id: param.id,
        name: param.name,
      }
      this.getAllProducts()
    },
    async getAllAntrian() {
      appService.getAntrian().then(response => {
        console.log(response)
      })
    },
    async getAllProducts() {
      const param = {
        q: this.searchKeyword,
      }
      param.sortBy = this.selectedSort
      if (this.selectedCategory.id) {
        param.kategori = this.selectedCategory.id
      }
      if (this.selectedSubCategory.id) {
        param.subkategori = this.selectedSubCategory.id
      }
      if (this.selectedBrand.id) {
        param.brand = this.selectedBrand.id
      }
      appService.getProductTokoList(param).then(response => {
        const { data } = response.data
        this.totalProduct = data.length
        this.productList = []
        if (data) {
          data.forEach(item => {
            const product = {
              id_produk: item.id_produk,
              kode_produk: item.kode_produk,
              img_produk: item.img_produk ? item.img_produk : '/img/06.95d1c509.jpg',
              price: item.price,
              nama_produk: item.nama_produk,
            }
            this.productList.push(product)
          })
          this.productList = this.productList.slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage)
        }
      })
    },
    handlePageChange(value) {
      this.currentPage = value
      this.getAllProducts()
    },
    addProductToCart(product) {
      parentComponent.$emit('addProductToCart', product)
    },
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
      filters,
      filterOptions,
      sortBy,
      sortByOptions,
      itemView,
      itemViewOptions,
      totalProducts,
      toggleProductInWishlist,
      handleCartActionClick,
      products,
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
