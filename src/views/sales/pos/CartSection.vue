<template>
  <div>
    <b-row>
      <b-col>
        <b-card>
          <!-- Customer Form Section -->
          <div>
            <b-row>
              <!-- Selling Code -->
              <b-col cols="5">
                <b-form-group
                  label="Kode Penjualan"
                  label-for="sellingCode"
                >
                  <b-form-input
                    id="sellingCode"
                    v-model="transactionCode"
                    disabled
                  />
                </b-form-group>
              </b-col>
              <!-- Customer List -->
              <b-col cols="5">
                <b-form-group
                  label="Customer"
                  label-for="customer"
                >
                  <b-form-select
                    id="customer"
                    v-model="selectedCustomer"
                    :options="customerList"
                  />
                </b-form-group>
              </b-col>
              <!-- Add New Customer Button -->
              <b-col cols="2">
                <b-button
                  v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                  v-b-modal.addCustomer
                  variant="danger"
                  class="btn-icon mt-2"
                >
                  <feather-icon icon="UserPlusIcon" />
                </b-button>
              </b-col>
            </b-row>
            <b-row>
              <!-- Cashier List -->
              <b-col cols="5">
                <b-form-select
                  id="cashier"
                  v-model="selectedCashier"
                  :options="cashierList"
                />
              </b-col>
              <!-- No. Reference -->
              <b-col cols="5">
                <b-form-input
                  id="jagoId"
                  v-model="noReference"
                  placeholder="No. Referensi Jago Bangunan"
                />
              </b-col>
            </b-row>
            <b-row>
              <b-col>
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
                    :id="item.id_produk"
                    :key="item.kode_produk"
                    ref="row"
                  >
                    <b-col sm="4">
                      <b-row>
                        <!-- Product Code -->
                        <b-col>
                          <span>
                            {{ item.kode_produk }}
                            <feather-icon
                              v-b-modal.cartProductEdit
                              icon="EditIcon"
                              style="color: #b20838"
                            />
                          </span>
                        </b-col>
                      </b-row>
                      <b-row>
                        <!-- Item Name -->
                        <b-col>
                          <span style="font-weight: bold; font-size: 14px;">
                            {{ item.nama_produk }}
                          </span>
                        </b-col>
                      </b-row>
                      <b-row>
                        <!-- Price Item -->
                        <b-col>
                          <span>
                            Rp. {{ formatPrice(item.price) }} / PCS
                          </span>
                        </b-col>
                      </b-row>
                    </b-col>
                    <!-- Quantity -->
                    <b-col sm="3">
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
                      sm="3"
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
                      sm="2"
                      class="text-right text-md-center"
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
                    <b-col>
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
          <b-row>
            <b-col>
              <hr>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="6">
              <b-form-group
                label="Item"
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
                    :value="items.length + '(' + totalQuantity + ')'"
                    plaintext
                  />
                </b-input-group>
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group
                label="Sub Total"
                label-for="subtotal"
                label-cols-md="4"
              >
                <b-input-group
                  prepend="Rp."
                  append=".00"
                  class="input-group-merge"
                >
                  <b-form-input
                    id="subtotal"
                    style="text-align: right;"
                    :value="totalSubtotal"
                    disabled
                  />
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <hr>
            </b-col>
          </b-row>
          <!-- End Total Section -->
          <!-- Action Button Section -->
          <div>
            <b-row>
              <b-col md="3">
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
              <b-col md="3" />
              <b-col md="3">
                <b-button
                  v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                  variant="warning"
                  class="mb-1"
                  block
                  :style="!items.length ? {opacity: opacityValue, cursor: cursorValue} : ''"
                  @click="addToAntrian"
                >
                  Antrian
                </b-button>
              </b-col>
              <b-col md="3">
                <b-button
                  v-ripple.400="'rgba(40, 199, 111, 0.15)'"
                  variant="danger"
                  class="mb-1"
                  block
                  :style="!items.length ? {opacity: opacityValue, cursor: cursorValue} : ''"
                  @click="handlePaymentModal"
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
            id="addCustomer"
            centered
            size="lg"
            title="Tambah Customer"
            hide-footer
          >
            <b-form>
              <b-row>
                <b-col cols="6">
                  <b-form-group
                    label="Nama Customer :"
                    label-for="customerName"
                  >
                    <b-form-input
                      id="customerName"
                      v-model="customerBaru.nama_customer"
                      :state="customerBaru.nama_customer.length > 0"
                      trim
                    />
                    <b-form-invalid-feedback>
                      Nama customer tidak boleh kosong
                    </b-form-invalid-feedback>
                  </b-form-group>
                </b-col>
                <b-col cols="6">
                  <b-form-group
                    label="No. Referensi :"
                    label-for="reference"
                  >
                    <b-form-input
                      id="reference"
                      v-model="customerBaru.no_references"
                      trim
                    />
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="6">
                  <b-form-group
                    label="No. Handphone : "
                    label-for="phone"
                  >
                    <b-form-input
                      id="phone"
                      v-model="customerBaru.telp_customer"
                      :state="customerBaru.telp_customer.length > 0"
                      trim
                    />
                    <b-form-invalid-feedback>
                      No. handphone tidak boleh kosong
                    </b-form-invalid-feedback>
                  </b-form-group>
                </b-col>
                <b-col cols="6">
                  <b-form-group
                    label="No. Identitas/KTP :"
                    label-for="ktp"
                  >
                    <b-form-input
                      id="ktp"
                      v-model="customerBaru.no_identitas"
                      trim
                    />
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="12">
                  <b-form-group
                    label="Alamat :"
                    label-for="address"
                  >
                    <b-form-textarea
                      id="address"
                      v-model="customerBaru.alamat"
                      trim
                      rows="4"
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
                    @click="$bvModal.hide('addCustomer')"
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
            hide-footer
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
                    label-cols="4"
                  >
                    <b-input-group
                      class="input-group-merge"
                    >
                      <b-form-input
                        id="items"
                        style="text-align: right;"
                        :value="items.length + '(' + totalQuantity + ')'"
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
                    label-cols="4"
                  >
                    <b-input-group
                      prepend="Rp."
                      append=".00"
                      class="input-group-merge"
                    >
                      <b-form-input
                        id="subtotal"
                        style="text-align: right;"
                        :value="totalSubtotal"
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
                      :options="customerList"
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
                        v-model="inputDiscount"
                        type="number"
                        style="text-align: right;"
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
                      v-model="noReference"
                      type="number"
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
                        v-model="inputTax"
                        type="number"
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
                      v-model="selectedPaymentMethod"
                      :options="paymentMethod"
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
                        v-model="inputOngkir"
                        type="number"
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
                        <strong>Grand Total : {{ grandTotal }}</strong>
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
                        v-model="inputPaid"
                        type="number"
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
                        style="text-align: right;"
                        :value="kembalian"
                        disabled
                      />
                    </b-input-group>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="12">
                  <b-form-textarea
                    v-model="note"
                  />
                </b-col>
              </b-row>
              <b-row class="mt-2">
                <b-col class="text-right">
                  <b-button
                    class="mr-1"
                    @click="$bvModal.hide('paymentModal')"
                  >
                    Kembali
                  </b-button>
                  <b-button
                    variant="danger"
                    @click="saveTransaction"
                  >
                    Selesai
                  </b-button>
                </b-col>
              </b-row>
            </b-form>
          </b-modal>
          <!-- End of Payment Modal -->
          <!-- End of Modal Section -->
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {
  BRow, BCol, BCard, BForm, BFormGroup, BFormInput, BButton, BFormSpinbutton, BAlert, BFormSelect, BInputGroup, BModal, BFormTextarea, VBModal, BFormInvalidFeedback,
} from 'bootstrap-vue'
import { heightTransition } from '@core/mixins/ui/transition'
import Ripple from 'vue-ripple-directive'
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
    BFormInvalidFeedback,
  },
  directives: {
    Ripple,
    'b-modal': VBModal,
  },
  mixins: [heightTransition],
  data() {
    return {
      transactionCode: '',
      // List Item
      customerList: [],
      cashierList: [],
      items: [],
      // Selected Item
      selectedCustomer: null,
      selectedCashier: null,
      selectedPaymentMethod: null,
      selectedKategori: null,
      selectedSubKategori: null,
      selectedType: null,
      selectedBrand: null,
      selectedUnits: null,
      selectedWarehouse: null,
      selectedBiller: null,
      noReference: '',
      customerBaru: {
        nama_customer: '',
        telp_customer: '',
        no_identitas: '',
        alamat: '',
        no_references: '',
      },
      inputDiscount: 0,
      inputTax: 0,
      paymentMethod: [{
        value: null,
        text: 'Pilih salah satu metode pembayaran',
      },
      {
        value: 1,
        text: 'Cash',
      },
      {
        value: 2,
        text: 'Kredit',
      }],
      inputOngkir: 0,
      inputPaid: 0,
      note: '',
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
        text: '678298 - Warehouse Jakarta',
      },
      {
        value: 698983,
        text: '698983 - Warehouse Padang',
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
      opacityValue: 0.5,
      cursorValue: 'auto !important',
    }
  },
  computed: {
    totalQuantity() {
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
    inputCheck() {
      if (this.customerBaru.nama_customer.trim().length > 0) {
        return true
      }
      return false
    },
    grandTotal() {
      return this.selectedPaymentMethod === 2 ? 0 : Number(this.totalSubtotal) - Number(this.inputDiscount) + Number(this.inputTax) + Number(this.inputOngkir)
    },
    kembalian() {
      return this.inputPaid > 0 ? Number(this.inputPaid) - Number(this.grandTotal) : 0
    },
  },
  mounted() {
    this.setTransactionCode()
    this.getAllCustomers()
    this.getAllCashiers()
    this.initTrHeight()
  },
  created() {
    window.addEventListener('resize', this.initTrHeight)
    this.addProductToList()
  },
  destroyed() {
    window.removeEventListener('resize', this.initTrHeight)
    parentComponent.$off('addProductToCart')
  },
  methods: {
    test() {
      console.log('test')
    },
    async setTransactionCode() {
      appService.getKodeTransaction().then(response => {
        const { data } = response
        this.transactionCode = data.kode
      })
    },
    async getAllCustomers() {
      appService.getCustomer().then(response => {
        const { data } = response.data
        console.log(data)
        this.customerList = []
        if (data) {
          this.customerList.push({
            value: null,
            text: 'Walk-in Customer',
          })
          data.forEach(item => {
            this.customerList.push({
              value: item.uuid,
              text: item.nama,
            })
          })
        }
      })
    },
    async getAllCashiers() {
      const param = {
        limit: 15,
      }
      appService.getCashier(param).then(response => {
        const { data } = response.data
        if (data) {
          this.cashierList.push({
            value: null,
            text: 'Pilih Kasir',
          })
          data.forEach(item => {
            this.cashierList.push({
              value: item.uuid,
              text: item.name,
            })
          })
        }
      })
    },
    async addNewCustomer() {
      const newCustomer = {
        nama_customer: this.customerBaru.nama_customer,
        telp_customer: this.customerBaru.telp_customer,
        no_identitas: this.customerBaru.no_identitas,
        alamat: this.customerBaru.alamat,
        no_references: this.customerBaru.no_references,
      }
      if (this.formAddNewCustomerValidate()) {
        appService.addCustomer(newCustomer).then(response => {
          const { data } = response
          if (data.message) {
            this.makeToast('Customer Baru Gagal Ditambahkan', data.message[0])
          } else {
            this.makeToast('Customer Baru Berhasil Ditambahkan', 'Silahkan cek di daftar customer')
            this.getAllCustomers()
            this.resetAddNewCustomer()
          }
        }).catch(err => {
          console.log(err)
          this.makeToast('Customer Baru Gagal Ditambahkan', 'Silahkan lengkapi form terlebih dahulu')
        })
        this.$bvModal.hide('addCustomer')
      }
    },
    addProductToList() {
      parentComponent.$on('addProductToCart', product => {
        const isInCart = this.items.find(item => item.id_produk === product.id_produk)
        if (isInCart) {
          isInCart.quantity += 1
        } else {
          const newProduct = {
            id_produk: product.id_produk,
            kode_produk: product.kode_produk,
            price: product.price,
            nama_produk: product.nama_produk,
            quantity: 1,
            subtotal() {
              return this.price * this.quantity
            },
          }
          this.items.unshift(newProduct)
        }
        this.makeToast(product.nama_produk, 'Berhasil ditambahkan ke keranjang')
      })
    },
    async saveTransaction() {
      const products = []
      this.items.forEach(item => {
        products.push({
          qty: item.quantity,
          notes: this.note,
          id_product: item.id_produk,
        })
      })
      const param = {
        date_transaction: this.currentDate(),
        customer_id: this.selectedCustomer,
        cashier_id: this.selectedCashier,
        kode_transaction: this.transactionCode,
        discount: this.inputDiscount,
        shipping: this.inputOngkir,
        tax: this.inputTax,
        pay_amount: this.grandTotal,
        payment_type: this.selectedPaymentMethod,
        items: products,
      }
      if (this.formSaveTransactionValidate()) {
        appService.updatePayTransaction(param).then(response => {
          const { data } = response.data
          if (data.message) {
            this.makeToast('Transaksi Gagal Disimpan', data.message[0])
          } else {
            this.makeToast('Transaksi Berhasil Disimpan', 'Silahkan cek di daftar penjualan')
            this.setTransactionCode()
            this.resetSaveTransaction()
          }
        }).catch(err => {
          console.log(err)
          this.makeToast('Transaksi Gagal Disimpan', 'Silahkan lengkapi form terlebih dahulu')
        })
        this.$bvModal.hide('paymentModal')
      }
    },
    async addToAntrian() {
      if (this.items.length) {
        if (this.addToAntrianValidate()) {
          const products = []
          this.items.forEach(item => {
            products.push({
              qty: item.quantity,
              notes: this.note,
              id_product: item.id_produk,
            })
          })
          const param = {
            date_transaction: this.currentDate(),
            customer_id: this.selectedCustomer,
            cashier_id: this.selectedCashier,
            kode_transaction: this.transactionCode,
            discount: this.inputDiscount,
            shipping: this.inputOngkir,
            tax: this.inputTax,
            items: products,
          }
          console.log(param)
          appService.addAntrian(param).then(response => {
            const { data } = response.data
            if (data.message) {
              this.makeToast('Antrian Gagal Ditambahkan', data.message[0])
            } else {
              this.makeToast('Antrian Berhasil Ditambahkan', 'Silahkan cek di daftar antrian')
              this.setTransactionCode()
              this.selectedCustomer = null
              this.items = []
            }
          }).catch(err => {
            console.log(err)
            this.makeToast('Antrian Gagal Ditambahkan', 'Silahkan lengkapi form terlebih dahulu')
          })
        }
      } else {
        this.makeToast('Tambah Antrian', 'Silahkan isi keranjang belanja terlebih dahulu')
      }
    },
    resetButton() {
      this.selectedCustomer = null
      this.selectedCashier = null
      this.noReference = null
      this.items = []
    },
    resetAddNewCustomer() {
      this.customerBaru = {
        nama_customer: '',
        telp_customer: '',
        no_identitas: '',
        alamat: '',
        no_references: '',
      }
      this.selectedCustomer = null
    },
    resetSaveTransaction() {
      this.selectedCustomer = null
      this.noReference = null
      this.inputDiscount = 0
      this.inputTax = 0
      this.selectedPaymentMethod = null
      this.inputOngkir = 0
      this.inputPaid = 0
      this.note = ''
    },
    formatPrice(value) {
      const val = (value / 1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    removeItem(index) {
      this.items.splice(index, 1)
      this.trTrimHeight(this.$refs.row[0].offsetHeight)
    },
    makeToast(title, content) {
      this.$bvToast.toast(content, {
        title,
        variant: 'danger',
        toaster: 'b-toaster-bottom-right',
      })
    },
    currentDate() {
      const d = new Date()
      const year = d.getFullYear().toString()
      const month = (d.getMonth() + 1).toString().padStart(2, '0')
      const day = d.getDate().toString().padStart(2, '0')
      return [year, month, day].join('-')
    },
    handlePaymentModal() {
      if (!this.items.length) {
        this.makeToast('Simpan Transaksi', 'Silahkan isi keranjang belanja terlebih dahulu')
      } else {
        this.$bvModal.show('paymentModal')
      }
    },
    formAddNewCustomerValidate() {
      const title = 'Customer Baru'
      if (!this.customerBaru.nama_customer.length) {
        this.makeToast(title, 'Nama customer tidak boleh kosong')
        return false
      }
      if (!this.customerBaru.telp_customer.length) {
        this.makeToast(title, 'No. handphone tidak boleh kosong')
        return false
      }
      if (this.customerBaru.telp_customer.charAt(0) !== '0') {
        this.makeToast(title, 'No. handphone harus dimulai angka 0')
        return false
      }
      return true
    },
    formSaveTransactionValidate() {
      const title = 'Simpan Transaksi'
      if (!this.selectedCashier) {
        this.makeToast(title, 'Silahkan pilih kasir terlebih dahulu')
        this.$bvModal.hide('paymentModal')
        return false
      }
      if (!this.selectedCustomer) {
        this.makeToast(title, 'Silahkan pilih customer terlebih dahulu')
        return false
      }
      if (!this.selectedPaymentMethod) {
        this.makeToast(title, 'Silahkan pilih tipe pembayaran terlebih dahulu')
        return false
      }
      return true
    },
    addToAntrianValidate() {
      const title = 'Tambah Antrian'
      if (!this.selectedCustomer) {
        this.makeToast(title, 'Silahkan pilih customer terlebih dahulu')
        return false
      }
      if (!this.selectedCashier) {
        this.makeToast(title, 'Silahkan pilih kasir terlebih dahulu')
        return false
      }
      return true
    },
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
  setup() {
    const { handleCartActionClick } = useEcommerceUi()
    function addToAntri() {
      if (this.items.length) {
        handleCartActionClick(this.items)
        this.makeToast('Antrian Berhasil Ditambahkan', 'Silahkan cek di daftar antrian')
        this.resetButton()
      } else {
        this.makeToast('Antrian Gagal Ditambahkan', 'Silahkan isi keranjang belanja terlebih dahulu')
      }
    }
    return {
      addToAntri,
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
