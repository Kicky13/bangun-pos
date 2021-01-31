<template>
  <b-card>
    <b-form @submit.prevent>
      <b-row>
        <b-col md="9">
          <b-form-group
            label="Upload CSV File*:"
            label-for="prodcode"
          >
            <b-form-file
              id="prodcode"
            />
          </b-form-group>
        </b-col>
        <b-col
          lg="2"
          md="3"
          class="mb-50"
        >
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            type="submit"
            variant="primary"
            class="mt-0 mt-md-2"
          >
            <span>Download Template</span>
          </b-button>
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
</template>

<script>
import {
  BRow, BCol, BFormGroup, BForm, BButton, BCard, BFormFile, BFormTextarea,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    BForm,
    BButton,
    BCard,
    BFormFile,
    BFormTextarea,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      selectedWarehouse: null,
      selectedSupplier: null,
      selectedCategory: null,
      selectedUnit: null,
      items: [{
        id: 20200001909,
        name: 'Google - Google Home - White/Slate fabric',
        stock: 100,
        quantity: 10,
        price: 34,
        subtotal: 340,
      }, {
        id: 20200001910,
        name: 'Apple Watch Series 4 GPS',
        stock: 50,
        quantity: 2,
        price: 22,
        subtotal: 44,
      }, {
        id: 20200001911,
        name: 'Apple Macbook Air Latest Version',
        stock: 70,
        quantity: 3,
        price: 110,
        subtotal: 330,
      }, {
        id: 20200001912,
        name: 'Beats Headphone',
        stock: 143,
        quantity: 21,
        price: 12,
        subtotal: 252,
      }],
      warehouses: [{
        value: null,
        text: 'Select a Warehouse',
        disabled: true,
      },
      {
        value: 'Gresik',
        text: 'Gresik',
      },
      {
        value: 'Tuban',
        text: 'Tuban',
      },
      {
        value: 'Jakarta',
        text: 'Text',
      },
      {
        value: 'Padang',
        text: 'Padang',
      }],
      suppliers: [{
        value: null,
        text: 'Select Supplier',
        disabled: true,
      },
      {
        value: 673627,
        text: '673627 - JAPFA Surabaya',
      },
      {
        value: 677289,
        text: '677289 - PT. Wings',
      },
      {
        value: 678298,
        text: '678298 - Apple.inc',
      },
      {
        value: 698983,
        text: '698983 - SAMSUNG',
      }],
      categories: [{
        value: null,
        text: 'Select a Category',
        disabled: true,
      },
      {
        value: 'electronic',
        text: 'Electronic',
      },
      {
        value: 'tools',
        text: 'Tools',
      },
      {
        value: 'raw',
        text: 'Raw',
      }],
      units: [{
        value: null,
        text: 'Select Unit',
        disabled: true,
      },
      {
        value: 'afg911',
        text: 'AFG911',
      },
      {
        value: 'bjk128',
        text: 'BJK128',
      },
      {
        value: 'ZXT768',
        text: 'ZXT768',
      }],
      nextTodoId: 2,
    }
  },
}
</script>
