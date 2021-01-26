<template>
  <div>
    <b-row>
      <b-col cols="12">
        <b-card-code>

          <!-- Customer Form Section -->
          <div>
            <b-row>
              <b-col cols="4">
                <b-form-group
                  label="Reference"
                  label-for="reference"
                >
                  <b-form-input
                    id="reference"
                    placeholder="Type a number reference"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="4">
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
              <b-col cols="4">
                <b-form-group
                  label="Biller"
                  label-for="biller"
                >
                  <b-form-select
                    id="biller"
                    v-model="selectedBiller"
                    :options="billers"
                  />
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="4">
                <b-form-group
                  label="Customer"
                  label-for="customer"
                >
                  <b-form-select
                    id="customer"
                    v-model="selectedCustomer"
                    :options="customers"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="2">
                <b-button
                  v-ripple.400="'rgba(234, 84, 85, 0.15)'"
                  variant="danger"
                  class="mt-0 mt-md-2"
                >
                  <span>Add</span>
                </b-button>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12">
                <b-form-group>
                  <b-form-input
                    id="searchCustomer"
                    placeholder="Scan/search product by name/code"
                  />
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12">
                <hr>
              </b-col>
            </b-row>
          </div>
          <!-- End Customer Form Section -->

          <!-- Cart Section -->
          <div>
            <b-form
              ref="form"
              :style="{height: trHeight}"
              class="repeater-form"
              @submit.prevent="repeateAgain"
            >

              <!-- Row Loop -->
              <b-row
                v-for="(item, index) in items"
                :id="item.id"
                :key="item.id"
                ref="row"
              >

                <!-- Item Name -->
                <b-col md="4">
                  <b-form-group
                    :label="item.id"
                    label-for="item-name"
                  />
                  <span style="font-weight: bold; font-size: 14px;">
                    {{ item.name }}
                  </span>
                  <b-row>
                    <span>
                      In Stock: {{ item.stock - item.quantity }}
                    </span>
                  </b-row>
                </b-col>

                <!-- Cost -->
                <b-col md="2">
                  <b-form-group
                    label="Price"
                    label-for="cost"
                  >
                    <span>
                      $ {{ item.price }}
                    </span>
                  </b-form-group>
                </b-col>

                <!-- Quantity -->
                <b-col md="2">
                  <b-form-group
                    label="Quantity"
                    label-for="quantity"
                  >
                    <b-form-spinbutton
                      id="demo-sb"
                      v-model="item.quantity"
                      min="1"
                      max="100"
                    />
                  </b-form-group>
                </b-col>

                <!-- Profession -->
                <b-col
                  lg="2"
                  md="1"
                >
                  <b-form-group
                    label="Price"
                    label-for="price"
                  >
                    <b-form-input
                      id="pzrice"
                      :value="item.price * item.quantity"
                      plaintext
                    />
                  </b-form-group>
                </b-col>

                <!-- Remove Button -->
                <b-col
                  lg="2"
                  md="3"
                  class="mb-50"
                >
                  <b-button
                    v-ripple.400="'rgba(234, 84, 85, 0.15)'"
                    variant="outline-danger"
                    class="mt-0 mt-md-2"
                    @click="removeItem(index)"
                  >
                    <span>Delete</span>
                  </b-button>
                </b-col>
                <b-col cols="12">
                  <hr>
                </b-col>
              </b-row>

            </b-form>
          </div>
          <!-- End Cart Section -->

          <!-- Total Section -->
          <div>
            <b-row>
              <b-col cols="4">
                <b-row>
                  <b-col cols="6">
                    <span>Items</span>
                  </b-col>
                  <b-col cols="6">
                    <span>4(4)</span>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="6">
                    <span>Coupon </span>
                    <feather-icon
                      icon="EditIcon"
                      style="color: #FA4E54;"
                    />
                  </b-col>
                  <b-col cols="6">
                    <span>0.00</span>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="4">
                <b-row>
                  <b-col cols="6">
                    <span>Total</span>
                  </b-col>
                  <b-col cols="6">
                    <span>673.938</span>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="6">
                    <span>Tax </span>
                    <feather-icon
                      icon="EditIcon"
                      style="color: #FA4E54;"
                    />
                  </b-col>
                  <b-col cols="6">
                    <span>0.00</span>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="4">
                <b-row>
                  <b-col cols="6">
                    <span>Discount </span>
                    <feather-icon
                      icon="EditIcon"
                      style="color: #FA4E54;"
                    />
                  </b-col>
                  <b-col cols="6">
                    <span>0.00</span>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="6">
                    <span>Shipping </span>
                    <feather-icon
                      icon="EditIcon"
                      style="color: #FA4E54;"
                    />
                  </b-col>
                  <b-col cols="6">
                    <span>0.00</span>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <b-row style="margin-top: 10px;">
              <b-col cols="12">
                <b-form-textarea
                  id="textarea-rows"
                  placeholder="Note"
                  rows="3"
                />
              </b-col>
            </b-row>
            <b-row style="margin-top: 10px;">
              <b-col cols="12">
                <b-alert
                  show
                  class="mb-0"
                  variant="secondary"
                >
                  <div class="alert-body text-center">
                    <h3>
                      <strong>Grand Total : 43.839.21</strong>
                    </h3>
                  </div>
                </b-alert>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12">
                <hr>
              </b-col>
            </b-row>
          </div>
          <!-- End Total Section -->

          <!-- Action Button Section -->
          <div>
            <b-row>
              <b-col cols="8">
                <div class="demo-inline-spacing">
                  <b-button
                    v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                    variant="outline-warning"
                    pill
                  >
                    Draft
                  </b-button>
                </div>
              </b-col>
              <b-col cols="4">
                <div class="demo-inline-spacing">
                  <b-button
                    v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                    style="margin-right: 5px;"
                    variant="outline-danger"
                    pill
                  >
                    Pay
                  </b-button>
                  <b-button
                    v-ripple.400="'rgba(40, 199, 111, 0.15)'"
                    style="margin-left: 5px;"
                    variant="outline-secondary"
                    pill
                  >
                    Cancel
                  </b-button>
                </div>
              </b-col>
            </b-row>
          </div>
          <!-- End Action Button Section -->

        </b-card-code>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import BCardCode from '@core/components/b-card-code'
