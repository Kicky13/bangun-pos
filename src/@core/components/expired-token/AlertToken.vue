<template>
  <b-modal
    id="tokenExpired"
    ok-title="Okay"
    hide-header-close
    ok-only
    centered
    no-close-on-backdrop
    title="SORRY"
    @ok="gotoAksesToko"
  >
    <h5>Login session anda telah berakhir, silahkan login kembali</h5>
  </b-modal>
</template>

<script>
import { VBModal, BModal } from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import ApiService from '@/connection/apiService'

const appService = new ApiService()

export default {
  components: {
    BModal,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  methods: {
    gotoAksesToko() {
      localStorage.removeItem('userData')
      localStorage.removeItem('clientCode')
      appService.toAksesToko()
    },
  },
}
</script>
