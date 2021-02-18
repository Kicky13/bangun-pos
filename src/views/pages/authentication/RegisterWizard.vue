<template>
  <div>
    <form-wizard
      color="#ea5455"
      :title="null"
      :subtitle="null"
      finish-button-text="Submit"
      back-button-text="Previous"
      class="steps-transparent mb-3"
      @on-complete="formSubmitted"
    >
      <!-- tabs -->
      <tab-content
        v-for="tabpanel in wizardTabs"
        :key="tabpanel.id"
        :title="tabpanel.title"
        :icon="tabpanel.icon"
      >
        <user-data
          v-if="tabpanel.code === 'userdata'"
          :title="tabpanel.title"
          :subtitle="tabpanel.subtitle"
        />
        <support-data
          v-else-if="tabpanel.code === 'support'"
          :title="tabpanel.title"
          :subtitle="tabpanel.subtitle"
        />
        <shop-data
          v-else-if="tabpanel.code === 'shop'"
          :title="tabpanel.title"
          :subtitle="tabpanel.subtitle"
        />
      </tab-content>

    </form-wizard>

  </div>
</template>

<script>
import { FormWizard, TabContent } from 'vue-form-wizard'
// import vSelect from 'vue-select'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import {} from 'bootstrap-vue'
import UserData from './register/UserData.vue'
import SupportData from './register/SupportData.vue'
import ShopData from './register/ShopData.vue'

export default {
  components: {
    FormWizard,
    TabContent,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
    UserData,
    SupportData,
    ShopData,
  },
  data() {
    return {
      selectedContry: 'select_value',
      selectedLanguage: 'nothing_selected',
      wizardTabs: [
        {
          id: 1,
          code: 'userdata',
          title: 'Data Pemilik',
          subtitle: 'Isi data diri anda sebagai pemilik toko',
          icon: 'feather icon-user',
        },
        {
          id: 2,
          code: 'shop',
          title: 'Data Toko',
          subtitle: 'Lengkapi form dibawah ini dengan data toko anda',
          icon: 'feather icon-shopping-bag',
        },
        {
          id: 3,
          code: 'support',
          title: 'Data Pendukung',
          subtitle: 'Lengkapi form dibawah ini untuk mempermudah transaksi anda',
          icon: 'feather icon-briefcase',
        },
      ],
      countryName: [
        { value: 'select_value', text: 'Select Value' },
        { value: 'Russia', text: 'Russia' },
        { value: 'Canada', text: 'Canada' },
        { value: 'China', text: 'China' },
        { value: 'United States', text: 'United States' },
        { value: 'Brazil', text: 'Brazil' },
        { value: 'Australia', text: 'Australia' },
        { value: 'India', text: 'India' },
      ],
      languageName: [
        { value: 'nothing_selected', text: 'Nothing Selected' },
        { value: 'English', text: 'English' },
        { value: 'Chinese', text: 'Mandarin Chinese' },
        { value: 'Hindi', text: 'Hindi' },
        { value: 'Spanish', text: 'Spanish' },
        { value: 'Arabic', text: 'Arabic' },
        { value: 'Malay', text: 'Malay' },
        { value: 'Russian', text: 'Russian' },
      ],
    }
  },
  methods: {
    formSubmitted() {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: 'Form Submitted',
          icon: 'EditIcon',
          variant: 'success',
        },
      })
    },
  },
}
</script>
