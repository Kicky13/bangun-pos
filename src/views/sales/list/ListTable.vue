<template>
  <b-card-code>

    <div class="demo-inline-spacing">
      <b-button
        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
        variant="primary"
      >
        Import Sale
      </b-button>
    </div>

    <!-- input search -->
    <div class="custom-search d-flex justify-content-end">
      <b-form-group>
        <div class="d-flex align-items-center">
          <label class="mr-1">Search</label>
          <b-form-input
            v-model="searchTerm"
            placeholder="Search"
            type="text"
            class="d-inline-block"
          />
        </div>
      </b-form-group>
    </div>

    <!-- table -->
    <vue-good-table
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
              </b-dropdown-item>
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
              :options="['3','5','10']"
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

  </b-card-code>
</template>

<script>
import BCardCode from '@core/components/b-card-code/BCardCode.vue'
import {
  BButton, BPagination, BFormGroup, BFormInput, BFormSelect, BDropdown, BDropdownItem, BBadge,
} from 'bootstrap-vue'
import { VueGoodTable } from 'vue-good-table'
import store from '@/store/index'
// import { codeBasic } from './search'

export default {
  components: {
    BButton,
    BCardCode,
    VueGoodTable,
    BPagination,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BDropdown,
    BDropdownItem,
    BBadge,
  },
  data() {
    return {
      pageLength: 10,
      dir: false,
      columns: [
        {
          label: 'ID',
          field: 'id',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Sales ID',
          },
        },
        {
          label: 'Date',
          field: 'date',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Date',
          },
        },
        {
          label: 'Reference',
          field: 'ref',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Reference',
          },
        },
        {
          label: 'Biller',
          field: 'biller',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Biller',
          },
        },
        {
          label: 'Customer',
          field: 'customer',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Customer',
          },
        },
        {
          label: 'Grand Total',
          field: 'total',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Total',
          },
        },
        {
          label: 'Sale Status',
          field: 'saleStatus',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Status',
          },
        },
        {
          label: 'Paid',
          field: 'paid',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Paid',
          },
        },
        {
          label: 'Due',
          field: 'due',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Due',
          },
        },
        {
          label: 'Payment Status',
          field: 'paymentStatus',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Status',
          },
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
    this.$http.get('/app-data/sales')
      .then(res => { this.rows = res.data })
  },
}
</script>