import {
  BRow, BCol, BForm, BFormGroup, BFormInput, BButton, BFormSpinbutton, BFormTextarea, BAlert, BFormSelect,
} from 'bootstrap-vue'
import { heightTransition } from '@core/mixins/ui/transition'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BRow,
    BCol,
    BForm,
    BFormGroup,
    BFormInput,
    BButton,
    BFormSpinbutton,
    BFormTextarea,
    BAlert,
    BFormSelect,

    BCardCode,
  },
  directives: {
    Ripple,
  },
  mixins: [heightTransition],
  data() {
    return {
      selectedWarehouse: null,
      selectedBiller: null,
      selectedCustomer: null,
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
      billers: [{
        value: null,
        text: 'Select a Biller',
        disabled: true,
      },
      {
        value: 673627,
        text: '673627 - Warehouse Gresik',
      },
      {
        value: 677289,
        text: '677289 - Warehouse Tuban',
      },
      {
        value: 678298,
        text: '678298 - Warehouse - Jakarta',
      },
      {
        value: 698983,
        text: '698983 - Warehouse Padang',
      }],
      customers: [{
        value: null,
        text: 'Walk-in Customer',
        disabled: true,
      },
      {
        value: 'Fauzan',
        text: 'Fauzan',
      },
      {
        value: 'Robiyanto',
        text: 'Robiyanto',
      },
      {
        value: 'Kikik',
        text: 'Kikik',
      }],
      nextTodoId: 2,
    }
  },
  mounted() {
    this.initTrHeight()
  },
  created() {
    window.addEventListener('resize', this.initTrHeight)
  },
  destroyed() {
    window.removeEventListener('resize', this.initTrHeight)
  },
  methods: {
    repeateAgain() {
      this.items.push({
        id: this.nextTodoId += this.nextTodoId,
      })

      this.$nextTick(() => {
        this.trAddHeight(this.$refs.row[0].offsetHeight)
      })
    },
    removeItem(index) {
      this.items.splice(index, 1)
      this.trTrimHeight(this.$refs.row[0].offsetHeight)
    },
    initTrHeight() {
      this.trSetHeight(null)
      this.$nextTick(() => {
        this.trSetHeight(this.$refs.form.scrollHeight)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.repeater-form {
  overflow: hidden;
  transition: .35s height;
}
</style>
