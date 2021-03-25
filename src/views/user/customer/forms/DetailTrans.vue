<template>
  <div>
    <b-row align-h="center">
      <b-col
        cols="12"
        lg="7"
      >
        <b-card>
          <!-- Customer Form Section -->
          <div>
            <b-row class="mb-0">
              <b-col cols="6">
                <b-form-group
                  label="Kode Penjualan"
                  label-for="sellingCode"
                >
                  <b-form-input
                    id="sellingCode"
                    :value="dataPenjualan.saleCode"
                    disabled
                  />
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group
                  label="Customer"
                  label-for="customer"
                >
                  <b-form-select
                    id="customer"
                    v-model="dataPenjualan.customer"
                    :options="customers"
                    disabled
                  />
                </b-form-group>
              </b-col>
            </b-row>
            <b-row class="mb-0">
              <b-col cols="6">
                <b-form-select
                  id="customer"
                  v-model="dataPenjualan.biller"
                  :options="cashierItems"
                  disabled
                />
              </b-col>
              <b-col cols="6">
                <b-form-input
                  id="jagoId"
                  v-model="dataPenjualan.ref"
                  disabled
                />
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
              <div
                style="flex-wrap: nowrap;"
              >
                <!-- Row Loop -->
                <b-row
                  v-for="(item) in items"
                  :id="item.id"
                  :key="item.id"
                  ref="row"
                >

                  <!-- Item Name -->
                  <b-col
                    cols="12"
                    md="4"
                    class="mb-2 mb-md-0"
                  >
                    <b-row>
                      <b-col>
                        <span>
                          {{ item.id }}
                        </span>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col>
                        <span
                          style="font-weight: bold; font-size: 14px;"
                          class="text-danger"
                        >
                          {{ item.name }}
                        </span>
                      </b-col>
                    </b-row>
                  </b-col>

                  <!-- Price -->
                  <b-col
                    cols="4"
                    md="3"
                  >
                    <b-form-group
                      label="Price"
                      label-for="price"
                    >
                      <b-form-input
                        id="pzrice"
                        :value="item.price + ' / PCS'"
                        plaintext
                      />
                    </b-form-group>
                  </b-col>

                  <!-- Quantity -->
                  <b-col
                    cols="4"
                    md="2"
                  >
                    <b-form-group
                      label="Qty"
                      label-for="quantity"
                      class="text-center"
                    >
                      <b-form-input
                        id="demo-sb"
                        v-model="item.quantity"
                        min="1"
                        max="100"
                        class="text-center"
                        disabled
                        size="sm"
                      />
                    </b-form-group>
                  </b-col>

                  <!-- Profession -->
                  <b-col
                    cols="4"
                    md="3"
                    class="text-right"
                  >
                    <b-form-group
                      label="Price"
                      label-for="price"
                    >
                      <b-form-input
                        id="pzrice"
                        :value="item.price * item.quantity"
                        plaintext
                        class="text-right"
                      />
                    </b-form-group>
                  </b-col>
                  <b-col cols="12">
                    <hr style="margin-top: 5px;">
                  </b-col>
                </b-row>
              </div>
            </b-form>
          </div>
          <!-- End Cart Section -->

          <!-- Total Section -->
          <div>
            <b-row>
              <b-col sm="6">
                <b-row>
                  <b-col sm="8">
                    <span>Items</span>
                  </b-col>
                  <b-col
                    sm="4"
                    style="text-align: right;"
                  >
                    <span>4(4)</span>
                  </b-col>
                </b-row>
              </b-col>
              <b-col sm="6">
                <span>Tipe Pembayaran: </span>
              </b-col>
            </b-row>
            <b-row class="mb-0">
              <b-col sm="6">
                <b-form-group
                  label="Sub Total"
                  label-for="subtotal"
                  label-cols-md="4"
                >
                  <b-input-group
                    prepend="$"
                    append=".00"
                    class="input-group-merge"
                  >
                    <b-form-input
                      id="subtotal"
                      disabled
                      style="text-align: right;"
                      :value="dataPenjualan.subtotal + ' '"
                    />
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-select
                  id="tipebayar"
                  v-model="dataPenjualan.typePayment"
                  :options="methodBayar"
                  disabled
                />
              </b-col>
            </b-row>
            <b-row class="mb-1">
              <b-col cols="6">
                <b-form-group
                  label="Discount"
                  label-for="discount"
                  label-cols-md="4"
                >
                  <b-input-group
                    class="input-group-merge"
                    append=".00"
                  >
                    <b-form-input
                      id="discount"
                      style="text-align: right;"
                      :value="dataPenjualan.disc + ' '"
                      disabled
                    />
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group
                  label="No. Pembayaran"
                  label-for="idBayar"
                  label-cols-md="6"
                >
                  <b-form-input
                    id="idBayar"
                    value="1000000"
                    style="text-align: right"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group
                  label="Pajak"
                  label-for="tax"
                  label-cols-md="4"
                >
                  <b-input-group
                    class="input-group-merge"
                    append=".00"
                  >
                    <b-form-input
                      id="tax"
                      style="text-align: right;"
                      :value="dataPenjualan.tax + ' '"
                      disabled
                    />
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group
                  label="Bayar"
                  label-for="paid"
                  label-cols-md="6"
                >
                  <b-form-input
                    id="paid"
                    value="1000000"
                    style="text-align: right"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group
                  label="Ong. Kirim"
                  label-for="ongkir"
                  label-cols-md="4"
                >
                  <b-input-group
                    class="input-group-merge"
                    append=".00"
                  >
                    <b-form-input
                      id="ongkir"
                      style="text-align: right;"
                      :value="dataPenjualan.ship + ' '"
                      disabled
                    />
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group
                  label="Kembalian"
                  label-for="paidReturn"
                  label-cols-md="4"
                >
                  <b-input-group
                    class="input-group-merge"
                    append=".00"
                  >
                    <b-form-input
                      id="paidReturn"
                      style="text-align: right;"
                      value="1000000 "
                    />
                  </b-input-group>
                </b-form-group>
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
                      <strong>Grand Total : 1,000,000.00</strong>
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
              <b-col
                cols="12"
                md="3"
              />
              <b-col
                cols="12"
                md="3"
              />
              <b-col
                cols="12"
                md="3"
              >
                <b-button
                  v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                  class="mb-1"
                  block
                >
                  Print
                </b-button>
              </b-col>
              <b-col
                cols="12"
                md="3"
              >
                <b-button
                  v-ripple.400="'rgba(40, 199, 111, 0.15)'"
                  class="mb-1"
                  block
                  :to="{name: 'user-sale'}"
                >
                  Kembali
                </b-button>
              </b-col>
            </b-row>
          </div>
          <!-- End Action Button Section -->
        </b-card></b-col>
    </b-row>
  </div>
