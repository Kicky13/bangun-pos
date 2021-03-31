<template>
  <div>
    <b-row>
      <b-col cols="12">
        <b-card>
          <!-- Customer Form Section -->
          <div>
            <b-row class="mb-0">
              <b-col cols="5">
                <b-form-group
                  label="Kode Penjualan"
                  label-for="sellingCode"
                >
                  <b-form-input
                    id="sellingCode"
                    value="TB-28373983/947290021"
                    disabled
                  />
                </b-form-group>
              </b-col>
              <b-col cols="5">
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
                  v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                  v-b-modal.customerAdd
                  variant="danger"
                  class="btn-icon mt-0 mt-md-2"
                >
                  <feather-icon icon="UserPlusIcon" />
                </b-button>
              </b-col>
            </b-row>
            <b-row class="mb-0">
              <b-col cols="5">
                <b-form-select
                  id="customer"
                  v-model="selectedCashier"
                  :options="cashierItems"
                />
              </b-col>
              <b-col cols="5">
                <b-form-input
                  id="jagoId"
                  placeholder="No. Referensi Jago Bangunan"
                  :value="noReference"
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
              class="repeater-form"
              @submit.prevent="repeateAgain"
            >
              <div
                style="flex-wrap: nowrap;
                max-height: 400px;
                overflow-x: hidden;
                overflow-y: auto;"
              >
                <!-- Row Loop -->
                <template v-if="items.length">
                  <b-row
                    v-for="(item, index) in items"
                    :id="item.id"
                    :key="item.id"
                    ref="row"
                  >
                    <!-- Item Name -->
                    <b-col md="4">
                      <b-row>
                        <b-col>
                          <span>
                            {{ item.id }}
                            <feather-icon
                              v-b-modal.cartProductEdit
                              icon="EditIcon"
                              style="color: #b20838"
                            />
                          </span>
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col>
                          <span style="font-weight: bold; font-size: 14px;">
                            {{ item.name }}
                          </span>
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col>
                          <span>
                            $ {{ item.price }} / PCS
                          </span>
                        </b-col>
                      </b-row>
                    </b-col>

                    <!-- Quantity -->
                    <b-col md="3">
                      <b-form-group
                        label="Quantity"
                        label-for="quantity"
                        class="text-center"
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
                      cols="6"
                      md="3"
                      class="text-md-right"
                    >
                      <b-form-group
                        label="Price"
                        label-for="price"
                      >
                        <b-form-input
                          id="pzrice"
                          :value="item.price * item.quantity"
                          plaintext
                          class="text-md-right"
                        />
                      </b-form-group>
                    </b-col>

                    <!-- Remove Button -->
                    <b-col
                      cols="6"
                      md="2"
                      class="mb-50 text-right text-md-center"
                    >
                      <b-button
                        v-ripple.400="'rgba(234, 84, 85, 0.15)'"
                        v-b-tooltip.hover
                        variant="outline-danger"
                        class="btn-icon mt-0 mt-md-2"
                        title="Hapus"
                        @click="removeItem(index)"
                      >
                        <feather-icon icon="Trash2Icon" />
                      </b-button>
                    </b-col>
                    <b-col cols="12">
                      <hr>
                    </b-col>
                  </b-row>
                </template>
                <template v-else>
                  <div
                    style="color: #b20838;
                    font-style: italic;
                    text-align: center;"
                  >
                    --- Keranjang Kosong ---
                  </div>
                </template>
              </div>
            </b-form>
          </div>
          <!-- End Cart Section -->

          <!-- Total Section -->
          <div>
            <b-row>
              <b-col cols="12">
                <hr>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="6">
                <b-form-group
                  label="Items"
                  label-for="items"
                  label-cols="6"
                  label-cols-md="4"
                >
                  <b-input-group
                    class="input-group-merge"
                  >
                    <b-form-input
                      id="items"
                      style="text-align: right;"
                      :value="items.length + '(' + totalQuantities + ')'"
                      plaintext
                    />
                  </b-input-group>
                </b-form-group>
              </b-col>
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
                      style="text-align: right;"
                      :value="totalSubtotal + ' '"
                      disabled
                    />
                  </b-input-group>
                </b-form-group>
              </b-col>
            </b-row>
            <!-- <b-row style="margin-top: 10px;">
              <b-col cols="12">
                <b-form-textarea
                  id="textarea-rows"
                  placeholder="Note"
                  rows="3"
                />
              </b-col>
            </b-row> -->
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
              >
                <b-button
                  v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                  variant="secondary"
                  class="mb-1"
                  block
                  @click="resetButton"
                >
                  Batal
                </b-button>
              </b-col>
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
                  variant="warning"
                  class="mb-1"
                  block
                  @click="addToAntrian"
                >
                  Antrian
                </b-button>
              </b-col>
              <b-col
                cols="12"
                md="3"
              >
                <b-button
                  v-ripple.400="'rgba(40, 199, 111, 0.15)'"
                  v-b-modal.paymentModal
                  variant="danger"
                  class="mb-1"
                  block
                >
                  Bayar
                </b-button>
              </b-col>
            </b-row>
          </div>
          <!-- End Action Button Section -->

          <!-- Modal Section -->

          <!-- Add Customer -->
          <b-modal
            id="customerAdd"
            centered
            size="lg"
            title="Tambah Customer"
            hide-footer
          >
            <b-form>
              <b-row>
                <b-col cols="6">
                  <b-form-group
                    label="Nama Customer"
                    label-for="customerName"
                  >
                    <b-form-input
                      id="customerName"
                      v-model="customerBaru.nama_customer"
                    />
                  </b-form-group>
                </b-col>
                <b-col cols="6">
                  <b-form-group
                    label-for="reference"
                    label="No. Reference"
                  >
                    <b-form-input
                      id="reference"
                      v-model="customerBaru.no_references"
                    />
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="6">
                  <b-form-group
                    label="Nomor HP"
                    label-for="phone"
                  >
                    <b-form-input
                      id="phone"
                      v-model="customerBaru.telp_customer"
                    />
                  </b-form-group>
                </b-col>
                <b-col cols="6">
                  <b-form-group
                    label-for="ktp"
                    label="Nomor KTP"
                  >
                    <b-form-input
                      id="ktp"
                      v-model="customerBaru.no_identitas"
                    />
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="12">
                  <b-form-group
                    label="Alamat"
                    label-for="address"
                  >
                    <b-form-textarea
                      id="address"
                      rows="4"
                      v-model="customerBaru.alamat"
                    />
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col
                  cols="12"
                  class="text-right"
                >
                  <b-button
                    class="mr-1"
                    @click="$bvModal.hide('customerAdd')"
                  >
                    Tutup
                  </b-button>
                  <b-button
                    variant="danger"
                    @click="addNewCustomer"
                  >
                    Simpan
                  </b-button>
                </b-col>
              </b-row>
            </b-form>
          </b-modal>
          <!-- End of Customer Add -->

          <!-- Edit Cart Product -->
          <b-modal
            id="cartProductEdit"
            centered
            size="lg"
            ok-title="Simpan"
            cancel-title="Tutup"
            ok-variant="danger"
          >
            <b-form>
              <b-row>
                <b-col cols="6">
                  <b-form-group
                    label="Kode Produk :"
                    label-for="kodeProduk"
                    style="font-weight: bold"
                  >
                    <b-form-input
                      id="kodeProduk"
                      disabled
                    />
                  </b-form-group>
                </b-col>
                <b-col cols="6">
                  <b-form-group
                    label="Nama Produk :"
                    label-for="namaProduk"
                    style="font-weight: bold"
                  >
                    <b-form-input
                      id="namaProduk"
                      disabled
                    />
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="6">
                  <b-form-group
                    label="Kategori :"
                    label-for="kategori"
                    style="font-weight: bold"
                  >
                    <b-form-select
                      id="kategori"
                      v-model="selectedKategori"
                      :options="kategori"
                      disabled
                    />
                  </b-form-group>
                </b-col>
                <b-col cols="6">
                  <b-form-group
                    label="Sub Kategori :"
                    label-for="subKategori"
                    style="font-weight: bold"
                  >
                    <b-form-select
                      id="subKategori"
                      v-model="selectedSubKategori"
                      :options="subKategori"
                      disabled
                    />
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="6">
                  <b-form-group
                    label="Type :"
                    label-for="type"
                    style="font-weight: bold"
                  >
                    <b-form-select
                      id="type"
                      v-model="selectedType"
                      :options="type"
                      disabled
                    />
                  </b-form-group>
                </b-col>
                <b-col cols="6">
                  <b-form-group
                    label="Brand :"
                    label-for="brand"
                    style="font-weight: bold"
                  >
                    <b-form-select
                      id="brand"
                      v-model="selectedBrand"
                      :options="brand"
                      disabled
                    />
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="6">
                  <b-form-group
                    label="Harga Jual :"
                    label-for="hargaJual"
                    style="font-weight: bold"
                  >
                    <b-form-input id="hargaJual" />
                  </b-form-group>
                </b-col>
                <b-col cols="6">
                  <b-form-group
                    label-for="units"
                    label="Units :"
                    style="font-weight: bold"
                  >
                    <b-form-select
                      id="units"
                      v-model="selectedUnits"
                      :options="units"
                    />
                  </b-form-group>
                </b-col>
              </b-row>
            </b-form>
          </b-modal>
          <!-- End of Edit Cart Product -->

          <!-- Payment Modal -->
          <b-modal
            id="paymentModal"
            size="lg"
            ok-title="Selesai"
            cancel-title="Kembali"
          >
            <template v-slot:modal-title>
              <h4>Selesaikan Pembayaran</h4>
              <small>Mohon dicek kembali sebelum menyelesaikan pembayaran</small>
            </template>
            <b-form>
              <b-row>
                <b-col sm="6">
                  <b-form-group
                    label="Items"
                    label-for="items"
                    label-cols-md="4"
                  >
                    <b-input-group
                      class="input-group-merge"
                    >
                      <b-form-input
                        id="items"
                        style="text-align: right;"
                        value="4(4)"
                        plaintext
                      />
                    </b-input-group>
                  </b-form-group>
                </b-col>
                <b-col sm="6" />
              </b-row>
              <b-row>
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
                        style="text-align: right;"
                        value="8190 "
                        disabled
                      />
                    </b-input-group>
                  </b-form-group>
                </b-col>
                <b-col sm="6">
                  <b-form-group
                    label="Customer"
                    label-for="customer"
                    label-cols="5"
                  >
                    <b-form-select
                      id="customer"
                      v-model="selectedCustomer"
                      :options="customers"
                    />
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="6">
                  <b-form-group
                    label="Discount"
                    label-for="discount"
                    label-cols-md="4"
                  >
                    <b-input-group
                      append=".00"
                      class="input-group-merge"
                    >
                      <b-form-input
                        id="discount"
                        style="text-align: right;"
                        value="0"
                      />
                    </b-input-group>
                  </b-form-group>
                </b-col>
                <b-col sm="6">
                  <b-form-group
                    label="No. Referensi"
                    label-for="idBayar"
                    label-cols-md="5"
                  >
                    <b-form-input
                      id="idBayar"
                      value="38942808192"
                      style="text-align: right"
                    />
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="6">
                  <b-form-group
                    label="Pajak"
                    label-for="tax"
                    label-cols-md="4"
                  >
                    <b-input-group
                      append=".00"
                      class="input-group-merge"
                    >
                      <b-form-input
                        id="tax"
                        value="0"
                        style="text-align: right;"
                      />
                    </b-input-group>
                  </b-form-group>
                </b-col>
                <b-col sm="6">
                  <b-form-group
                    label="Tipe Pembayaran"
                    label-for="tipePembayaran"
                    label-cols-md="5"
                  >
                    <b-form-select
                      id="tipebayar"
                      v-model="selectedMetode"
                      :options="methodBayar"
                    />
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="6">
                  <b-form-group
                    label="Ong. Kirim"
                    label-for="ongkir"
                    label-cols-md="4"
                  >
                    <b-input-group
                      append=".00"
                      class="input-group-merge"
                    >
                      <b-form-input
                        id="ongkir"
                        value="0"
                        style="text-align: right;"
                      />
                    </b-input-group>
                  </b-form-group>
                </b-col>
                <b-col sm="6" />
              </b-row>
              <b-row>
                <b-col sm="12">
                  <b-alert
                    variant="secondary"
                    show
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
                <b-col sm="6">
                  <b-form-group
                    label="Bayar"
                    label-for="paid"
                    label-cols-md="4"
                  >
                    <b-input-group
                      append=".00"
                      class="input-group-merge"
                    >
                      <b-form-input
                        id="paid"
                        value="8942808192"
                        style="text-align: right"
                      />
                    </b-input-group>
                  </b-form-group>
                </b-col>
                <b-col sm="6">
                  <b-form-group
                    label="Kembalian"
                    label-for="paidReturn"
                    label-cols-md="5"
                  >
                    <b-input-group
                      append=".00"
                      class="input-group-merge"
                    >
                      <b-form-input
                        id="paidReturn"
                        value="0"
                        style="text-align: right;"
                      />
                    </b-input-group>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="12">
                  <b-form-textarea />
                </b-col>
              </b-row>
            </b-form>
          </b-modal>
          <!-- End of Payment Modal -->

          <!-- End of Modal Section -->
        </b-card></b-col>
    </b-row>
  </div>
