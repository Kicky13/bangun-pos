<template>
  <b-modal
    id="logTrans"
    centered
    size="xl"
    hide-footer
  >
    <!-- search input -->
    <div class="custom-search d-flex">
      <b-form-group>
        <div class="d-flex align-items-center">
          <b-input-group class="input-group-merge">
            <b-form-input
              v-model="searchTerm"
              placeholder="Search"
              type="text"
              class="d-inline-block"
            />
            <b-input-group-append is-text>
              <feather-icon
                icon="SearchIcon"
                class="text-muted"
              />
            </b-input-group-append>
          </b-input-group>
        </div>
      </b-form-group>
    </div><br>

    <!-- table -->
    <vue-good-table
      :columns="columns"
      :rows="rows"
      :rtl="direction"
      :search-options="{
        enabled: true,
        externalQuery: searchTerm }"
      :select-options="{
        enabled: true,
        selectOnCheckboxOnly: true, // only select when checkbox is clicked instead of the row
        selectionInfoClass: 'custom-class',
        selectionText: 'rows selected',
        clearSelectionText: 'clear',
        disableSelectInfo: true, // disable the select info panel on top
        selectAllByGroup: true, // when used in combination with a grouped table, add a checkbox in the header row to check/uncheck the entire group
      }"
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
        <span v-if="props.column.field === 'status'">
          <b-badge :variant="statusVariant(props.row.status)">
            {{ props.row.status }}
          </b-badge>
        </span>

        <!-- Column: Action -->
        <span v-else-if="props.column.field === 'action'">
          <span>
            <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              size="sm"
              variant="outline-secondary"
            >
              Lanjut
            </b-button>
            <b-button
              v-ripple.400="'rgba(234, 84, 85, 0.15)'"
              size="sm"
              variant="outline-danger"
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
            <span class="text-nowrap ">
              Showing 1 to
            </span>
            <b-form-select
              v-model="pageLength"
              :options="['3','5','10']"
              class="mx-1"
              @input="(value)=>props.perPageChanged({currentPerPage:value})"
            />
            <span class="text-nowrap"> of {{ props.total }} entries </span>
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
  </b-modal>
</template>

<script>
import {
  BModal, BFormGroup, BFormInput, VBModal, BFormSelect, BBadge, BInputGroup, BInputGroupAppend, BButton, BPagination,
} from 'bootstrap-vue'
import { VueGoodTable } from 'vue-good-table'
import FeatherIcon from '@/@core/components/feather-icon/FeatherIcon.vue'
import ApiService from '@/connection/apiService'
import Ripple from 'vue-ripple-directive'

const appService = new ApiService()

export default {
  components: {
    BModal,
    BFormGroup,
    BFormInput,
    BFormSelect,
    VueGoodTable,
    FeatherIcon,
    BBadge,
    BInputGroup,
    BInputGroupAppend,
    BButton,
    BPagination,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  props: {
    transId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      pageLength: 5,
      dir: false,
      selectedType: null,
      columns: [
        {
          label: 'Kode Pembayaran',
          field: 'logId',
        },
        {
          label: 'Tanggal Bayar',
          field: 'tanggalBayar',
        },
        {
          label: 'Jumlah Bayar',
          field: 'jumlahBayar',
        },
        {
          label: 'Type Pembayaran',
          field: 'tipeBayar',
        },
      ],
      rows: [],
      searchTerm: '',
      status: [{
        1: 'Pending',
        2: 'Done',
      },
      {
        1: 'light-danger',
        2: 'light-success',
      }],
    }
  },
  computed: {
    statusVariant() {
      const statusColor = {
        /* eslint-disable key-spacing */
        Pending : 'light-danger',
        Done : 'light-success',
        /* eslint-enable key-spacing */
      }

      return status => statusColor[status]
    },
    direction() {
      // if (store.state.appConfig.isRTL) {
      //   // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      //   this.dir = true
      //   return this.dir
      // }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.dir = false
      return this.dir
    },
  },
  watch: {
    transId: {
      immediate: true,
      handler() {
        console.log(this.transId)
        if (this.transId !== '') {
          this.getLogTransaction(this.transId)
        }
      },
    },
  },
  created() {
    // this.getLogTransaction(this.$parent.selectedTransId)
    // this.$http.get('/app-data/transLog')
    //   .then(res => { this.rows = res.data })
  },
  mounted() {
  },
  methods: {
    async getLogTransaction(uuid) {
      appService.getLogTransaction(uuid).then(response => {
        const { data } = response
        if (data.data) {
          console.log(data.data)
        }
      })
    },
    setRows(data) {
      const res = {
        logId: data.id,
        jumlahBayar: data.amount,
        tipeBayar: data.payment_type,
        // refCode: data.no_references ?? '-',
        tanggalBayar: data.created_at,
      }
      this.rows.push(res)
    },
  },
}
</script>

<style lang="scss">
  @import "../node_modules/vue-good-table/src/styles/style.scss";
</style>
