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
                    type="submit"
                    variant="primary"
                    class="mt-0 mt-md-2"
                  ><feather-icon
                    icon="PlusIcon"
                    size="16"
                  /><span style="font-size: 14px;"> Kategori</span></b-button>
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
                    type="submit"
                    variant="primary"
                    class="mt-0 mt-md-2"
                  ><feather-icon
                    icon="PlusIcon"
                    size="16"
                  /><span style="font-size: 14px;"> Sub Kategori</span></b-button>
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
                    type="submit"
                    variant="primary"
                    class="mt-0 mt-md-2"
                  ><feather-icon
                    icon="PlusIcon"
                    size="16"
                  /><span style="font-size: 14px;"> Type</span></b-button>
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
                    type="submit"
                    variant="primary"
                    class="mt-0 mt-md-2"
                  ><feather-icon
                    icon="PlusIcon"
                    size="16"
                  /><span style="font-size: 14px;"> Brand</span></b-button>
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
                    type="submit"
                    variant="primary"
                    class="mt-0 mt-md-2"
                  ><feather-icon
                    icon="PlusIcon"
                    size="16"
                  /><span style="font-size: 14px;"> Unit</span></b-button>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="6">
                  <b-form-group
                    label="Attach Picture"
                    label-for="attachment"
                  >
                    <b-form-file id="attachment" />
                  </b-form-group>
                </b-col>
                <b-col cols="6">
                  <b-form-group
                    label="Status"
                    label-for="status"
                  >
                    <b-form-select id="status" />
                  </b-form-group>
                </b-col>
              </b-row>
            </div>
          </b-col>
          <b-col cols="4">
            <span>Image Preview</span>
            <b-img
              thumbnail
              fluid
              :src="require('@/assets/images/slider/06.jpg')"
              alt="Image 1"
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
  </div>
</template>

<script>
import {
  BRow, BCol, BFormGroup, BFormInput, BForm, BButton, BCard, BFormSelect, BFormTextarea, BFormFile, BImg,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
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
    // BInputGroup,
    // BInputGroupPrepend,
    // FeatherIcon,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      menuHidden: this.$store.state.appConfig.layout.menu.hidden,
      selectedCategory: null,
      selectedSubCategory: null,
      selectedBrand: null,
      selectedUnit: null,
      selectedType: null,
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
}
</script>
