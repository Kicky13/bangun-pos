<template>
  <div>
    <b-card>
      <b-form @submit.prevent>
        <b-row>
          <b-col cols="8">
            <div>
              <b-row>
                <b-col cols="6">
                  <b-form-group
                    label="Kode Product"
                    label-for="kode"
                  >
                    <b-form-input
                      id="kode"
                      placeholder="Cari kode atau scan barcode produk"
                    />
                  </b-form-group>
                </b-col>
                <b-col cols="6">
                  <b-form-group
                    label="Nama Produk"
                    label-for="nama"
                  >
                    <b-form-input
                      id="nama"
                    />
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="4">
                  <b-form-group
                    label="Kategori"
                    label-for="category"
                  >
                    <b-form-select
                      id="category"
                      v-model="selectedCategory"
                      :options="categoryItems"
                    />
                  </b-form-group>
                </b-col>
                <b-col cols="2">
                  <b-button
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    v-b-modal.categoryAdd
                    type="submit"
                    variant="primary"
                    class="mt-0 mt-md-2"
                  ><feather-icon
                    icon="PlusIcon"
                    size="16"
                  /><span style="font-size: 13px;"> Kategori</span></b-button>
                </b-col>
                <b-col cols="4">
                  <b-form-group
                    label="Sub Kategori"
                    label-for="subcategory"
                  >
                    <b-form-select
                      id="subcategory"
                      v-model="selectedSubCategory"
                      :options="subCategoryItems"
                    />
                  </b-form-group>
                </b-col>
                <b-col cols="2">
                  <b-button
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    v-b-modal.subcategoryAdd
                    type="submit"
                    variant="primary"
                    class="mt-0 mt-md-2"
                  ><feather-icon
                    icon="PlusIcon"
                    size="16"
                  /><span style="font-size: 13px;"> Sub Kategori</span></b-button>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="4">
                  <b-form-group
                    label="Type"
                    label-for="type"
                  >
                    <b-form-select
                      id="type"
                      v-model="selectedType"
                      :options="typeItems"
                    />
                  </b-form-group>
                </b-col>
                <b-col cols="2">
                  <b-button
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    v-b-modal.typeAdd
                    type="submit"
                    variant="primary"
                    class="mt-0 mt-md-2"
                  ><feather-icon
                    icon="PlusIcon"
                    size="16"
                  /><span style="font-size: 13px;"> Type</span></b-button>
                </b-col>
                <b-col cols="4">
                  <b-form-group
                    label="Brand"
                    label-for="brand"
                  >
                    <b-form-select
                      id="brand"
                      v-model="selectedBrand"
                      :options="brandItems"
                    />
                  </b-form-group>
                </b-col>
                <b-col cols="2">
                  <b-button
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    v-b-modal.brandAdd
                    type="submit"
                    variant="primary"
                    class="mt-0 mt-md-2"
                  ><feather-icon
                    icon="PlusIcon"
                    size="16"
                  /><span style="font-size: 13px;"> Brand</span></b-button>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="6">
                  <b-form-group
                    label="Harga jual"
                    label-for="sellprice"
                  >
                    <b-form-input id="sellprice" />
                  </b-form-group>
                </b-col>
                <b-col cols="4">
                  <b-form-group
                    label="Unit"
                    label-for="unit"
                  >
                    <b-form-select
                      id="unit"
                      v-model="selectedUnit"
                      :options="unitItems"
                    />
                  </b-form-group>
                </b-col>
                <b-col cols="2">
                  <b-button
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    v-b-modal.unitsAdd
                    type="submit"
                    variant="primary"
                    class="mt-0 mt-md-2"
                  ><feather-icon
                    icon="PlusIcon"
                    size="16"
                  /><span style="font-size: 13px;"> Unit</span></b-button>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="6">
                  <b-form-group
                    label="Attach Picture"
                    label-for="attachment"
                  >
                    <b-form-file
                      id="attachment"
                      accept="image/jpeg, image/png"
                      @change="onFileChange"
                    />
                  </b-form-group>
                </b-col>
                <b-col cols="6">
                  <b-form-group
                    label="Status"
                    label-for="status"
                  >
                    <b-form-select
                      id="status"
                      v-model="selectedStatus"
                      :options="statusItems"
                    />
                  </b-form-group>
                </b-col>
              </b-row>
            </div>
          </b-col>
          <b-col cols="4">
            <span>Image Preview</span>
            <b-img
              v-if="productimgurl"
              :src="productimgurl"
              thumbnail
              fluid
              alt="Image Produk"
            />
            <b-img
              v-else
              :src="require('@/assets/images/slider/06.jpg')"
              thumbnail
              fluid
              alt="Image Produk"
            />
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <b-form-group
              label="Note"
              label-for="note"
            >
              <b-form-textarea
                id="note"
                rows="3"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="10" />
          <b-col
            cols="2"
            xl="2"
          >
            <div>
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                type="submit"
                variant="primary"
                style="float: right;"
              >
                <span>Submit Product</span>
              </b-button>
            </div>
          </b-col>
        </b-row>
      </b-form>
    </b-card>
    <category-modal />
    <sub-category-modal />
    <type-modal />
    <brand-modal />
    <units-modal />
  </div>
