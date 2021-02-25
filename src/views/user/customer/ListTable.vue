<template>
  <b-card>

    <div class="demo-inline-spacing">

      <!-- input search -->
      <div
        class="d-flex justify-content-end"
        style="float:left;"
      >
        <b-form-group>
          <div
            class="d-flex align-items-center"
            style="width: 500px !important;"
          >
            <b-form-input
              v-model="searchTerm"
              placeholder="Search Here..."
              type="text"
              class="d-inline-block"
            />
          </div>
        </b-form-group>
      </div>
      <div style="float:left;width: 200px !important; margin-left:10px;">
        <b-form-group
          label="Status"
          label-for="status"
          label-cols-md="4"
        >
          <b-form-select
            id="status"
            v-model="selectedStatus"
            :options="statusItems"
          />
        </b-form-group>
      </div>
      <div style="float:left; !important; margin-left:10px;">
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          variant="secondary"
          style="margin-top: -15px;"
        >
          Print
        </b-button>
      </div>
      <div style="float:left; !important; margin-left:10px;">
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          variant="primary"
          style="margin-top: -15px;"
        >
          Delete
        </b-button>
      </div>
      <div style="float:left; !important; margin-left:10px;">
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          v-b-modal.modal-select2
          variant="primary"
          style="margin-top: -15px;"
        >
          Tambahkan Customer
        </b-button>
      </div>
    </div>

    <!-- table -->
    <vue-good-table
      :columns="columns"
      :rows="rows"
      :rtl="direction"
      :select-options="{ enabled: true }"
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
        <!-- Column: Action -->
        <span v-if="props.column.field === 'action'">
          <span>
            <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              size="sm"
              variant="outline-secondary"
            >
              List Trans
            </b-button>
            <b-button
              v-ripple.400="'rgba(234, 84, 85, 0.15)'"
              size="sm"
              variant="outline-danger"
            >
              Bayar
            </b-button>
            <b-button
              v-ripple.400="'rgba(234, 84, 85, 0.15)'"
              size="sm"
              variant="outline-danger"
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

    <!-- select 2 demo -->
    <b-modal
      id="modal-select2"
      size="lg"
      title="Add Customer"
      ok-title="Simpan"
      cancel-variant="outline-secondary"
    >
      <b-container>
        <b-row>
          <b-col cols="6">
            <b-form-group
              label="Kode Customer"
              label-for="code-customer"
            >
              <b-form-input
                id="code-customer"
                placeholder="Masukkan Code Customer"
              />
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
              label="Nama Customer"
              label-for="nama-customer"
            >
              <b-form-input
                id="nama-customer"
                placeholder="Masukkan Nama Customer"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="6">
            <b-form-group
              label="Sisa Hutang"
              label-for="sisa-hutnag"
            >
              <b-form-input
                id="sisa-hutang"
                placeholder="nominal"
              />
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
              label="Tipe Pembayaran"
              label-for="tipe-pembayaran"
            >
              <v-select
                id="tipe-pembayaran"
                v-model="selected"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="option"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col>
              <b-form-group
                label="No. Pembayaran"
                label-for="no-pembayaran"
                label-cols-md="3"
              >
                <b-form-input
                  id="no-pembayaran"
                  placeholder="nominal"
                />
              </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group
              label="Bayar"
              label-for="bayar"
              label-cols-md="3"
            >
              <b-form-input
                id="bayar"
                placeholder="nominal"
              />
            </b-form-group>
          </b-col>
        </b-row>
      </b-container>
    </b-modal>

  </b-card>
</template>

<script>
import {
  BButton, BPagination, BFormGroup, BFormInput, BFormSelect, BCard, BModal, VBModal, BContainer, BRow, BCol,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { VueGoodTable } from 'vue-good-table'
import store from '@/store/index'
import Ripple from 'vue-ripple-directive'
// import { codeBasic } from './search'

export default {
  components: {
    BButton,
    VueGoodTable,
    BPagination,
    BFormGroup,
    BFormInput,
    BFormSelect,
    // BDropdown,
    // BDropdownItem,
    // BBadge,
    BCard,
    BModal,
    vSelect,
    BContainer,
    BRow,
    BCol,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  data() {
    return {
      selectedPembayaran: null,
      selectedStatus: null,
      statusItems: [
        {
          value: null,
          text: 'Semua',
          // disabled: true,
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
          label: 'Kode Customer',
          field: 'custCode',
        },
        {
          label: 'Customer',
          field: 'customer',
        },
        {
          label: 'No. Handphone',
          field: 'nohp',
        },
        {
          label: 'Jumlah Trans.',
          field: 'jumTrans',
        },
        {
          label: 'Total Trans.',
          field: 'totalTrans',
        },
        {
          label: 'Sudah Bayar',
          field: 'sudahBayar',
        },
        {
          label: 'Sisa Hutang',
          field: 'sisaHutang',
        },
        {
          label: 'Action',
          field: 'action',
        },
      ],
      rows: [],
      searchTerm: '',
      selected: 'Cash',
      option: ['Cash', 'Kredit'],
    }
  },
  computed: {
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
  created() {
    this.$http.get('/app-data/customerUser')
      .then(res => { this.rows = res.data })
  },
}
</script>
