<template>
  <b-card
    v-if="data"
    class="card-transaction"
    no-body
  >
    <b-card-header>
      <b-card-title>5 Produk yang Terlaris (Qty Terjual)</b-card-title>

      <b-dropdown
        variant="link"
        no-caret
        class="chart-dropdown"
        toggle-class="p-0"
        right
      >
        <template #button-content>
          <feather-icon
            icon="MoreVerticalIcon"
            size="18"
            class="text-body cursor-pointer"
          />
        </template>
        <b-dropdown-item @click="changeDisplay('last_week', '1 Minggu Terakhir')">
          1 Minggu Terakhir
        </b-dropdown-item>
        <b-dropdown-item @click="changeDisplay('last_month', '1 Bulan Terakhir')">
          1 Bulan Terakhir
        </b-dropdown-item>
        <b-dropdown-item @click="changeDisplay('last_year', '1 Tahun Terakhir')">
          1 Tahun Terakhir
        </b-dropdown-item>
      </b-dropdown>
    </b-card-header>

    <b-card-body>
      <div
        v-if="data.length > 0"
      >
        <div
          v-for="transaction in data"
          :key="transaction.mode"
          class="transaction-item"
        >
          <b-media no-body>
            <b-media-aside>
              <b-avatar
                rounded
                size="42"
                :variant="transaction.avatarVariant"
              >
                <feather-icon
                  size="18"
                  :icon="transaction.avatar"
                />
              </b-avatar>
            </b-media-aside>
            <b-media-body>
              <h6 class="transaction-title">
                {{ transaction.mode }}
              </h6>
              <small>{{ transaction.types }}</small>
            </b-media-body>
          </b-media>
          <div
            class="font-weight-bolder"
            :class="transaction.deduction ? 'text-danger':'text-success'"
          >
            {{ transaction.payment }}
          </div>
        </div>
      </div>
      <div
        v-else
        style="text-align:center; color:red"
      >
        <p><i>----- Belum Ada Catatan Transaksi -----</i></p>
      </div>
      <div style="margin-top: 10px;">
        <br>
        <small><i>*). Menampilkan Data {{ rentang }} ( <b>{{ mulai }}</b> s/d <b>{{ akhir }}</b> )</i></small>
      </div>
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard, BCardHeader, BCardTitle, BCardBody, BMediaBody, BMedia, BMediaAside, BAvatar, BDropdown, BDropdownItem,
} from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BCardHeader,
    BCardTitle,
    BCardBody,
    BMediaBody,
    BMedia,
    BMediaAside,
    BAvatar,
    BDropdown,
    BDropdownItem,
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    rentang: {
      type: String,
      default: '1 Minggu Terakhir',
    },
    mulai: {
      type: String,
      default: '',
    },
    akhir: {
      type: String,
      default: '',
    },
  },
  mounted() {
    // this.getGoalOverviewData()
    // this.getTransactionsData()
  },
  methods: {
    changeDisplay(param, textdisp) {
      console.log(param)
      console.log(textdisp)
      this.$parent.getTransactionsData(param, textdisp)
    },
  },
}
</script>
