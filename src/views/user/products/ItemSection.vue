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
              v-model="searchProductToko"
              placeholder="Search Product"
              class="search-product"
              @input="setListProductToko"
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
                v-for="sortCategoryOption in sortByCategoryOptions"
                :key="sortCategoryOption.value"
                @click="setCategory(sortCategoryOption)"
              >
                {{ sortCategoryOption.text }}
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
                v-for="sortSubCategoryOption in sortBySubCategoryOptions"
                :key="sortSubCategoryOption.value"
                @click="setSubCategory(sortSubCategoryOption)"
              >
                {{ sortSubCategoryOption.text }}
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
                v-for="sortBrandOption in sortByBrandOptions"
                :key="sortBrandOption.value"
                @click="setBrand(sortBrandOption)"
              >
                {{ sortBrandOption.text }}
              </b-dropdown-item>
            </b-dropdown>
            <b-dropdown
              v-ripple.400="'rgba(234, 84, 85, 0.15)'"
              text="Urutkan"
              right
              variant="outline-primary"
              style="margin-left: 5px;"
            >
              <b-dropdown-item
                v-for="sortOption in sortByOptions"
                :key="sortOption.value"
                @click="setSort(sortOption)"
              >
                {{ sortOption.text }}
              </b-dropdown-item>
            </b-dropdown>
            <b-button
              v-ripple.400="'rgba(234, 84, 85, 0.15)'"
              variant="primary"
              style="margin-left: 5px;"
              :to="{ name: 'user-product-add'}"
            >
              Tambah Produk
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
          />
          <!-- <mini-product-card
            :product="product"
            :item-click="handleCartActionClick"
          /> -->
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
import ApiService from '@/connection/apiService'
// import { watch } from '@vue/composition-api'
// import { useResponsiveAppLeftSidebarVisibility } from '@core/comp-functions/ui/app'
import MiniProductCard from '@core/components/item-cards/CardKatalogProduk.vue'
// import { useShopFiltersSortingAndPagination, useShopUi, useShopRemoteData } from '@/@fake-db/data/Pos/produkFilter'

const appService = new ApiService()