</template>

<script>
import {
  BRow, BCol, BFormGroup, BFormInput, BForm, BButton, BCard, BFormSelect, BFormTextarea, BFormFile, BImg, VBModal,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import CategoryModal from './modals/CategoryModal.vue'
import SubCategoryModal from './modals/SubCategoryModal.vue'
import TypeModal from './modals/TypeModal.vue'
import BrandModal from './modals/BrandModal.vue'
import UnitsModal from './modals/UnitsModal.vue'
// import FeatherIcon from '@/@core/components/feather-icon/FeatherIcon.vue'

export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BForm,
    BButton,
    BCard,
    BFormFile,
    BFormTextarea,
    BImg,
    CategoryModal,
    SubCategoryModal,
    TypeModal,
    BrandModal,
    UnitsModal,
    // BInputGroup,
    // BInputGroupPrepend,
    // FeatherIcon,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  data() {
    return {
      productimgurl: null,
      menuHidden: this.$store.state.appConfig.layout.menu.hidden,
      selectedCategory: null,
      selectedStatus: null,
      selectedSubCategory: null,
      selectedBrand: null,
      selectedUnit: null,
      selectedType: null,
      statusItems: [
        {
          value: null,
          text: 'Pilih salah satu status',
          disabled: true,
        },
        {
          value: '0',
          text: 'Kosong / Not Available',
        },
        {
          value: '1',
          text: 'Ada / Ready',
        },
      ],
      categoryItems: [
        {
          value: null,
          text: 'Pilih salah satu kategori',
          disabled: true,
        },
        {
          value: 'Raw',
          text: 'Raw',
        },
        {
          value: 'Bahan Bangunan',
          text: 'Bahan Bangunan',
        },
      ],
      subCategoryItems: [
        {
          value: null,
          text: 'Pilih salah satu sub kategori',
          disabled: true,
        },
        {
          value: 'Besi',
          text: 'Besi',
        },
        {
          value: 'Semen',
          text: 'Semen',
        },
      ],
      brandItems: [
        {
          value: null,
          text: 'Pilih salah satu brand',
          disabled: true,
        },
        {
          value: 'Semen Gresik',
          text: 'Semen Gresik',
        },
        {
          value: 'Tiga Roda',
          text: 'Tiga Roda',
        },
      ],
      unitItems: [
        {
          value: null,
          text: 'Pilih salah satu unit',
          disabled: true,
        },
        {
          value: 'EACH',
          text: 'EACH',
        },
        {
          value: 'ZAK',
          text: 'ZAK',
        },
      ],
      typeItems: [
        {
          value: null,
          text: 'Pilih salah satu tipe',
          disabled: true,
        },
        {
          value: 'Alat',
          text: 'Alat',
        },
        {
          value: 'Bahan',
          text: 'Bahan',
        },
      ],
    }
  },
  created() {
    this.$store.commit('appConfig/UPDATE_NAV_MENU_HIDDEN', true)
  },
  destroyed() {
    this.$store.commit('appConfig/UPDATE_NAV_MENU_HIDDEN', this.menuHidden)
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0]
      this.productimgurl = URL.createObjectURL(file)
    },
  },
}
</script>
