<template>
  <div>
    <loading-grow v-if="isLoading" />
    <b-card>
      <b-form @submit.prevent>
        <b-row>
          <b-col
            lg="8"
            md="12"
            sm="12"
          >
            <div>
              <b-row>
                <b-col
                  lg="6"
                  md="6"
                  sm="12"
                >
                  <b-form-group
                    label="Kode Product"
                    label-for="kode"
                  >
                    <b-form-input
                      id="kode"
                      v-model="productCode"
                      name="kode"
                      autocomplete="off"
                      placeholder="Masukkan kode atau scan barcode pada kemasan produk"
                      :disabled="disableStdInput"
                      :state="productCode.length > 0 && productCode !== '-'"
                      @keyup="formatProductCode"
                    />
                    <b-form-invalid-feedback>
                      Kode Produk Wajib Diisi
                    </b-form-invalid-feedback>
                  </b-form-group>
                </b-col>
                <b-col
                  lg="6"
                  md="6"
                  sm="12"
                >
                  <b-form-group
                    label="Nama Produk"
                    label-for="nama"
                  >
                    <b-form-input
                      id="nama"
                      v-model="productName"
                      name="nama"
                      list="produk-sig"
                      autocomplete="off"
                      placeholder="Masukkan nama produk"
                      :state="productName.length > 0"
                      @change="setProdukDetail"
                    />
                    <b-form-datalist
                      id="produk-sig"
                      :options="listProdukSIG"
                    />
                    <b-form-invalid-feedback>
                      Nama Produk Wajib Diisi
                    </b-form-invalid-feedback>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col
                  lg="4"
                  md="8"
                  sm="12"
                >
                  <b-form-group
                    label="Kategori"
                    label-for="category"
                  >
                    <b-form-select
                      id="category"
                      v-model="selectedCategory"
                      name="category"
                      :options="categoryItems"
                      :disabled="disableStdInput"
                      :state="selectedCategory != null"
                      @change="setListSubCategory"
                    />
                    <b-form-invalid-feedback>
                      Kategori wajib dipilih
                    </b-form-invalid-feedback>
                  </b-form-group>
                </b-col>
                <b-col
                  lg="2"
                  md="4"
                  sm="12"
                >
                  <b-button
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    v-b-modal.categoryAdd
                    type="submit"
                    block
                    variant="primary"
                    class="mt-0 mt-md-2"
                    style="text-align : left;"
                  ><feather-icon
                    icon="PlusIcon"
                    size="16"
                  /><span style="font-size: 13px;"> Kategori</span></b-button>
                </b-col>
                <b-col
                  lg="4"
                  md="8"
                  sm="12"
                >
                  <b-form-group
                    label="Sub Kategori"
                    label-for="subcategory"
                  >
                    <b-form-select
                      id="subcategory"
                      v-model="selectedSubCategory"
                      name="subcategory"
                      :disabled="disableStdInput"
                      :options="subCategoryItems"
                      :state="selectedSubCategory != null"
                    />
                    <b-form-invalid-feedback>
                      Sub Kategori wajib dipilih
                    </b-form-invalid-feedback>
                  </b-form-group>
                </b-col>
                <b-col
                  lg="2"
                  md="4"
                  sm="12"
                >
                  <b-button
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    v-b-modal.subcategoryAdd
                    type="submit"
                    block
                    variant="primary"
                    class="mt-0 mt-md-2"
                    style="text-align : left;"
                  ><feather-icon
                    icon="PlusIcon"
                    size="16"
                  /><span style="font-size: 13px;"> Sub-Kategori</span></b-button>
                </b-col>
              </b-row>
              <b-row>
                <b-col
                  lg="4"
                  md="8"
                  sm="12"
                >
                  <b-form-group
                    label="Tipe Produk"
                    label-for="type"
                  >
                    <b-form-select
                      id="type"
                      v-model="selectedType"
                      name="type"
                      :disabled="disableStdInput"
                      :options="typeItems"
                      :state="selectedType != null"
                    />
                    <b-form-invalid-feedback>
                      Tipe Produk wajib dipilih
                    </b-form-invalid-feedback>
                  </b-form-group>
                </b-col>
                <b-col
                  lg="2"
                  md="4"
                  sm="12"
                >
                  <b-button
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    v-b-modal.typeAdd
                    type="submit"
                    block
                    variant="primary"
                    class="mt-0 mt-md-2"
                    style="text-align : left;"
                  ><feather-icon
                    icon="PlusIcon"
                    size="16"
                  /><span style="font-size: 13px;"> Tipe Produk</span></b-button>
                </b-col>
                <b-col
                  lg="4"
                  md="8"
                  sm="12"
                >
                  <b-form-group
                    label="Brand / Merk Produk"
                    label-for="brand"
                  >
                    <b-form-select
                      id="brand"
                      v-model="selectedBrand"
                      name="brand"
                      :disabled="disableStdInput"
                      :options="brandItems"
                      :state="selectedBrand != null"
                    />
                    <b-form-invalid-feedback>
                      Brand / merk wajib dipilih
                    </b-form-invalid-feedback>
                  </b-form-group>
                </b-col>
                <b-col
                  lg="2"
                  md="4"
                  sm="12"
                >
                  <b-button
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    v-b-modal.brandAdd
                    type="submit"
                    block
                    variant="primary"
                    class="mt-0 mt-md-2"
                    style="text-align : left;"
                  ><feather-icon
                    icon="PlusIcon"
                    size="16"
                  /><span style="font-size: 13px;"> Brand / Merk</span></b-button>
                </b-col>
              </b-row>
              <b-row>
                <b-col
                  lg="6"
                  md="8"
                  sm="12"
                >
                  <b-form-group
                    label="Harga jual"
                    label-for="sellprice"
                  >
                    <b-input-group prepend="Rp.">
                      <b-form-input
                        id="sellprice"
                        v-model="priceWithFormat"
                        :state="productPrice > 0 && productPrice <= 999999999999999"
                        type="text"
                        inputMode="numeric"
                        autocomplete="off"
                        name="sellprice"
                        @keyup="formatBayar"
                      />
                      <!-- <b-form-invalid-feedback>
                        Harga Produk wajib diisi dengan benar Maksimal 9.999.999.999
                      </b-form-invalid-feedback> -->
                    </b-input-group>
                    <small
                      v-if="productPrice < 1"
                      class="text-danger"
                    >
                      Harga Produk wajib diisi dengan benar Maksimal 9.999.999.999
                    </small>
                  </b-form-group>
                </b-col>
                <b-col
                  lg="4"
                  md="8"
                  sm="12"
                >
                  <b-form-group
                    label="Satuan Penjualan"
                    label-for="unit"
                  >
                    <b-form-select
                      id="unit"
                      v-model="selectedUnit"
                      name="unit"
                      :disabled="disableStdInput"
                      :options="unitItems"
                      :state="selectedUnit != null"
                    />
                    <b-form-invalid-feedback>
                      Satuan jual wajib dipilih
                    </b-form-invalid-feedback>
                  </b-form-group>
                </b-col>
                <b-col
                  lg="2"
                  md="4"
                  sm="12"
                >
                  <b-button
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    v-b-modal.unitsAdd
                    type="submit"
                    block
                    variant="primary"
                    class="mt-0 mt-md-2"
                    style="text-align : left;"
                  ><feather-icon
                    icon="PlusIcon"
                    size="16"
                  /><span style="font-size: 13px;"> Satuan</span></b-button>
                </b-col>
              </b-row>
              <b-row>
                <b-col
                  lg="6"
                  md="6"
                  sm="12"
                >
                  <b-form-group
                    label="Gambar Produk (* .PNG / .JPEG Maks 500KB) :"
                    label-for="attachment"
                  >
                    <b-form-file
                      id="attachment"
                      name="attachment"
                      accept="image/jpeg, image/png"
                      :state="logoSize <= 500000 && allowedTipeFile === 1"
                      @change="onFileChange"
                    />
                    <b-form-invalid-feedback>
                      Ukuran Maksimal 500kB dengan tipe .PNG / .JPEG
                    </b-form-invalid-feedback>
                  </b-form-group>
                </b-col>
                <b-col
                  lg="6"
                  md="6"
                  sm="12"
                >
                  <b-form-group
                    label="Status"
                    label-for="status"
                  >
                    <b-form-select
                      id="status"
                      v-model="selectedStatus"
                      name="status"
                      :options="statusItems"
                      :state="selectedStatus != null"
                    />
                    <b-form-invalid-feedback>
                      Status Produk wajib dipilih
                    </b-form-invalid-feedback>
                  </b-form-group>
                </b-col>
              </b-row>
            </div>
          </b-col>
          <b-col
            lg="4"
            md="12"
            sm="12"
          >
            <span>Pratinjau Gambar Produk :</span>
            <br>
            <b-img
              v-if="productimgurl"
              :src="productimgurl"
              thumbnail
              fluid
              alt="Image Produk"
              style="min-width: 100%"
            />
            <b-img
              v-else
              :src="require('@/assets/images/slider/06.jpg')"
              thumbnail
              fluid
              alt="Image Produk"
              style="min-width: 100%"
            />
          </b-col>
        </b-row>
        <b-row>
          <b-col
            lg="12"
            md="12"
            sm="12"
          >
            <b-form-group
              label="Note"
              label-for="note"
            >
              <b-form-textarea
                id="note"
                v-model="productNote"
                name="note"
                autocomplete="off"
                rows="3"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col
            lg="10"
            md="8"
            sm="12"
          />
          <b-col
            lg="2"
            md="4"
            sm="12"
          >
            <div>
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                type="submit"
                variant="primary"
                style="float: right;"
                @click="formSubmitted"
              >
                <span>Tambahkan Produk</span>
              </b-button>
            </div>
          </b-col>
        </b-row>
      </b-form>
    </b-card>
    <category-modal />
    <sub-category-modal :list="categoryItems" />
    <type-modal />
    <brand-modal />
    <units-modal />
    <alert-token />
  </div>