export default {
  directives: {
    Ripple,
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
    BPagination,
    MiniProductCard,
  },
  data() {
    return {
      searchProductToko: '',
      selectedCategory: '',
      selectedBrand: '',
      selectedSubCategory: '',
      selectedSort: 'price-asc',
      filters: [{
        q: '',
        categories: [],
        subcategories: [],
        brands: [],
        page: 1,
        perPage: 12,
      }],
      filterOptions: [{
        categories: [],
        subcategories: [],
        brands: [],
      }],
      sortBy: [{ text: 'Harga Terendah', value: 'price-asc' }],
      sortByOptions: [
        { text: 'Harga Terendah', value: 'price-asc' },
        { text: 'Harga Tertinggi', value: 'price-desc' },
      ],
      sortByCategory: [{ text: '', value: '' }],
      sortByCategoryOptions: [],
      sortBySubCategory: [{ text: '', value: '' }],
      sortBySubCategoryOptions: [],
      sortByBrand: [{ text: '', value: '' }],
      sortByBrandOptions: [],
      itemView: 'grid-view',
      itemViewOptions: [
        { icon: 'GridIcon', value: 'grid-view' },
        { icon: 'ListIcon', value: 'list-view' },
      ],
      totalProducts: 0,
      products: [],
    }
  },
  mounted() {
    this.setListCategory()
    // this.setListSubCategory()
    this.setListBrand()
    this.setListProductToko()
  },
  methods: {
    async setCategory(param) {
      this.selectedCategory = param.value
      await this.setListSubCategory()
      this.sortByCategory.text = param.text
      this.sortByCategory.value = param.value
      this.setListProductToko()
    },
    async setSubCategory(param) {
      this.selectedSubCategory = param.value
      this.sortByCategory.text = param.text
      this.sortByCategory.value = param.value
      this.setListProductToko()
    },
    async setBrand(param) {
      this.selectedBrand = param.value
      this.sortByBrand.text = param.text
      this.sortByBrand.value = param.value
      this.setListProductToko()
    },
    async setSort(param) {
      this.selectedSort = param.value
      this.sortBy.text = param.text
      this.sortBy.value = param.value
      this.setListProductToko()
    },
    async setListCategory() {
      appService.getCategoryList().then(response => {
        const { data } = response
        this.sortByCategoryOptions = []
        if (data.data) {
          this.sortByCategoryOptions.push({
            value: '',
            text: 'Semua Kategori',
          })
          const itemlist = data.data
          itemlist.forEach(item => {
            this.sortByCategoryOptions.push({
              value: item.id,
              text: item.nama_category,
            })
          })
        }
      })
    },
    async setListSubCategory() {
      // console.log('sub kategori')
      const param = {
        id_category: this.selectedCategory,
      }
      appService.getSubcategoryList(param).then(response => {
        const { data } = response
        this.sortBySubCategoryOptions = []
        if (data.data) {
          this.sortBySubCategoryOptions.push({
            value: '',
            text: 'Semua Sub-Kategori',
          })
          const itemlist = data.data
          itemlist.forEach(item => {
            this.sortBySubCategoryOptions.push({
              value: item.id,
              text: item.nama_category,
            })
          })
        }
      })
    },
    async setListBrand() {
      appService.getBrandList().then(response => {
        const { data } = response
        this.sortByBrandOptions = []
        if (data.data) {
          this.sortByBrandOptions.push({
            value: '',
            text: 'Semua Brand',
          })
          const itemlist = data.data
          itemlist.forEach(item => {
            this.sortByBrandOptions.push({
              value: item.id,
              text: item.nama_brand,
            })
          })
        }
      })
    },
    async setListType() {
      appService.getTypeList().then(response => {
        const { data } = response
        this.typeItems = []
        this.typeItems.push({
          value: null,
          text: 'Pilih salah satu Tipe',
          disabled: true,
        })
        if (data.data) {
          // console.log(data.data)
          const itemlist = data.data
          itemlist.forEach(item => {
            this.typeItems.push({
              value: item.id,
              text: item.nama_type,
            })
          })
        }
      })
    },
    async setListUOM() {
      appService.getUomList().then(response => {
        const { data } = response
        this.unitItems = []
        this.unitItems.push({
          value: null,
          text: 'Pilih salah satu Unit / UOM',
          disabled: true,
        })
        if (data.data) {
          // console.log(data.data)
          const itemlist = data.data
          itemlist.forEach(item => {
            this.unitItems.push({
              value: item.id,
              text: item.nama_uom,
            })
          })
        }
      })
    },
    async setListProductToko() {
      // const param = {
      //   q: this.searchProductToko,
      //   kategori: this.selectedCategory,
      //   subkategori: this.selectedSubCategory,
      //   brand: this.selectedBrand,
      // }
      const param = {
        q: this.searchProductToko,
      }
      console.log(this.selectedCategory)
      console.log(this.selectedSubCategory)
      console.log(this.selectedBrand)
      if (this.selectedCategory !== '') {
        param.kategori = this.selectedCategory
      }
      if (this.selectedSubCategory !== '') {
        param.subkategori = this.selectedSubCategory
      }
      if (this.selectedBrand !== '') {
        param.brand = this.selectedBrand
      }
      console.log(param)
      // const param = new FormData()
      // param.append('q', this.searchProductToko)
      // if (this.selectedCategory !== '') {
      //   param.append('kategori', this.selectedCategory)
      // }
      // if (this.selectedSubCategory !== '') {
      //   param.append('subkategori', this.selectedSubCategory)
      // }
      // if (this.selectedBrand !== '') {
      //   param.append('brand', this.selectedBrand)
      // }
      appService.getProductTokoList(param).then(response => {
        const { data } = response
        this.products = []
        if (data.data) {
          // console.log(data.data)
          const itemlist = data.data
          // console.log(itemlist.length)
          this.totalProducts = itemlist.length
          itemlist.forEach(item => {
            this.products.push({
              // id_produk: item.id_produk,
              // kode_produk: item.kode_produk,
              // nama_produk: item.nama_produk,
              // img_produk: item.img_produk,
              // id_category: item.id_category,
              // nama_category: item.nama_category,
              // id_subcategory: item.id_subcategory,
              // nama_subcategory: item.nama_subcategory,
              // id_brand: item.id_brand,
              // nama_brand: item.nama_brand,
              // id_type: item.id_type,
              // nama_type: item.nama_type,
              // id_uom: item.id_uom,
              // nama_uom: item.nama_uom,
              id: item.kode_produk,
              name: item.nama_produk,
              qty: item.nama_uom,
              price: item.price,
              image: item.img_produk,
            })
          })
        }
      })
    },
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
