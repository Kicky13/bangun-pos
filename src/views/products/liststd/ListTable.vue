<template>
  <b-card>
    <loading-grow v-if="isLoading" />
    <div id="NoprintTable">
      <div>
        <b-row>
          <b-col
            lg="6"
            md="4"
            sm="12"
          >
            <b-form-group>
              <b-form-input
                v-model="searchTerm"
                placeholder="Masukkan Kata Pencarian..."
                type="text"
                class="d-inline-block"
              />
            </b-form-group>
          </b-col>
          <b-col
            lg="1"
            md="2"
            sm="12"
          >
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="secondary"
              style="margin-bottom : 5px;"
              @click="printTable"
            >
              Print
            </b-button>
          </b-col>
          <b-col
            lg="1"
            md="2"
            sm="12"
          >
            <!-- <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              href="/product/add"
            >
              Tambah Baru
            </b-button> -->
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              style="margin-bottom : 5px;"
              @click="tambahData"
            >
              Tambah
            </b-button>
          </b-col>
          <b-col
            lg="1"
            md="2"
            sm="12"
          >
            <!-- <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              href="/product/import"
            >
              Upload
            </b-button> -->
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              style="margin-bottom : 5px;"
              @click="uploadData"
            >
              Upload
            </b-button>
          </b-col>
        </b-row>
      </div>
      <div class="demo-inline-spacing" />
      <!-- table -->
      <vue-good-table
        ref="dataCustomer"
        :columns="columns"
        :rows="rows"
        :rtl="direction"
        :search-options="{
          enabled: true,
          externalQuery: searchTerm }"
        :pagination-options="{
          enabled: true,
          perPage:pageLength
        }"
      >

        <template
          slot="table-row"
          slot-scope="props"
        >
          <span v-if="props.column.field === 'stCustomer'">
            <span>
              <b-button
                v-ripple.400="'rgba(234, 84, 85, 0.15)'"
                size="sm"
                :variant="paymentVariant(props.row.statusCust)"
              >
                {{ props.row.statusCust }}
              </b-button>
            </span>
          </span>

          <!-- Column: Action -->
          <span v-if="props.column.field === 'action'">
            <span>
              <b-button
                v-ripple.400="'rgba(234, 84, 85, 0.15)'"
                size="sm"
                variant="outline-danger"
                @click="ubahData(props.row)"
              >
                Ubah
              </b-button>
              <b-button
                v-ripple.400="'rgba(234, 84, 85, 0.15)'"
                size="sm"
                variant="outline-danger"
                @click="hapusData(props.row)"
              >
                Hapus
              </b-button>
            </span>
          </span>

          <!-- Column: Common -->
          <span v-else>
            {{ props.formattedRow[props.column.field] }}
          </span>
        </template>

        <!-- pagination -->
        <template
          slot="pagination-bottom"
          slot-scope="props"
        >
          <div class="d-flex justify-content-between flex-wrap">
            <div class="d-flex align-items-center mb-0 mt-1">
              <span class="text-nowrap">
                Showing 1 to
              </span>
              <b-form-select
                v-model="pageLength"
                :options="['3','5','10','25','50','100']"
                class="mx-1"
                @input="(value)=>props.perPageChanged({currentPerPage:value})"
              />
              <span class="text-nowrap "> of {{ props.total }} entries </span>
            </div>
            <div>
              <b-pagination
                :value="1"
                :total-rows="props.total"
                :per-page="pageLength"
                first-number
                last-number
                align="right"
                prev-class="prev-item"
                next-class="next-item"
                class="mt-1 mb-0"
                @input="(value)=>props.pageChanged({currentPage:value})"
              >
                <template #prev-text>
                  <feather-icon
                    icon="ChevronLeftIcon"
                    size="18"
                  />
                </template>
                <template #next-text>
                  <feather-icon
                    icon="ChevronRightIcon"
                    size="18"
                  />
                </template>
              </b-pagination>
            </div>
          </div>
        </template>
      </vue-good-table>
      <!-- Upload Product -->
      <b-modal
        id="UploadData"
        centered
        size="lg"
        title="Form Upload"
        ok-title="Simpan"
        cancel-title="Tutup"
        ok-variant="danger"
        @ok="handleUpload"
      >
        <b-form>
          <b-row>
            <b-col
              lg="12"
              md="12"
              sm="12"
            >
              <b-form-group
                label="Lampirkan File Master Produk (* .XLS / .XLSX) :"
                label-for="uploadattachment"
              >
                <b-form-file
                  id="uploadattachment"
                  name="uploadattachment"
                  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  :state="allowedTipeUploadFile === 1"
                  @change="onUploadChange"
                />
                <b-form-invalid-feedback>
                  File harus dengan tipe .XLS / .XLSX
                </b-form-invalid-feedback>
              </b-form-group>
              <div>
                <!-- https://api-posretail.metrojasa.com/api/admin/product/download -->
                <span><b>Catatan:</b></span>
                <br>
                <span>Lampiran file yang diupload harus sesuai dengan template yang telah disediakan. Template dapat didownload pada link <a href="https://api-posretail.metrojasa.com/api/admin/product/download">berikut</a>.</span>
              </div>
            </b-col>
          </b-row>
        </b-form>
      </b-modal>
      <b-modal
        id="askUpload"
        centered
        size="sm"
        hide-header
        hide-header-close
        ok-title="Ya, Lanjutkan ..."
        cancel-title="Batalkan"
        ok-variant="danger"
        cancel-variant="secondary"
        @ok="handleSubmitUpload"
        @cancel="handleCancelUpload"
      >
        <div class="d-block text-center">
          <h3>Apakah Anda Sudah Yakin ?</h3>
        </div>
      </b-modal>

      <!-- Tambah Product -->
      <b-modal
        id="FormData"
        centered
        size="lg"
        title="Form Produk"
        ok-title="Simpan"
        cancel-title="Tutup"
        ok-variant="danger"
        @ok="handleOk"
      >
        <b-form>
          <b-row>
            <b-col
              lg="12"
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
                        placeholder="Masukkan nama produk"
                        :state="productName.length > 0"
                      />
                      <b-form-invalid-feedback>
                        Nama Produk Wajib Diisi
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col
                    lg="6"
                    md="6"
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
                    lg="6"
                    md="6"
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
                </b-row>
                <b-row>
                  <b-col
                    lg="6"
                    md="6"
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
                    lg="6"
                    md="6"
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
                </b-row>
                <b-row>
                  <b-col
                    lg="6"
                    md="6"
                    sm="12"
                  >
                    <b-form-group
                      label="Lampirkan Gambar Produk (* .PNG / .JPEG Maks 500KB) :"
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
                </b-row>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col
              lg="6"
              md="6"
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
            <b-col
              lg="6"
              md="6"
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
                  rows="3"
                />
              </b-form-group>
            </b-col>
          </b-row>
        </b-form>
      </b-modal>
      <b-modal
        id="askSubmit"
        centered
        size="sm"
        hide-header
        hide-header-close
        ok-title="Ya, Lanjutkan ..."
        cancel-title="Batalkan"
        ok-variant="danger"
        cancel-variant="secondary"
        @ok="handleSubmit"
        @cancel="handleCancel"
      >
        <div class="d-block text-center">
          <h3>Apakah Anda Sudah Yakin ?</h3>
        </div>
      </b-modal>
      <b-modal
        id="askDelete"
        centered
        size="sm"
        hide-header
        hide-header-close
        ok-title="Ya, Lanjutkan ..."
        cancel-title="Batalkan"
        ok-variant="danger"
        cancel-variant="secondary"
        @ok="handleDelete"
        @cancel="handleCancelDelete"
      >
        <div class="d-block text-center">
          <h3>Apakah Anda Sudah Yakin ?</h3>
        </div>
      </b-modal>
      <!-- End of Customer Add -->
    </div>
    <b-card
      id="printTable"
      hidden
    >
      <div
        class="row"
        style="margin-bottom: 25px"
      >
        <div class="col-md-3">
          <b-img
            :src="require('@/assets/images/logo/POSRetailBlack.png')"
            alt="Logo POS Retail"
            style="margin-bottom : 20px; width: 100%"
          />
        </div>
      </div>

      <!-- table -->
      <table
        width="100%"
        border="1"
      >
        <thead style="text-align: center; background: #efefef !important;">
          <th>Kode Produk</th>
          <th>Nama</th>
          <th>Kategori</th>
          <th>Sub-Kategori</th>
          <th>Brand/Merk</th>
          <th>Tipe</th>
          <th>Satuan/UOM</th>
        </thead>
        <tbody style="font-size: 11px;">
          <tr
            v-for="(item) in rows"
            :id="item.id"
            :key="item.id"
          >
            <td>
              {{ item.kodeproduk }}
            </td>
            <td>
              {{ item.namaproduk }}
            </td>
            <td style="text-align: center">
              {{ item.namacategory }}
            </td>
            <td style="text-align: center">
              {{ item.namasubcategory }}
            </td>
            <td>{{ item.namabrand }}</td>
            <td style="text-align: center">
              {{ item.namatype }}
            </td>
            <td>
              {{ item.namauom }}
            </td>
          </tr>
        </tbody>
      </table>
    </b-card>

  </b-card>