</template>

<script>
import {
  BRow, BCol, BFormGroup, BFormInput, BForm, BButton, BCard, BFormSelect, BFormTextarea, BFormFile, BImg, VBModal, BFormDatalist, BFormInvalidFeedback, BInputGroup,
} from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import LoadingGrow from '@core/components/loading-process/LoadingGrow.vue'
import AlertToken from '@core/components/expired-token/AlertToken.vue'
import Ripple from 'vue-ripple-directive'
import ApiService from '@/connection/apiService'
import CategoryModal from './modals/CategoryModal.vue'
import SubCategoryModal from './modals/SubCategoryModal.vue'
import TypeModal from './modals/TypeModal.vue'
import BrandModal from './modals/BrandModal.vue'
import UnitsModal from './modals/UnitsModal.vue'
// import FeatherIcon from '@/@core/components/feather-icon/FeatherIcon.vue'

const appService = new ApiService()

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
    BFormDatalist,
    BInputGroup,
    // BInputGroupPrepend,
    // FeatherIcon,
    BFormInvalidFeedback,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
    LoadingGrow,
    AlertToken,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  data() {
    return {
      logoSize: 0,
      allowedTipeFile: 1,
      productimgurl: null,
      isLoading: false,
      menuHidden: this.$store.state.appConfig.layout.menu.hidden,
      disableStdInput: false,
      matchedItem: [],
      matchedCode: [],
      searchProductSIG: '',
      productCode: '',
      productName: '',
      productPrice: 0,
      productNote: '',
      selectedCategory: null,
      selectedStatus: null,
      selectedSubCategory: null,
      selectedBrand: null,
      selectedUnit: null,
      selectedType: null,
      selectedFile: '',
      listProdukSIG: [],
      detailProdukSIG: [],
      priceWithFormat: '',
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
      ],
      subCategoryItems: [
        {
          value: null,
          text: 'Pilih salah satu sub kategori',
          disabled: true,
        },
      ],
      brandItems: [
        {
          value: null,
          text: 'Pilih salah satu brand',
          disabled: true,
        },
      ],
      unitItems: [
        {
          value: null,
          text: 'Pilih salah satu unit',
          disabled: true,
        },
      ],
      typeItems: [
        {
          value: null,
          text: 'Pilih salah satu tipe',
          disabled: true,
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
  mounted() {
    this.setListProductSIG()
    this.setListCategory()
    this.setListBrand()
    this.setListType()
    this.setListUOM()
  },
  methods: {
    formatHarga(e) {
      return String(e).substring(0, 15)
    },
    formatBayar() {
      this.priceWithFormat = this.formatNumber(this.priceWithFormat.replace(/[^0-9]/g, ''))
      this.productPrice = this.regroupNumber(this.priceWithFormat)
      if (parseInt(this.productPrice, 10) > 9999999999) {
        this.priceWithFormat = '9.999.999.999'
      }
      if (this.priceWithFormat.charAt(0) === '0' && this.priceWithFormat.length > 1) {
        this.priceWithFormat = Number(this.priceWithFormat.substr(1, this.priceWithFormat.length))
      }
      this.productPrice = this.regroupNumber(this.priceWithFormat)
    },
    formatNumber(value) {
      return new Intl.NumberFormat(['ban', 'id']).format(value)
    },
    regroupNumber(number) {
      return Number(number.split('.').join(''))
    },
    formatProductCode() {
      // console.log(this.productCode)
      this.productCode = this.productCode.replace(/[^0-9-]/g, '')
      // console.log(this.productCode)
    },
    onFileChange(e) {
      const file = e.target.files[0]
      console.log(file)
      if (file) {
        this.logoSize = file.size
        if (file.size <= 500000 && ((file.type).toLowerCase() === 'image/png' || (file.type).toLowerCase() === 'image/jpeg' || (file.type).toLowerCase() === 'image/jpg')) {
          this.allowedTipeFile = 1
          this.selectedFile = file
          this.productimgurl = URL.createObjectURL(file)
        } else {
          this.selectedFile = null
          this.productimgurl = null
          if (file.size > 500000) {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Ukuran File Tidak Boleh Melebihi 500KB',
                icon: 'AlertCircleIcon',
                variant: 'danger',
              },
            })
          }
          if ((file.type).toLowerCase() === 'image/png' || (file.type).toLowerCase() === 'image/jpeg' || (file.type).toLowerCase() === 'image/jpg') {
            console.log(file.type)
          } else {
            this.allowedTipeFile = 0
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Harus Menggunkan File Dengan Tipe .PNG / .JPEG',
                icon: 'AlertCircleIcon',
                variant: 'danger',
              },
            })
          }
        }
      } else {
        this.selectedFile = null
        this.productimgurl = null
        this.logoSize = 0
      }
    },
    async formSubmitted() {
      if (this.formValidate()) {
        this.isLoading = true
        const param = new FormData()
        if (this.selectedFile !== null && this.selectedFile !== '') {
          param.append('gambar_product', this.selectedFile)
        }
        param.append('id_category', this.selectedCategory)
        param.append('id_subcategory', this.selectedSubCategory)
        param.append('id_brand', this.selectedBrand)
        param.append('id_type', this.selectedType)
        param.append('kode_product', this.productCode)
        param.append('nama_product', this.productName)
        param.append('price', this.productPrice)
        param.append('qty', 0)
        param.append('uom', this.selectedUnit)
        param.append('notes', this.productNote)
        param.append('is_available', this.selectedStatus)
        appService.storeProduct(param).then(response => {
          const { data } = response
          this.isLoading = false
          if (data.result) {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Sukses Menambahkan Produk',
                icon: 'CoffeeIcon',
                variant: 'success',
              },
            })
            this.disableStdInput = false
            this.productimgurl = null
            this.productCode = ''
            this.productName = ''
            this.productPrice = 0
            this.productNote = ''
            this.selectedCategory = null
            this.selectedStatus = null
            this.selectedSubCategory = null
            this.selectedBrand = null
            this.selectedUnit = null
            this.selectedType = null
            this.selectedFile = null
            this.$router.push('/myproduct')
          } else {
            const errMsg = data.message
            errMsg.forEach(msg => {
              this.$toast({
                component: ToastificationContent,
                position: 'top-right',
                props: {
                  title: 'Gagal Menambahkan Produk',
                  icon: 'AlertCircleIcon',
                  variant: 'danger',
                  text: msg,
                },
              })
            })
            // this.$toast({
            //   component: ToastificationContent,
            //   props: {
            //     title: 'Gagal Menambahkan Produk',
            //     icon: 'AlertCircleIcon',
            //     variant: 'danger',
            //   },
            // })
          }
        })
      }
    },
    async setProdukDetail() {
      const itemlist = this.detailProdukSIG
      this.matchedItem = []
      this.matchedCode = []
      itemlist.forEach(item => {
        if ((item.nama_produk).toLowerCase() === (this.productName).toLowerCase()) {
          this.matchedItem = item
        }
        if ((item.kode_produk).toLowerCase() === (this.productCode).toLowerCase()) {
          this.matchedCode = item
        }
      })
      if (this.matchedItem.length === 0) {
        if (this.matchedCode.length === 0) {
          console.log('Kode Produk Tidak Cocok Dengan Kode Standard')
        } else {
          this.productCode = ''
        }
        this.disableStdInput = false
        this.selectedCategory = null
        this.selectedStatus = null
        this.selectedSubCategory = null
        this.selectedBrand = null
        this.selectedUnit = null
        this.selectedType = null
        this.selectedFile = null
        this.productimgurl = null
      } else {
        this.productCode = this.matchedItem.kode_produk
        this.productName = this.matchedItem.nama_produk
        this.selectedCategory = this.matchedItem.id_category
        await this.setListSubCategory()
        this.selectedSubCategory = this.matchedItem.id_subcategory
        this.selectedBrand = this.matchedItem.id_brand
        this.selectedUnit = this.matchedItem.id_uom
        this.selectedType = this.matchedItem.id_type
        this.selectedFile = null
        this.productimgurl = this.matchedItem.img_produk
        this.disableStdInput = true
      }
    },
    async setListCategory() {
      this.isLoading = true
      appService.getCategoryList().then(response => {
        const { data } = response
        this.categoryItems = []
        this.isLoading = false
        this.categoryItems.push({
          value: null,
          text: 'Pilih salah satu kategori',
          disabled: true,
        })
        if (data.result) {
          if (data.data) {
            const itemlist = data.data
            itemlist.forEach(item => {
              this.categoryItems.push({
                value: item.id,
                text: (item.nama_category).toUpperCase(),
              })
            })
          } else {
            this.$toast({
              component: ToastificationContent,
              position: 'top-right',
              props: {
                title: 'Data Tidak Ditemukan',
                icon: 'CoffeeIcon',
                variant: 'danger',
                text: 'Data Tidak Ditemukan, Mungkin Terjadi Kesalahan',
              },
            })
          }
        } else {
          this.$bvModal.show('tokenExpired')
        }
      })
    },
    async setListSubCategory() {
      this.isLoading = true
      const param = {
        id_category: this.selectedCategory,
      }
      appService.getSubcategoryList(param).then(response => {
        const { data } = response
        this.subCategoryItems = []
        this.isLoading = false
        this.subCategoryItems.push({
          value: null,
          text: 'Pilih salah satu Sub-Kategori',
          disabled: true,
        })
        if (data.result) {
          if (data.data) {
            const itemlist = data.data
            itemlist.forEach(item => {
              this.subCategoryItems.push({
                value: item.id,
                text: (item.nama_category).toUpperCase(),
              })
            })
          } else {
            this.$toast({
              component: ToastificationContent,
              position: 'top-right',
              props: {
                title: 'Data Tidak Ditemukan',
                icon: 'CoffeeIcon',
                variant: 'danger',
                text: 'Data Tidak Ditemukan, Mungkin Terjadi Kesalahan',
              },
            })
          }
        } else {
          this.$bvModal.show('tokenExpired')
        }
      })
    },
    async setListBrand() {
      this.isLoading = true
      appService.getBrandList().then(response => {
        const { data } = response
        this.brandItems = []
        this.isLoading = false
        this.brandItems.push({
          value: null,
          text: 'Pilih salah satu Brand / Merek',
          disabled: true,
        })
        if (data.result) {
          if (data.data) {
            const itemlist = data.data
            itemlist.forEach(item => {
              this.brandItems.push({
                value: item.id,
                text: (item.nama_brand).toUpperCase(),
              })
            })
          } else {
            this.$toast({
              component: ToastificationContent,
              position: 'top-right',
              props: {
                title: 'Data Tidak Ditemukan',
                icon: 'CoffeeIcon',
                variant: 'danger',
                text: 'Data Tidak Ditemukan, Mungkin Terjadi Kesalahan',
              },
            })
          }
        } else {
          this.$bvModal.show('tokenExpired')
        }
      })
    },
    async setListType() {
      this.isLoading = true
      appService.getTypeList().then(response => {
        const { data } = response
        this.typeItems = []
        this.isLoading = false
        this.typeItems.push({
          value: null,
          text: 'Pilih salah satu Tipe',
          disabled: true,
        })
        if (data.result) {
          if (data.data) {
            const itemlist = data.data
            itemlist.forEach(item => {
              this.typeItems.push({
                value: item.id,
                text: (item.nama_type).toUpperCase(),
              })
            })
          } else {
            this.$toast({
              component: ToastificationContent,
              position: 'top-right',
              props: {
                title: 'Data Tidak Ditemukan',
                icon: 'CoffeeIcon',
                variant: 'danger',
                text: 'Data Tidak Ditemukan, Mungkin Terjadi Kesalahan',
              },
            })
          }
        } else {
          this.$bvModal.show('tokenExpired')
        }
      })
    },
    async setListUOM() {
      this.isLoading = true
      appService.getUomList().then(response => {
        const { data } = response
        this.unitItems = []
        this.isLoading = false
        this.unitItems.push({
          value: null,
          text: 'Pilih salah satu Unit / UOM',
          disabled: true,
        })
        if (data.result) {
          if (data.data) {
            const itemlist = data.data
            itemlist.forEach(item => {
              this.unitItems.push({
                value: item.id,
                text: (item.nama_uom).toUpperCase(),
              })
            })
          } else {
            this.$toast({
              component: ToastificationContent,
              position: 'top-right',
              props: {
                title: 'Data Tidak Ditemukan',
                icon: 'CoffeeIcon',
                variant: 'danger',
                text: 'Data Tidak Ditemukan, Mungkin Terjadi Kesalahan',
              },
            })
          }
        } else {
          this.$bvModal.show('tokenExpired')
        }
      })
    },
    async setListProductSIG() {
      this.isLoading = true
      const param = {
        q: this.searchProductSIG,
      }
      appService.getProductSigList(param).then(response => {
        const { data } = response
        this.listProdukSIG = []
        this.detailProdukSIG = []
        this.isLoading = false
        if (data.result) {
          if (data.data) {
            const itemlist = data.data
            itemlist.forEach(item => {
              this.listProdukSIG.push(item.nama_produk)
              this.detailProdukSIG.push({
                id_produk: item.id_produk,
                kode_produk: item.kode_produk,
                nama_produk: item.nama_produk,
                img_produk: item.img_produk,
                id_category: item.id_category,
                nama_category: item.nama_category,
                id_subcategory: item.id_subcategory,
                nama_subcategory: item.nama_subcategory,
                id_brand: item.id_brand,
                nama_brand: item.nama_brand,
                id_type: item.id_type,
                nama_type: item.nama_type,
                id_uom: item.id_uom,
                nama_uom: item.nama_uom,
              })
            })
          } else {
            this.$toast({
              component: ToastificationContent,
              position: 'top-right',
              props: {
                title: 'Data Tidak Ditemukan',
                icon: 'CoffeeIcon',
                variant: 'danger',
                text: 'Data Tidak Ditemukan, Mungkin Terjadi Kesalahan',
              },
            })
          }
        } else {
          this.$bvModal.show('tokenExpired')
        }
      })
    },
    formValidate() {
      const errMsg = []
      if (this.productPrice < 1) {
        errMsg.push('Harga Produk Wajib Diisi Dengan Benar')
      }
      if (!this.productCode && this.productCode === '') {
        errMsg.push('Kode Produk Wajib Diisi')
      }
      if (!this.productName && this.productName === '') {
        errMsg.push('Nama Produk Wajib Diisi')
      }
      if (!this.selectedSubCategory && this.selectedSubCategory === null) {
        errMsg.push('Sub Kategory Wajib Diisi')
      }
      if (!this.selectedBrand && this.selectedBrand === null) {
        errMsg.push('Brand / Merek Wajib Diisi')
      }
      if (!this.selectedUnit && this.selectedUnit === null) {
        errMsg.push('Unit / UOM Wajib Diisi')
      }
      if (!this.selectedType && this.selectedType === null) {
        errMsg.push('Tipe Produk Wajib Diisi')
      }
      if (!this.productPrice && this.productPrice === '') {
        errMsg.push('Harga Produk Wajib Diisi Dengan Benar')
      }
      if (!this.selectedStatus && this.selectedStatus === null) {
        errMsg.push('Status Wajib Diisi')
      }
      if (this.logoSize > 500000) {
        errMsg.push('Ukuran Logo Tidak Boleh Melebihi 500KB')
      }
      if (this.allowedTipeFile === 0) {
        errMsg.push('Harus Menggunkan File Dengan Tipe .PNG / .JPEG')
      }
      if (errMsg.length === 0) {
        return true
      }
      errMsg.forEach(msg => {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: msg,
            icon: 'AlertCircleIcon',
            variant: 'danger',
          },
        })
      })
      return false
    },
  },
}
</script>