</template>

<script>
import {
  BRow, BCol, BCard, BForm, BFormGroup, BFormInput, BButton, BFormSpinbutton, BAlert, BFormSelect, BInputGroup, BModal, BFormTextarea, VBModal,
} from 'bootstrap-vue'
import { heightTransition } from '@core/mixins/ui/transition'
import Ripple from 'vue-ripple-directive'
// import { useEcommerceUi } from '../useEcommerce'
import ApiService from '@/connection/apiService'
import { parentComponent } from './PageContent.vue'
import { useEcommerceUi } from './ActionHandling'

const appService = new ApiService()

export default {
  components: {
    BRow,
    BCol,
    BForm,
    BFormGroup,
    BFormInput,
    BButton,
    BFormSpinbutton,
    BModal,
    BFormTextarea,
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
      selectedWarehouse: null,
      selectedBiller: null,
      selectedCustomer: null,
      selectedMetode: null,
      selectedCashier: null,
      selectedKategori: null,
      selectedSubKategori: null,
      selectedType: null,
      selectedBrand: null,
      selectedUnits: null,
      noReference: '38942808192',
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
        value: 'Cash',
        text: 'Cash',
      },
      {
        value: 'Transfer',
        text: 'Transfer Bank',
      },
      {
        value: 'Gopay',
        text: 'Gopay',
      }],
      items: [{
        id: 20200001909,
        name: 'Google - Google Home - White/Slate fabric',
        stock: 100,
        quantity: 10,
        price: 34,
        subtotal() {
          return this.price * this.quantity
        },
      }, {
        id: 20200001910,
        name: 'Apple Watch Series 4 GPS',
        stock: 50,
        quantity: 2,
        price: 22,
        subtotal() {
          return this.price * this.quantity
        },
      }, {
        id: 20200001911,
        name: 'Apple Macbook Air Latest Version',
        stock: 70,
        quantity: 3,
        price: 110,
        subtotal() {
          return this.price * this.quantity
        },
      }, {
        id: 20200001912,
        name: 'Beats Headphone',
        stock: 143,
        quantity: 21,
        price: 12,
        subtotal() {
          return this.price * this.quantity
        },
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
      // customers: [{
      //   value: null,
      //   text: 'Walk-in Customer',
      //   disabled: true,
      // },
      // {
      //   value: 'Fauzan',
      //   text: 'Fauzan',
      // },
      // {
      //   value: 'Robiyanto',
      //   text: 'Robiyanto',
      // },
      // {
      //   value: 'Kikik',
      //   text: 'Kikik',
      // }],
      customerBaru: {
        nama_customer: '',
        telp_customer: '',
        no_identitas: '',
        alamat: '',
        no_references: '',
      },
      customers: [],
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
  computed: {
    totalQuantities() {
      let total = 0
      this.items.forEach(item => {
        total += item.quantity
      })
      return total
    },
    totalSubtotal() {
      let total = 0
      this.items.forEach(item => {
        total += item.subtotal()
      })
      return total
    },
  },
  mounted() {
    this.initTrHeight()
    this.getAllCustomers()
  },
  created() {
    window.addEventListener('resize', this.initTrHeight)
    parentComponent.$on('getProduct', product => {
      const isInCart = this.items.find(item => item.id === product.id)
      if (isInCart) {
        isInCart.quantity += 1
      } else {
        const newProduct = {
          id: product.id,
          name: product.name,
          stock: 100,
          quantity: 1,
          price: product.price,
          subtotal() {
            return this.price * this.quantity
          },
        }
        this.items.unshift(newProduct)
      }
      this.makeToast(product.name, 'Berhasil ditambahkan ke keranjang')
    })
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
    makeToast(title, content) {
      this.$bvToast.toast(content, {
        title,
        variant: 'danger',
        toaster: 'b-toaster-bottom-right',
      })
    },
    resetButton() {
      this.selectedCustomer = null
      this.selectedCashier = null
      this.noReference = ''
      this.items = []
    },
    async addNewCustomer() {
      const newCustomer = {
        nama_customer: this.customerBaru.nama_customer,
        telp_customer: this.customerBaru.telp_customer,
        no_identitas: this.customerBaru.no_identitas,
        alamat: this.customerBaru.alamat,
        no_references: this.customerBaru.no_references,
      }
      appService.addCustomer(newCustomer).then(response => {
        console.log(response)
        this.makeToast('Customer Baru', 'Berhasil ditambahkan ke daftar customer')
        this.getAllCustomers()
      }).catch(err => {
        console.log(err)
      })
      this.selectedCustomer = null
      this.selectedCashier = null
      this.$bvModal.hide('customerAdd')
    },
    async getAllCustomers() {
      appService.getCustomer().then(response => {
        const { data } = response.data
        console.log(data)
        this.customers = []
        if (data) {
          this.customers.push({
            value: null,
            text: 'Walk-in Customer',
          })
          data.forEach(item => {
            this.customers.push({
              value: item.nama,
              text: item.nama,
            })
          })
        }
      })
    },
  },
  setup() {
    const { handleCartActionClick } = useEcommerceUi()
    function addToAntrian() {
      if (this.items.length) {
        handleCartActionClick(this.items)
        this.resetButton()
        this.makeToast('Daftar Belanja', 'Berhasil ditambahkan ke daftar antrian')
      } else {
        this.makeToast('Keranjang Masih Kosong', 'Silahkan isi keranjang belanja terlebih dahulu')
      }
    }
    return {
      // handleCartActionClick,
      addToAntrian,
    }
  },
}
</script>

<style lang="scss" scoped>
.repeater-form {
  overflow: hidden;
  transition: .35s height;
}
</style>
