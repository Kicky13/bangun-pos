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
            style="width: 700px !important;"
          >
            <label
              class="mr-1"
              style="font-size: 16px; font-weight: bold;"
            >Search</label>
            <b-form-input
              v-model="searchTerm"
              placeholder="Masukkan kata kunci pencarian disini"
              type="text"
              class="d-inline-block"
            />
          </div>
        </b-form-group>
      </div>
      <div style="float:left;width: 300px !important; margin-left:10px;">
        <b-form-group
          label="Pembayaran"
          label-for="pembayaran"
          label-cols-md="4"
        >
          <b-form-select
            id="pembayaran"
            v-model="selectedPembayaran"
            :options="pembayaranItems"
          />
        </b-form-group>
      </div>
      <div style="float:left;width: 300px !important; margin-left:10px;">
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

      <div style="float:left;margin-left:10px;">
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          variant="primary"
          style="margin-top: -15px;"
        >
          Print
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

        <!-- Column: Status -->

        <span v-if="props.column.field === 'paymentStatus'">
          <b-badge :variant="paymentVariant(props.row.paymentStatus)">
            {{ props.row.paymentStatus }}
          </b-badge>
        </span>

        <span v-else-if="props.column.field === 'saleStatus'">
          <b-badge :variant="salesVariant(props.row.saleStatus)">
            {{ props.row.saleStatus }}
          </b-badge>
        </span>

        <!-- Column: Action -->
        <span v-else-if="props.column.field === 'action'">
          <span>
            <b-dropdown
              variant="link"
              toggle-class="text-decoration-none"
              no-caret
            >
              <template v-slot:button-content>
                <feather-icon
                  icon="MoreVerticalIcon"
                  size="16"
                  class="text-body align-middle mr-25"
                />
              </template>
              <b-dropdown-item>
                <feather-icon
                  icon="FileTextIcon"
                  class="mr-50"
                />
                <span>Detail</span>
              </b-dropdown-item>
              <!-- <b-dropdown-item>
                <feather-icon
                  icon="Edit2Icon"
                  class="mr-50"
                />
                <span>Edit</span>
              </b-dropdown-item>
              <b-dropdown-item>
                <feather-icon
                  icon="TrashIcon"
                  class="mr-50"
                />
                <span>Delete</span>
              </b-dropdown-item> -->
            </b-dropdown>
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

  </b-card>
</template>

<script>
import {
  BButton, BPagination, BFormGroup, BFormInput, BFormSelect, BDropdown, BDropdownItem, BBadge, BCard,
} from 'bootstrap-vue'
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
    BDropdown,
    BDropdownItem,
    BBadge,
    BCard,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      selectedPembayaran: null,
      selectedStatus: null,
      pembayaranItems: [
        {
          value: null,
          text: 'Semua',
          // disabled: true,
        },
        {
          value: 'CASH',
          text: 'CASH',
        },
        {
          value: 'Kredit / Hutang',
          text: 'KREDIT',
        },
      ],
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
          label: 'Kode Penjualan',
          field: 'saleCode',
          // filterOptions: {
          //   enabled: true,
          //   placeholder: 'Search Sales ID',
          // },
        },
        {
          label: 'Tanggal',
          field: 'date',
          // filterOptions: {
          //   enabled: true,
          //   placeholder: 'Search Date',
          // },
        },
        {
          label: 'Customer',
          field: 'customer',
          // filterOptions: {
          //   enabled: true,
          //   placeholder: 'Search Biller',
          // },
        },
        {
          label: 'Kode Referensi',
          field: 'ref',
          // filterOptions: {
          //   enabled: true,
          //   placeholder: 'Search Reference',
          // },
        },
        {
          label: 'Kasir',
          field: 'biller',
          // filterOptions: {
          //   enabled: true,
          //   placeholder: 'Search Biller',
          // },
        },
        {
          label: 'Sub Total',
          field: 'subtotal',
          // filterOptions: {
          //   enabled: true,
          //   placeholder: 'Search Customer',
          // },
        },
        {
          label: 'Diskon',
          field: 'disc',
          // filterOptions: {
          //   enabled: true,
          //   placeholder: 'Search Total',
          // },
        },
        {
          label: 'Ongkos Kirim',
          field: 'ship',
          // filterOptions: {
          //   enabled: true,
          //   placeholder: 'Search Status',
          // },
        },
        {
          label: 'Pajak',
          field: 'tax',
          // filterOptions: {
          //   enabled: true,
          //   placeholder: 'Search Paid',
          // },
        },
        {
          label: 'Tipe Pembayaran',
          field: 'typePayment',
          // filterOptions: {
          //   enabled: true,
          //   placeholder: 'Search Due',
          // },
        },
        {
          label: 'Status',
          field: 'paymentStatus',
          // filterOptions: {
          //   enabled: true,
          //   placeholder: 'Search Status',
          // },
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
    salesVariant() {
      const statusColor = {
        Draft: 'light-primary',
        Completed: 'light-secondary',
      }
      return status => statusColor[status]
    },
    paymentVariant() {
      const statusColor = {
        Paid: 'light-secondary',
        Due: 'light-primary',
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
  created() {
    this.$http.get('/app-data/salesUser')
      .then(res => { this.rows = res.data })
  },
}
</script>
