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
                      v-model="productCode"
                      name="kode"
                      placeholder="Masukkan kode atau scan barcode pada kemasan produk"
                      :disabled="disableStdInput"
                      :state="productCode.length > 0"
                      type="text"
                    />
                    <b-form-invalid-feedback>
                      Kode Produk Wajib Diisi
                    </b-form-invalid-feedback>
                  </b-form-group>
                </b-col>
                <b-col cols="6">
                  <b-form-group
                    label="Nama Produk"
                    label-for="nama"
                  >
                    <b-form-input
                      id="nama"
                      v-model="productName"
                      name="nama"
                      list="produk-sig"
                      placeholder="Masukkan nama produk"
                      :disabled="disableStdInput"
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
                <b-col cols="6">
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
                <!-- <b-col cols="2">
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
                </b-col> -->
                <b-col cols="6">
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
                <!-- <b-col cols="2">
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
                </b-col> -->
              </b-row>
              <b-row>
                <b-col cols="6">
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
                <!-- <b-col cols="2">
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
                </b-col> -->
                <b-col cols="6">
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
                <!-- <b-col cols="2">
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
                </b-col> -->
              </b-row>
              <b-row>
                <b-col cols="6">
                  <b-form-group
                    label="Harga jual"
                    label-for="sellprice"
                  >
                    <b-form-input
                      id="sellprice"
                      v-model="productPrice"
                      :state="productPrice.length > 0 && productPrice.charAt(0) != '0'"
                      type="number"
                      name="sellprice"
                    />
                    <b-form-invalid-feedback>
                      Harga Produk wajib diisi dengan benar
                    </b-form-invalid-feedback>
                  </b-form-group>
                </b-col>
                <b-col cols="4">
                  <b-form-group
                    label="Satuan Penjualan"
                    label-for="unit"
                  >
                    <b-form-select
                      id="unit"
                      v-model="selectedUnit"
                      name="unit"
                      :options="unitItems"
                      :state="selectedUnit != null"
                    />
                    <b-form-invalid-feedback>
                      Satuan jual wajib dipilih
                    </b-form-invalid-feedback>
                  </b-form-group>
                </b-col>
                <b-col cols="2">
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
                <b-col cols="6">
                  <b-form-group
                    label="Lampirkan Gambar Produk"
                    label-for="attachment"
                  >
                    <b-form-file
                      id="attachment"
                      name="attachment"
                      accept="image/jpeg, image/png"
                      @change="onFileChange"
                    />
                  </b-form-group>
                </b-col>
                <b-col cols="6">
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
          <b-col cols="4">
            <span>Pratinjau Gambar Produk :</span>
            <br>
            <b-img
              v-if="productimgurl"
              :src="productimgurl"
              thumbnail
              fluid
              alt="Image Produk"
            />
            <b-img
              v-else
              :src="require('@/assets/images/slider/06.jpg')"
              thumbnail
              fluid
              alt="Image Produk"
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
                v-model="productNote"
                name="note"
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
                @click="formSubmitted"
              >
                <span>Simpan Produk</span>
              </b-button>
            </div>
          </b-col>
        </b-row>
      </b-form>
    </b-card>
    <category-modal />
    <sub-category-modal />
    <type-modal />
    <brand-modal />
    <units-modal />
  </div>
</template>

