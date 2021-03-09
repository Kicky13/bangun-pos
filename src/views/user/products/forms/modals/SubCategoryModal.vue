<template>
  <b-modal
    id="subcategoryAdd"
    centered
    size="lg"
    title="Tambah Sub Kategori"
    ok-title="Simpan"
    cancel-title="Tutup"
    ok-variant="danger"
  >
    <b-form>
      <b-row>
        <b-col cols="6">
          <b-form-group
            label="Kode Sub Kategori :"
            label-for="subcategoryCode"
          >
            <b-form-input
              id="subcategoryCode"
              :disabled="true"
            />
          </b-form-group>
        </b-col>
        <b-col cols="6" />
        <b-col cols="6">
          <b-form-group
            label="Kategori :"
            label-for="categoryCode"
          >
            <b-form-select
              id="category"
              v-model="selectedCategory"
              :options="categoryItems"
            />
          </b-form-group>
        </b-col>
        <b-col cols="6">
          <b-form-group
            label="Nama Sub Kategori :"
            label-for="subcategoryName"
          >
            <b-form-input id="subcategoryName" />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <b-form-group
            label="Notes :"
            label-for="subcategoryNotes"
          >
            <b-form-textarea
              id="subcategoryNotes"
              rows="4"
            />
          </b-form-group>
        </b-col>
      </b-row>
    </b-form>
  </b-modal>
</template>

<script>
import {
  BModal, VBModal, BRow, BCol, BFormGroup, BFormInput, BFormTextarea, BFormSelect,
} from 'bootstrap-vue'
// import vSelect from 'vue-select'
// import store from '@/store/index'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BModal,
    BFormTextarea,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormSelect,
    // vSelect,
  },
  directives: {
    'b-modal': VBModal,
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
}
</script>