</template>

<script>
import {
  BRow, BCol, BCard, BForm, BFormGroup, BFormInput, BButton, BAlert, BFormSelect, BInputGroup, VBModal,
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
    BAlert,
    BFormSelect,
    BInputGroup,
    BCard,
  },
  directives: {
    Ripple,
    'b-modal': VBModal,
  },
  mixins: [heightTransition],
  data() {
    return {
      dataPenjualan: null,
      cashierItems: [
        {
          value: null,
          text: 'Pilih Kasir',
          disabled: true,
        },
        {
          value: 'Kasir 01',
          text: 'Kasir 01',
        },
        {
          value: 'Kasir 02',
          text: 'Kasir 02',
        },
        {
          value: 'Kasir 03',
          text: 'Kasir 03',
        },
      ],
      methodBayar: [{
        value: null,
        text: 'Pilih salah satu metode pembayaran',
        disabled: true,
      },
      {
        value: 'CASH',
        text: 'Cash',
      },
      {
        value: 'TRANSFER',
        text: 'Transfer Bank',
      },
      {
        value: 'GOPAY',
        text: 'Gopay',
      },
      {
        value: 'KREDIT',
        text: 'Kredit',
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
        value: 'Munib',
        text: 'Munib',
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
      kategori: [{
        value: null,
        text: 'Select Kategori',
        disabled: true,
      },
      {
        value: 'kategori1',
        text: 'Kategori 1',
      },
      {
        value: 'kategori2',
        text: 'Kategori 2',
      },
      {
        value: 'kategori3',
        text: 'Kategori 3',
      }],
      subKategori: [{
        value: null,
        text: 'Select a Sub Kategori',
        disabled: true,
      },
      {
        value: 'subKategori1',
        text: 'Sub Kategori 1',
      },
      {
        value: 'subKategori2',
        text: 'Sub Kategori 2',
      },
      {
        value: 'subKategori3',
        text: 'Sub Kategori 3',
      }],
      type: [{
        value: null,
        text: 'Select Type',
        disabled: true,
      },
      {
        value: 'type1',
        text: 'Type 1',
      },
      {
        value: 'type2',
        text: 'Type 2',
      },
      {
        value: 'type3',
        text: 'Type 3',
      }],
      brand: [{
        value: null,
        text: 'Select a Brand',
        disabled: true,
      },
      {
        value: 'brand1',
        text: 'Brand 1',
      },
      {
        value: 'brand2',
        text: 'Brand 2',
      },
      {
        value: 'brand3',
        text: 'Brand 3',
      }],
      units: [{
        value: null,
        text: 'Select a Unit',
        disabled: true,
      },
      {
        value: 'unit1',
        text: 'Unit 1',
      },
      {
        value: 'unit2',
        text: 'Unit 2',
      },
      {
        value: 'unit3',
        text: 'Unit 3',
      }],
    }
  },
  mounted() {
    this.initTrHeight()
  },
  created() {
    window.addEventListener('resize', this.initTrHeight)
    this.$store.commit('appConfig/UPDATE_NAV_MENU_HIDDEN', true)
    this.$http.get('/app-data/transDetail')
      .then(res => {
        this.dataPenjualan = res.data.find(data => data.id === parseInt(this.$route.params.id, 10))
      })
  },
  destroyed() {
    window.removeEventListener('resize', this.initTrHeight)
    this.$store.commit('appConfig/UPDATE_NAV_MENU_HIDDEN', this.menuHidden)
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
