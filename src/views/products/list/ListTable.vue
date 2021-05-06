<template>
  <b-card>
    <loading-grow v-if="isLoading" />
    <div>
      <b-row>
        <b-col
          lg="6"
          md="6"
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
          lg="3"
          md="3"
          sm="12"
        >
          <v-select
            v-model="selectItemV"
            dir="ltr"
            :options="itemsOptions"
            label="text"
            :clearable="false"
            class="mb-2 item-selector-title"
            placeholder="Pilih Toko Bangunan"
          />
        </b-col>
        <b-col
          lg="1"
          md="1"
          sm="12"
        >
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="secondary"
            @click="printTable"
          >
            Print
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
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              size="sm"
              variant="outline-secondary"
              :to="{ name: 'customer-history-trans', params: { id: props.formattedRow.encodedID } }"
            >
              List Trans.
            </b-button>
            <b-button
              v-if="props.row.sisaHutang > 0"
              v-ripple.400="'rgba(234, 84, 85, 0.15)'"
              size="sm"
              variant="outline-danger"
              @click="pembayaran(props.formattedRow)"
            >
              Bayar
            </b-button>
            <b-button
              v-ripple.400="'rgba(234, 84, 85, 0.15)'"
              size="sm"
              variant="outline-danger"
              @click="editData(props.formattedRow)"
            >
              Edit
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
      <table width="100%">
        <thead style="text-align: center">
          <th>Kode Produk</th>
          <th>Nama</th>
          <th>Kategori</th>
          <th>Sub-Kategori</th>
          <th>Brand/Merk</th>
          <th>Tipe</th>
          <th>Satuan/UOM</th>
          <th>Toko</th>
        </thead>
        <tbody>
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
            <td>
              {{ item.namatoko }}
            </td>
          </tr>
        </tbody>
      </table>
    </b-card>

  </b-card>
</template>

<script>
import {
  BButton, BPagination, BFormGroup, BFormInput, BFormSelect, BCard, BRow, BCol, BImg,
} from 'bootstrap-vue'
import { VueGoodTable } from 'vue-good-table'
import vSelect from 'vue-select'
import store from '@/store/index'
import Ripple from 'vue-ripple-directive'
import ApiService from '@/connection/apiService'
import LoadingGrow from '@core/components/loading-process/LoadingGrow.vue'

const appService = new ApiService()

export default {
  components: {
    BButton,
    VueGoodTable,
    BPagination,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BImg,
    BCard,
    BRow,
    BCol,
    vSelect,
    LoadingGrow,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      custUuid: '',
      customerCode: '',
      remainingDebt: 0,
      paymentID: '',
      paySum: 0,
      selectedType: 1,
      customerName: '',
      customerPhone: 0,
      jagobangunRef: '',
      identityNumber: '',
      customerAddress: '',
      selectedPembayaran: null,
      selectedStatus: null,
      isLoading: false,
      editForm: false,
      tokoBangunanList: [],
      selectedToko: '',
      selectItemV: [{
        value: '',
        text: 'Semua Toko Bangunan',
      }],
      itemsOptions: [],
      typeItem: [
        {
          value: 1,
          text: 'Cash',
        },
      ],
      statusItems: [
        {
          value: null,
          text: 'Semua',
        },
        {
          value: 'Lunas',
          text: 'Lunas',
        },
        {
          value: 'Belum Lunas',
          text: 'Belum Lunas',
        },
      ],
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
          label: 'Toko',
          field: 'namatoko',
        },
        // {
        //   label: 'Harga Jual',
        //   field: 'price',
        //   tdClass: 'text-right',
        //   formatFn: this.formatPrice,
        // },
      ],
      rows: [],
      searchTerm: '',
      selected: 'Cash',
      option: ['Cash', 'Kredit'],
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
  watch: {
    searchTerm: {
      immediate: true,
      handler() {
        this.fetchCustomerList()
      },
    },
    selectItemV: {
      immediate: true,
      handler() {
        this.fetchCustomerList()
      },
    },
  },
  created() {
    this.getAllToko()
    this.fetchCustomerList()
  },
  methods: {
    printTable() {
      console.log(this.rows)
      const localOptions = {
        styles: [
          'https://cdn.jsdelivr.net/npm/vue-good-table@2.18.1/dist/vue-good-table.min.css',
          'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
          'https://unpkg.com/kidlat-css/css/kidlat.css',
        ],
      }
      this.$htmlToPaper('printTable', localOptions, () => {
        console.warn('done')
      })
    },
    formatPrice(value) {
      const val = (value / 1).toFixed(2).replace('.', ',')
      const formatedval = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      return `Rp. ${formatedval}`
    },
    async getAllToko() {
      appService.getTokoList().then(response => {
        const { data } = response.data
        console.log(data)
        this.tokoBangunanList = []
        this.itemsOptions = []
        this.tokoBangunanList.push({
          value: '',
          text: 'Semua Toko Bangunan',
        })
        if (data) {
          data.forEach(item => {
            this.tokoBangunanList.push({
              value: item.id_toko,
              text: item.nama_toko,
            })
          })
        }
        this.itemsOptions = this.tokoBangunanList
      })
    },
    fetchCustomerList() {
      this.isLoading = true
      appService.getAdminProductNonSIGPriceList({
        // limit: 50,
        q: this.searchTerm,
        // id_toko: this.selectedToko ? this.tokoBangunanList.find(list => list.text === this.selectedToko).value : '',
        id_toko: this.selectItemV.value ? this.selectItemV.value : null,
      }).then(response => {
        this.rows = []
        const res = response.data
        // console.log(res)
        this.isLoading = false
        const resdata = res.data
        if (resdata) {
          resdata.forEach(this.setupRows)
        }
        // if (res.result) {
        //   const resdata = res.data
        //   if (resdata) {
        //     resdata.forEach(this.setupRows)
        //   }
        // } else {
        //   // this.$bvModal.show('tokenExpired')
        // }
      }).catch(err => {
        console.log(err)
        this.isLoading = false
      })
    },
    setupRows(data) {
      const res = {
        flag: data.flag,
        imgproduk: data.img_produk,
        isavailable: data.is_available,
        kodeproduk: data.kode_produk,
        namabrand: data.nama_brand,
        namacategory: data.nama_category,
        namaproduk: data.nama_produk,
        namasubcategory: data.nama_subcategory,
        namatoko: data.nama_toko,
        namatype: data.nama_type,
        namauom: data.nama_uom,
      }
      this.rows.push(res)
    },
    refreshTable() {
      this.rows = []
      this.fetchCustomerList()
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