<script>
import {
  BRow, BCol, BFormGroup, BFormInput, BForm, BButton, BCard, BFormSelect, BFormTextarea, BFormFile, BImg, VBModal, BFormDatalist, BFormInvalidFeedback,
} from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
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
    // BInputGroup,
    // BInputGroupPrepend,
    // FeatherIcon,
    BFormInvalidFeedback,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  props: {
    editid: {
      type: String,
      default: '',
    },
    editname: {
      type: String,
      default: '',
    },
    editqty: {
      type: String,
      default: '',
    },
    editprice: {
      type: String,
      default: '',
    },
    editimage: {
      type: String,
      default: '',
    },
    editidproduk: {
      type: Number,
      default: 0,
    },
    editkodeproduk: {
      type: String,
      default: '',
    },
    editnamaproduk: {
      type: String,
      default: '',
    },
    editimgproduk: {
      type: String,
      default: '',
    },
    editidcategory: {
      type: String,
      default: '',
    },
    editnamacategory: {
      type: String,
      default: '',
    },
    editidsubcategory: {
      type: String,
      default: '',
    },
    editnamasubcategory: {
      type: String,
      default: '',
    },
    editidbrand: {
      type: String,
      default: '',
    },
    editnamabrand: {
      type: String,
      default: '',
    },
    editidtype: {
      type: String,
      default: '',
    },
    editnamatype: {
      type: String,
      default: '',
    },
    editiduom: {
      type: String,
      default: '',
    },
    editnamauom: {
      type: String,
      default: '',
    },
    editisavailable: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      productimgurl: null,
      menuHidden: this.$store.state.appConfig.layout.menu.hidden,
      disableStdInput: true,
      matchedItem: [],
      searchProductSIG: '',
      productId: '',
      productCode: '',
      productName: '',
      productPrice: '',
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
    this.filldata()
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0]
      this.selectedFile = file
      this.productimgurl = URL.createObjectURL(file)
    },
    async filldata() {
      this.productId = this.editidproduk
      this.productimgurl = this.editimgproduk
      this.productCode = this.editkodeproduk
      this.productName = this.editname
      this.productPrice = this.editprice
      this.selectedCategory = this.editidcategory
      await this.setListSubCategory()
      this.selectedStatus = this.editisavailable
      this.selectedBrand = this.editidbrand
      this.selectedUnit = this.editiduom
      this.selectedType = this.editidtype
      this.selectedSubCategory = this.editidsubcategory
    },
    async formSubmitted() {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: 'Fitur Sedang Maintenance, Silahkan Coba Beberapa Saat Lagi',
          icon: 'AlertCircleIcon',
          variant: 'danger',
        },
      })
      // if (this.formValidate()) {
      //   const param = new FormData()
      //   param.append('gambar_product', this.selectedFile)
      //   param.append('id_subcategory', this.selectedSubCategory)
      //   param.append('id_brand', this.selectedBrand)
      //   param.append('id_type', this.selectedType)
      //   param.append('kode_product', this.productCode)
      //   param.append('nama_product', this.productName)
      //   param.append('price', this.productPrice)
      //   param.append('qty', 0)
      //   param.append('uom', this.selectedUnit)
      //   param.append('notes', this.productNote)
      //   appService.storeProduct(param).then(response => {
      //     const { data } = response
      //     if (data.result) {
      //       this.$toast({
      //         component: ToastificationContent,
      //         props: {
      //           title: 'Sukses Menambahkan Produk',
      //           icon: 'CoffeeIcon',
      //           variant: 'success',
      //         },
      //       })
      //       this.disableStdInput = false
      //       this.productimgurl = null
      //       this.productCode = ''
      //       this.productName = ''
      //       this.productPrice = ''
      //       this.productNote = ''
      //       this.selectedCategory = null
      //       this.selectedStatus = null
      //       this.selectedSubCategory = null
      //       this.selectedBrand = null
      //       this.selectedUnit = null
      //       this.selectedType = null
      //       this.selectedFile = null
      //       this.$router.push('/myproduct')
      //     } else {
      //       this.$toast({
      //         component: ToastificationContent,
      //         props: {
      //           title: 'Gagal Menambahkan Produk',
      //           icon: 'AlertCircleIcon',
      //           variant: 'danger',
      //         },
      //       })
      //     }
      //   })
      // }
    },
    async setProdukDetail() {
      const itemlist = this.detailProdukSIG
      this.matchedItem = []
      itemlist.forEach(item => {
        if ((item.nama_produk).toLowerCase() === (this.productName).toLowerCase()) {
          this.matchedItem = item
        }
      })
      if (this.matchedItem.length === 0) {
        this.disableStdInput = false
        this.selectedCategory = null
        this.selectedStatus = null
        this.selectedSubCategory = null
        this.selectedBrand = null
        this.selectedUnit = null
        this.selectedType = null
        this.selectedFile = null
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
        this.disableStdInput = true
      }
    },
    async setListCategory() {
      appService.getCategoryList().then(response => {
        const { data } = response
        this.categoryItems = []
        this.categoryItems.push({
          value: null,
          text: 'Pilih salah satu kategori',
          disabled: true,
        })
        if (data.data) {
          const itemlist = data.data
          itemlist.forEach(item => {
            this.categoryItems.push({
              value: item.id,
              text: item.nama_category,
            })
          })
        }
      })
    },
    async setListSubCategory() {
      const param = {
        id_category: this.selectedCategory,
      }
      appService.getSubcategoryList(param).then(response => {
        const { data } = response
        this.subCategoryItems = []
        this.subCategoryItems.push({
          value: null,
          text: 'Pilih salah satu Sub-Kategori',
          disabled: true,
        })
        if (data.data) {
          const itemlist = data.data
          itemlist.forEach(item => {
            this.subCategoryItems.push({
              value: item.id,
              text: item.nama_category,
            })
          })
        }
      })
    },
    async setListBrand() {
      appService.getBrandList().then(response => {
        const { data } = response
        this.brandItems = []
        this.brandItems.push({
          value: null,
          text: 'Pilih salah satu Brand / Merek',
          disabled: true,
        })
        if (data.data) {
          const itemlist = data.data
          itemlist.forEach(item => {
            this.brandItems.push({
              value: item.id,
              text: item.nama_brand,
            })
          })
        }
      })
    },
    async setListType() {
      appService.getTypeList().then(response => {
        const { data } = response
        this.typeItems = []
        this.typeItems.push({
          value: null,
          text: 'Pilih salah satu Tipe',
          disabled: true,
        })
        if (data.data) {
          const itemlist = data.data
          itemlist.forEach(item => {
            this.typeItems.push({
              value: item.id,
              text: item.nama_type,
            })
          })
        }
      })
    },
    async setListUOM() {
      appService.getUomList().then(response => {
        const { data } = response
        this.unitItems = []
        this.unitItems.push({
          value: null,
          text: 'Pilih salah satu Unit / UOM',
          disabled: true,
        })
        if (data.data) {
          const itemlist = data.data
          itemlist.forEach(item => {
            this.unitItems.push({
              value: item.id,
              text: item.nama_uom,
            })
          })
        }
      })
    },
    async setListProductSIG() {
      const param = {
        q: this.searchProductSIG,
      }
      appService.getProductSigList(param).then(response => {
        const { data } = response
        this.listProdukSIG = []
        this.detailProdukSIG = []
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
        }
      })
    },
    formValidate() {
      const errMsg = []

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
        errMsg.push('Harga Produk Wajib Diisi')
      }
      if (!this.selectedStatus && this.selectedStatus === null) {
        errMsg.push('Status Wajib Diisi')
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
