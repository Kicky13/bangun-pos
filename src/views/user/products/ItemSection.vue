<template>
  <div style="height: inherit">

    <!-- Overlay -->
    <div class="body-content-overlay" />

    <!-- Searchbar -->
    <div class="ecommerce-searchbar mt-1">
      <b-row>
        <b-col
          lg="6"
          md="6"
          sm="12"
        >
          <b-input-group class="input-group-merge space-5">
            <b-form-input
              v-model="searchProductToko"
              placeholder="Cari Produk dengan memasukkan nama atau kode"
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
        <b-col
          lg="6"
          md="6"
          sm="12"
        >
          <b-dropdown
            v-ripple.400="'rgba(234, 84, 85, 0.15)'"
            class="space-5"
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
            class="space-5"
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
            class="space-5"
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
            class="space-5"
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
            class="space-5"
            variant="primary"
            style="margin-left: 5px;"
            :to="{ name: 'user-product-add'}"
          >
            Tambah Produk
          </b-button>
        </b-col>
      </b-row>
    </div>
    <br>
    <p>Menampilkan <b>{{ rows - 1 }}</b> produk. Dengan Kategori dari <b>{{ selectedCategoryText }}</b> , Subkategori dari <b>{{ selectedSubCategoryText }}</b> dan Brand / Merk dari <b>{{ selectedBrandText }}</b>  </p>
    <!-- Products -->
    <section
      style="margin-top: 10px;"
      class="match-height"
    >
      <b-row>
        <b-col
          v-for="productitem in itemsForList"
          id="itemList"
          :key="productitem.id_price"
          xl="2"
          md="6"
          sm="10"
          class="ecommerce-card"
          no-body
        >
          <!-- Product Details -->
          <mini-product-card
            :product="productitem"
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
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="itemList"
            align="center"
            @change="handlePageChange"
          />
        </b-col>
      </b-row>
    </section>
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
      currentPage: 1,
      perPage: 12,
      rows: 0,
      productStoreList: [],
      itemsForList: [],
      searchProductToko: '',
      selectedCategory: '',
      selectedBrand: '',
      selectedSubCategory: '',
      selectedCategoryText: 'Semua Kategori',
      selectedBrandText: 'Semua Brand / Merk',
      selectedSubCategoryText: 'Semua Sub Kategori',
      selectedSort: 'price-asc',
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
    }
  },
  mounted() {
    this.setListCategory()
    this.setListBrand()
    this.setListProductToko()
  },
  methods: {
    handlePageChange(value) {
      this.currentPage = value
      console.log(this.currentPage)
      this.setListProductToko()
    },
    formatPrice(value) {
      console.log(value)
      const val = (value / 1).toFixed(2).replace('.', ',')
      console.log(val)
      console.log(val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'))
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    async setCategory(param) {
      this.selectedCategory = param.value
      this.selectedCategoryText = param.text
      await this.setListSubCategory()
      this.sortByCategory.text = param.text
      this.sortByCategory.value = param.value
      this.setListProductToko()
    },
    async setSubCategory(param) {
      this.selectedSubCategory = param.value
      this.selectedSubCategoryText = param.text
      this.sortByCategory.text = param.text
      this.sortByCategory.value = param.value
      this.setListProductToko()
    },
    async setBrand(param) {
      this.selectedBrand = param.value
      this.selectedBrandText = param.text
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
      const param = {
        q: this.searchProductToko,
      }
      if (this.selectedCategory !== '') {
        param.kategori = this.selectedCategory
      }
      if (this.selectedSubCategory !== '') {
        param.subkategori = this.selectedSubCategory
      }
      if (this.selectedBrand !== '') {
        param.brand = this.selectedBrand
      }
      param.sortBy = this.selectedSort
      param.PerPage = this.perPageProducts
      param.Page = this.pageProducts
      appService.getProductTokoList(param).then(response => {
        const { data } = response
        this.itemsForList = []
        this.productStoreList = []
        if (data.data) {
          const itemlist = data.data
          this.totalProducts = itemlist.length
          itemlist.forEach(item => {
            this.productStoreList.push({
              id: item.kode_produk,
              name: item.nama_produk,
              qty: item.nama_uom,
              price: item.price,
              image: item.img_produk,
              id_produk: item.id_produk,
              kode_produk: item.kode_produk,
              nama_produk: item.nama_produk,
              img_produk: item.img_produk,
              id_category: item.id_category,
              nama_category: item.nama_category,
              id_subcategory: item.id_subcategory,
              nama_subcategory: item.nama_subcategory,
              id_brand: item.id_brand,
              nama_brand: item.nama_brand,
              id_type: item.id_type,
              nama_type: item.nama_type,
              id_uom: item.id_uom,
              nama_uom: item.nama_uom,
              id_price: item.id_price,
              is_available: item.is_available,
            })
          })
        }
        this.rows = this.productStoreList.length + 1
        this.itemsForList = this.productStoreList.slice(
          (this.currentPage - 1) * this.perPage,
          this.currentPage * this.perPage,
        )
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
.space-5 {
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>
