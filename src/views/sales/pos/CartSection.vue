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
                    v-model="kodeTransaction"
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
                  :options="cashiers"
                />
              </b-col>
              <b-col cols="5">
                <b-form-input
                  id="jagoId"
                  v-model="noReference"
                  placeholder="No. Referensi Jago Bangunan"
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
                    :id="item.id_produk"
                    :key="item.id_produk"
                    ref="row"
                  >
                    <!-- Item Name -->
                    <b-col md="4">
                      <b-row>
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
                        <b-col>
                          <span style="font-weight: bold; font-size: 14px;">
                            {{ item.name }}
                          </span>
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col>
                          <span>
                            Rp. {{ item.price }} / PCS
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
                      :value="totalSubtotal"
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
                    label="Nama Customer :"
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
                    label="No. Referensi :"
                    label-for="reference"
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
                    label="Nomor Handphone : "
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
                    label="Nomor Identitas/KTP :"
                    label-for="ktp"
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
                    label="Alamat :"
                    label-for="address"
                  >
                    <b-form-textarea
                      id="address"
                      v-model="customerBaru.alamat"
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
                        @keypress="isNumber"
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
                        v-model="inputDiscount"
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
                        v-model="inputOngkir"
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
                <b-col
                  cols="12"
                  class="text-right"
                >
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
      selectedCustomer: '0',
      selectedCashier: null,
      selectedWarehouse: null,
      selectedBiller: null,
      selectedMetode: null,
      selectedKategori: null,
      selectedSubKategori: null,
      selectedType: null,
      selectedBrand: null,
      selectedUnits: null,
      noReference: null,
      /* customers: [{
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
      }], */
      customers: [],
      customerBaru: {
        nama_customer: '',
        telp_customer: '',
        no_identitas: '',
        alamat: '',
        no_references: '',
      },
      /* cashierItems: [
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
      ], */
      cashiers: [],
      methodBayar: [{
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
      items: [],
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
      inputDiscount: 0,
      inputTax: 0,
      inputOngkir: 0,
      inputPaid: 0,
      kodeTransaction: '',
      note: '',
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
    grandTotal() {
      return this.selectedMetode === 2 ? 0 : Number(this.totalSubtotal) - Number(this.inputDiscount) + Number(this.inputTax) + Number(this.inputOngkir)
    },
    kembalian() {
      return this.inputPaid > 0 ? Number(this.inputPaid) - Number(this.grandTotal) : 0
    },
  },
  mounted() {
    this.initTrHeight()
    this.getAllCustomers()
    this.getAllCashiers()
    this.setKodeTransaction()
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
    addProductToList() {
      parentComponent.$on('addProductToCart', product => {
        const isInCart = this.items.find(item => item.id_produk === product.id_produk)
        if (isInCart) {
          isInCart.quantity += 1
        } else {
          const newProduct = {
            id_produk: product.id_produk,
            kode_produk: product.kode_produk,
            name: product.name,
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
    makeToast(title, content) {
      this.$bvToast.toast(content, {
        title,
        variant: 'danger',
        toaster: 'b-toaster-bottom-right',
      })
    },
    resetButton() {
      this.selectedCustomer = '0'
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
      this.selectedCustomer = '0'
    },
    resetSaveTransaction() {
      this.selectedCustomer = '0'
      this.inputDiscount = 0
      this.noReference = null
      this.inputTax = 0
      this.selectedMetode = null
      this.inputOngkir = 0
      this.inputPaid = 0
      this.note = ''
    },
    async getAllCustomers() {
      appService.getCustomer().then(response => {
        const { data } = response.data
        this.customers = []
        if (data) {
          this.customers.push({
            value: '0',
            text: 'Walk-in Customer',
          })
          data.forEach(item => {
            this.customers.push({
              value: item.uuid,
              text: item.nama,
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
      if (this.formAddCustomerValidate()) {
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
          this.makeToast('Customer Baru Gagal Ditambahkan', 'Silahkan lengkapi form customer terlebih dahulu')
        })
        this.selectedCustomer = '0'
        this.selectedCashier = null
        this.$bvModal.hide('customerAdd')
      }
    },
    async getAllCashiers() {
      const param = {
        limit: 15,
      }
      appService.getCashier(param).then(response => {
        const { data } = response.data
        if (data) {
          this.cashiers.push({
            value: null,
            text: 'Pilih Kasir',
          })
          data.forEach(item => {
            this.cashiers.push({
              value: item.uuid,
              text: item.name,
            })
          })
        }
      })
    },
    async setKodeTransaction() {
      appService.getKodeTransaction().then(response => {
        const { data } = response
        this.kodeTransaction = data.kode
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
        kode_transaction: this.kodeTransaction,
        discount: this.inputDiscount,
        shipping: this.inputOngkir,
        tax: this.inputTax,
        pay_amount: this.grandTotal,
        payment_type: this.selectedMetode,
        items: products,
      }
      console.log(param)
      if (this.formSaveTransactionValidate()) {
        appService.updatePayTransaction(param).then(response => {
          console.log(response)
          const { data } = response.data
          if (data.message) {
            this.makeToast('Transaksi Gagal Disimpan', data.message[0])
          } else {
            this.makeToast('Transaksi Berhasil Disimpan', 'Silahkan cek transaksi pembayaran di daftar penjualan')
            this.setKodeTransaction()
            this.resetSaveTransaction()
          }
        }).catch(err => {
          console.log(err)
          this.makeToast('Transaksi Gagal Disimpan', 'Silahkan lengkapi form pembayaran terlebih dahulu')
        })
        this.$bvModal.hide('paymentModal')
      }
    },
    currentDate() {
      const d = new Date()
      const year = d.getFullYear().toString()
      const month = (d.getMonth() + 1).toString().padStart(2, '0')
      const day = d.getDate().toString().padStart(2, '0')
      return [year, month, day].join('-')
    },
    formAddCustomerValidate() {
      const title = 'Customer Baru'
      const content = 'tidak boleh kosong'
      if (this.customerBaru.nama_customer.trim().length === 0) {
        this.makeToast(title, `Nama customer ${content}`)
        return false
      }
      if (this.customerBaru.no_references.trim().length === 0) {
        this.makeToast(title, `Nomor referensi ${content}`)
        return false
      }
      if (this.customerBaru.telp_customer.trim().length === 0) {
        this.makeToast(title, `Nomor handphone ${content}`)
        return false
      }
      if (this.customerBaru.telp_customer.charAt(0) !== '0') {
        this.makeToast(title, 'Nomor handphone harus dimulai angka 0')
        return false
      }
      if (this.customerBaru.no_identitas.trim().length === 0) {
        this.makeToast(title, `Nomor identitas/KTP ${content}`)
        return false
      }
      if (this.customerBaru.alamat.trim().length === 0) {
        this.makeToast(title, `Alamat ${content}`)
        return false
      }
      return true
    },
    formSaveTransactionValidate() {
      const title = 'Simpan Transaksi'
      if (!this.items.length) {
        this.makeToast(title, 'Keranjang belanja masih kosong')
        this.$bvModal.hide('paymentModal')
        return false
      }
      if (!this.selectedCashier) {
        this.makeToast(title, 'Silahkan pilih kasir terlebih dahulu')
        this.$bvModal.hide('paymentModal')
        return false
      }
      if (this.selectedCustomer === '0') {
        this.makeToast(title, 'Silahkan pilih customer terlebih dahulu')
        return false
      }
      if (!this.selectedMetode) {
        this.makeToast(title, 'Silahkan pilih tipe pembayaran terlebih dahulu')
        return false
      }
      return true
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