</template>

<script>
import {
  BButton, BFormFile, BImg, BPagination, BForm, BFormGroup, BFormInput, BFormSelect, BCard, BRow, BCol, BFormTextarea, BFormInvalidFeedback,
} from 'bootstrap-vue'
import { VueGoodTable } from 'vue-good-table'
import store from '@/store/index'
import Ripple from 'vue-ripple-directive'
import ApiService from '@/connection/apiService'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import LoadingGrow from '@core/components/loading-process/LoadingGrow.vue'

const appService = new ApiService()

export default {
  components: {
    BButton,
    BForm,
    VueGoodTable,
    BPagination,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BFormTextarea,
    BFormInvalidFeedback,
    BCard,
    BRow,
    BCol,
    BFormFile,
    BImg,
    LoadingGrow,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      logoSize: 0,
      allowedTipeUploadFile: 1,
      allowedTipeFile: 1,
      productimgurl: null,
      isLoading: false,
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
      selectedUploadFile: '',
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
      inpId: '',
      inpCode: '',
      inpName: '',
      inpNotes: '',
      editForm: false,
      deleteData: [],
      tokoBangunanList: [],
      selectedToko: '',
      pageLength: 10,
      dir: false,
      columns: [
        {
          label: 'Kode Produk',
          field: 'kodeproduk',
        },
        {
          label: 'Nama Produk',
          field: 'namaproduk',
        },
        {
          label: 'Kategori',
          field: 'namacategory',
        },
        {
          label: 'Sub-Kategori',
          field: 'namasubcategory',
        },
        {
          label: 'Brand / Merek',
          field: 'namabrand',
        },
        {
          label: 'Tipe Produk',
          field: 'namatype',
        },
        {
          label: 'Satuan / UOM',
          field: 'namauom',
        },
        {
          label: 'Action',
          field: 'action',
        },
      ],
      rows: [],
      searchTerm: '',
    }
  },
  computed: {
    paymentVariant() {
      const statusColor = {
        ACTIVE: 'outline-secondary',
        TERMINATED: 'outline-danger',
      }
      return status => statusColor[status]
    },
    direction() {
      if (store.state.appConfig.isRTL) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.dir = true
        return this.dir
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.dir = false
      return this.dir
    },
  },
  watch: {},
  created() {
    this.fetchDataList()
    this.setListCategory()
    this.setListBrand()
    this.setListType()
    this.setListUOM()
  },
  methods: {
    printTable() {
      window.print()
      // const localOptions = {
      //   styles: [
      //     'https://cdn.jsdelivr.net/npm/vue-good-table@2.18.1/dist/vue-good-table.min.css',
      //     'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
      //     'https://unpkg.com/kidlat-css/css/kidlat.css',
      //   ],
      // }
      // this.$htmlToPaper('printTable', localOptions, () => {
      //   console.warn('done')
      // })
    },
    formatProductCode() {
      // console.log(this.productCode)
      this.productCode = this.productCode.replace(/[^0-9-]/g, '')
      // console.log(this.productCode)
    },
    onUploadChange(e) {
      const file = e.target.files[0]
      console.log(file)
      if (file) {
        if ((file.type).toLowerCase() === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || (file.type).toLowerCase() === 'application/vnd.ms-excel') {
          this.allowedTipeUploadFile = 1
          this.selectedUploadFile = file
        } else {
          this.selectedUploadFile = ''
          if ((file.type).toLowerCase() === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || (file.type).toLowerCase() === 'application/vnd.ms-excel') {
            console.log(file.type)
          } else {
            this.allowedTipeFile = 0
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Harus Menggunkan File Dengan Tipe .XLS / .XLSX',
                icon: 'AlertCircleIcon',
                variant: 'danger',
              },
            })
          }
        }
      } else {
        this.selectedUploadFile = ''
      }
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
    async setListCategory() {
      this.isLoading = true
      appService.getCategoryListAdmin().then(response => {
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
      appService.getSubCategoryListAdmin(param).then(response => {
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
                text: (item.nama_subcategory).toUpperCase(),
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
      appService.getBrandListAdmin().then(response => {
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
      appService.getTypeListAdmin().then(response => {
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
      appService.getUomListAdmin().then(response => {
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
    formatPrice(value) {
      const val = (value / 1).toFixed(0).replace('.', ',')
      const formatedval = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      return `Rp. ${formatedval}`
    },
    fetchDataList() {
      this.isLoading = true
      appService.getAdminProductSIGList({
        // limit: 50,
        // q: this.searchTerm,
        // id_toko: this.selectedToko ? this.tokoBangunanList.find(list => list.text === this.selectedToko).value : '',
        // id_toko: null,
      }).then(response => {
        this.rows = []
        const res = response.data
        this.isLoading = false
        const resdata = res.data
        if (resdata) {
          resdata.forEach(this.setupRows)
        }
      }).catch(err => {
        console.log(err)
        this.isLoading = false
      })
    },
    setupRows(data) {
      const res = {
        encodedID: data.id_produk,
        idbrand: data.id_brand,
        idcategory: data.id_category,
        idsubcategory: data.id_subcategory,
        idtype: data.id_type,
        iduom: data.id_uom,
        flag: data.flag,
        imgproduk: data.img_produk,
        isavailable: data.is_available,
        kodeproduk: data.kode_produk,
        namabrand: data.nama_brand,
        namacategory: data.nama_category,
        namaproduk: data.nama_produk,
        namasubcategory: data.nama_subcategory,
        namatype: data.nama_type,
        namauom: data.nama_uom,
      }
      this.rows.push(res)
    },
    refreshTable() {
      this.rows = []
      this.fetchDataList()
    },
    clearUploadForm() {
      this.selectedUploadFile = ''
    },
    clearForm() {
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
    },
    tambahData() {
      this.clearForm()
      this.editForm = false
      this.$bvModal.show('FormData')
    },
    uploadData() {
      this.clearForm()
      this.editForm = false
      this.$bvModal.show('UploadData')
    },
    ubahData(propsData) {
      console.log(propsData)
      this.clearForm()
      this.setForm(propsData)
      this.editForm = true
      this.$bvModal.show('FormData')
    },
    async setForm(data) {
      console.log(data)
      this.inpId = data.encodedID
      this.disableStdInput = false
      this.productimgurl = data.imgproduk
      this.productCode = data.kodeproduk
      this.productName = data.namaproduk
      this.productPrice = 0
      this.productNote = ''
      this.selectedCategory = data.idcategory
      await this.setListSubCategory()
      this.selectedStatus = ''
      this.selectedSubCategory = data.idsubcategory
      this.selectedBrand = data.idbrand
      this.selectedUnit = data.iduom
      this.selectedType = data.idtype
      this.selectedFile = ''
    },
    handleOk(okBtn) {
      if (this.formValidate()) {
        this.$bvModal.show('askSubmit')
      } else {
        this.$toast({
          component: ToastificationContent,
          position: 'top-right',
          props: {
            title: 'Form Tidak Lengkap',
            icon: 'AlertTriangleIcon',
            variant: 'danger',
            text: 'Mohon Untuk Melengkapi Form Sebelum Menyimpan Data',
          },
        })
        okBtn.preventDefault()
      }
    },
    handleUpload(okBtn) {
      if (this.uploadValidate()) {
        this.$bvModal.show('askUpload')
      } else {
        this.$toast({
          component: ToastificationContent,
          position: 'top-right',
          props: {
            title: 'Form Tidak Lengkap',
            icon: 'AlertTriangleIcon',
            variant: 'danger',
            text: 'Mohon Untuk Melengkapi Form Sebelum Menyimpan Data',
          },
        })
        okBtn.preventDefault()
      }
    },
    handleCancel() {
      this.$bvModal.show('FormData')
    },
    handleCancelUpload() {
      this.$bvModal.show('UploadData')
    },
    handleCancelDelete() {
      this.deleteData = []
    },
    handleSubmit() {
      // console.log('OK')
      this.isLoading = true
      if (this.editForm) {
        this.fetchUpdateCustomer()
      } else {
        this.fetchDataInsert()
      }
    },
    handleSubmitUpload() {
      // console.log('OK')
      this.isLoading = true
      this.fetchDataUpload()
    },
    fetchUpdateCustomer() {
      this.isLoading = true
      const param = new FormData()
      param.append('id_product', this.inpId)
      if (this.selectedFile !== null && this.selectedFile !== '') {
        param.append('gambar_product', this.selectedFile)
      }
      // param.append('id_category', this.selectedCategory)
      // param.append('id_subcategory', this.selectedSubCategory)
      param.append('id_category', this.selectedSubCategory)
      param.append('id_brand', this.selectedBrand)
      param.append('id_type', this.selectedType)
      param.append('kode_product', this.productCode)
      param.append('nama_product', this.productName)
      param.append('id_uom', this.selectedUnit)
      param.append('notes', this.productNote)
      appService.updateProductAdmin(param).then(response => {
        const { data } = response
        this.isLoading = false
        if (data.result) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Berhasil Mengubah Informasi Produk',
              icon: 'CoffeeIcon',
              variant: 'success',
              text: 'Master Produk Berhasil Diubah',
            },
          })
          this.fetchDataList()
          this.clearForm()
        } else {
          this.$toast({
            component: ToastificationContent,
            props: {
              // title: 'Gagal Mengubah Data Produk',
              title: 'Gagal Mengubah Informasi Produk',
              icon: 'AlertCircleIcon',
              variant: 'danger',
              text: `Galat : ${data.message[0]}`,
            },
          })
        }
      })
    },
    fetchDataInsert() {
      this.isLoading = true
      const param = new FormData()
      if (this.selectedFile !== null && this.selectedFile !== '') {
        param.append('gambar_product', this.selectedFile)
      }
      // param.append('id_category', this.selectedCategory)
      // param.append('id_subcategory', this.selectedSubCategory)
      param.append('id_category', this.selectedSubCategory)
      param.append('id_brand', this.selectedBrand)
      param.append('id_type', this.selectedType)
      param.append('kode_product', this.productCode)
      param.append('nama_product', this.productName)
      param.append('id_uom', this.selectedUnit)
      param.append('notes', this.productNote)
      appService.saveProductAdmin(param).then(response => {
        const { data } = response
        this.isLoading = false
        if (data.result) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Berhasil Menambahkan Produk',
              icon: 'CoffeeIcon',
              variant: 'success',
              text: 'Master Produk Berhasil Ditambahkan',
            },
          })
          this.fetchDataList()
          this.clearForm()
        } else {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Gagal Menambahkan Produk',
              icon: 'AlertCircleIcon',
              variant: 'danger',
              text: `Galat : ${data.message[0]}`,
            },
          })
        }
      })
    },
    fetchDataUpload() {
      this.isLoading = true
      const param = new FormData()
      if (this.selectedUploadFile !== null && this.selectedUploadFile !== '') {
        param.append('excel', this.selectedUploadFile)
      }
      appService.importProductAdmin(param).then(response => {
        const res = response.data
        console.log(res)
        if (res.result) {
          this.$toast({
            component: ToastificationContent,
            position: 'top-right',
            props: {
              title: 'Berhasil Mengupload Data',
              icon: 'CoffeIcon',
              variant: 'success',
              text: 'Master Produk Berhasil Diupload',
            },
          })
          this.setListCategory()
          this.setListBrand()
          this.setListType()
          this.setListUOM()
          this.fetchDataList()
          this.clearUploadForm()
        } else {
          const errMsg = res.message
          errMsg.forEach(msg => {
            this.$toast({
              component: ToastificationContent,
              position: 'top-right',
              props: {
                title: 'Error',
                icon: 'AlertCircleIcon',
                variant: 'danger',
                text: msg,
              },
            })
          })
        }
        this.isLoading = false
      }).catch(err => {
        console.log(err)
        this.isLoading = false
      })
    },
    hapusData(propsData) {
      console.log(propsData)
      this.deleteData = propsData
      console.log(this.deleteData)
      this.$bvModal.show('askDelete')
    },
    handleDelete() {
      console.log(this.deleteData)
      appService.deleteProductAdmin(this.deleteData.encodedID).then(response => {
        console.log(response)
        const { data } = response
        if (data.result) {
          this.fetchDataList()
          this.$toast({
            component: ToastificationContent,
            position: 'top-right',
            props: {
              title: 'Berhasil Dihapus',
              icon: 'CoffeIcon',
              variant: 'success',
              text: data.message,
            },
          })
        } else {
          this.$toast({
            component: ToastificationContent,
            position: 'top-right',
            props: {
              title: 'Gagal Dihapus',
              icon: 'AlertCircleIcon',
              variant: 'error',
              text: data.message,
            },
          })
        }
      }).catch(err => {
        console.log(err)
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
    uploadValidate() {
      const errMsg = []
      if (this.allowedTipeUploadFile === 0) {
        errMsg.push('Harus Menggunkan File Dengan Tipe .XLS / .XLSX')
      }
      if (this.selectedUploadFile === '') {
        errMsg.push('Pilih File Dengan Tipe .XLS / .XLSX')
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

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>

<style lang="scss" scoped>
.vgt-table {
  font-size: 12px !important;
}
.v-select {
  &.item-selector-title,
  &.payment-selector {
    background-color: #fff;

    .dark-layout & {
      background-color: unset;
    }
  }
}
</style>

<style lang="scss">
@media print {

  // Global Styles
  body {
    background-color: transparent !important;
    // width: 80mm;
    // height: 100mm;
  }
  .btn-scroll-to-top, .content-header, .bt-print, .horizontal-menu-wrapper, #NoprintTable {
    display: none !important;
  }
  #printData {
    display: block !important;
    margin-top: -100px;
  }
  nav.header-navbar {
    display: none;
  }
  .header-navbar-shadow {
    display: none !important;
  }
  .printstruck {
    margin-top: -100px;
  }
  footer.footer {
    display: none;
  }
  .card {
    background-color: transparent;
    box-shadow: none;
  }
  .customizer-toggle {
    display: none !important;
  }
}
</style>
