<template>
  <b-card>
    <b-form @submit.prevent>
      <b-row>
        <b-col cols="6">
          <b-form-group
            label="Warehouse"
            label-for="warehouse"
          >
            <b-form-select
              id="warehouse"
              v-model="selectedWarehouse"
              :options="warehouses"
            />
          </b-form-group>
        </b-col>
        <b-col cols="6">
          <b-form-group
            label="Supplier"
            label-for="supplier"
          >
            <b-form-select
              id="supplier"
              v-model="selectedSupplier"
              :options="suppliers"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="6">
          <b-form-group
            label="Purchase Status"
            label-for="status"
          >
            <b-form-select
              id="status"
              v-model="selectedStatus"
              :options="status"
            />
          </b-form-group>
        </b-col>
        <b-col cols="6">
          <b-form-group
            label="Attach Document"
            label-for="attDoc"
          >
            <b-form-file id="attDoc" />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="9">
          <b-form-group
            label="Upload CSV file"
            label-for="upcsv"
          >
            <b-form-file
              id="upcsv"
              placeholder="Browse or put file here..."
            />
          </b-form-group>
        </b-col>
        <b-col
          md="3"
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
        <b-col cols="4">
          <b-form-group
            label="Tax"
            label-for="taxes"
          >
            <b-form-select
              id="taxes"
              v-model="selectedTax"
              :options="taxes"
            />
          </b-form-group>
        </b-col>
        <b-col cols="4">
          <b-form-group
            label="Discount"
            label-for="discount"
          >
            <b-form-input id="discount" />
          </b-form-group>
        </b-col>
        <b-col cols="4">
          <b-form-group
            label="Shipping cost"
            label-for="shipping"
          >
            <b-form-input id="shipping" />
          </b-form-group>
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
        <b-col cols="2">
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            type="submit"
            variant="danger"
            class="mt-0 mt-md-2"
          >
            <span>Submit Purchase</span>
          </b-button>
        </b-col>
      </b-row>
    </b-form>
  </b-card>
</template>

<script>
import {
  BRow, BCol, BFormGroup, BFormInput, BForm, BButton, BCard, BFormSelect, BFormFile, BFormTextarea,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

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
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      selectedWarehouse: null,
      selectedSupplier: null,
      selectedCategory: null,
      selectedTax: null,
      selectedStatus: null,
      status: [{
        value: null,
        text: 'Select Purchase status',
        disabled: true,
      },
      {
        value: 1,
        text: 'Received',
      },
      {
        value: 2,
        text: 'Pending',
      }],
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
      taxes: [{
        value: null,
        text: 'Select Tax',
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
