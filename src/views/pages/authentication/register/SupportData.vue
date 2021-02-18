<template>
  <b-row>
    <b-col
      cols="12"
      class="mb-2"
    >
      <h5 class="mb-0">
        {{ title }}
      </h5>
      <small class="text-muted">
        {{ subtitle }}
      </small>
    </b-col>
    <b-col md="12">
      <h3>Data Kasir</h3>
      <div>
        <b-button
          variant="primary"
          class="btn-icon"
          style="margin-bottom: 10px;"
          @click="repeateAgain"
        >
          <feather-icon icon="PlusIcon" />
          <span>Tambahkan Kasir</span>
        </b-button>
      </div>
    </b-col>
    <div style="margin-left: 10px;">
      <b-row
        v-for="(item, index) in items"
        :id="item.id"
        :key="item.id"
        ref="row"
      >

        <!-- Item Name -->
        <b-col md="8">
          <b-form-group
            label="Kasir"
            label-for="cashier"
          >
            <b-form-input
              id="cashier"
              type="text"
            />
          </b-form-group>
        </b-col>

        <!-- Remove Button -->
        <b-col
          md="4"
        >
          <b-button
            v-ripple.400="'rgba(234, 84, 85, 0.15)'"
            variant="outline-danger"
            class="btn-icon mt-0 mt-md-2"
            @click="removeItem(index)"
          >
            <feather-icon
              icon="XIcon"
            />
            <span>Delete</span>
          </b-button>
        </b-col>
        <b-col cols="12">
          <hr>
        </b-col>
      </b-row>
    </div>
  </b-row>
</template>

<script>
import {
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BButton,
} from 'bootstrap-vue'
import FeatherIcon from '@/@core/components/feather-icon/FeatherIcon.vue'
import { heightTransition } from '@core/mixins/ui/transition'

export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BButton,
    FeatherIcon,
  },
  mixins: [heightTransition],
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      items: [{
        id: 1,
      }],
      nextTodoId: 2,
    }
  },
  mounted() {
    this.initTrHeight()
  },
  created() {
    window.addEventListener('resize', this.initTrHeight)
  },
  destroyed() {
    window.removeEventListener('resize', this.initTrHeight)
  },
  methods: {
    repeateAgain() {
      this.items.push({
        id: this.nextTodoId += this.nextTodoId,
      })

      this.$nextTick(() => {
        this.trAddHeight(this.$refs.row[0].offsetHeight)
      })
    },
    removeItem(index) {
      this.items.splice(index, 1)
      this.trTrimHeight(this.$refs.row[0].offsetHeight)
    },
    initTrHeight() {
      this.trSetHeight(null)
      this.$nextTick(() => {
        this.trSetHeight(this.$refs.form.scrollHeight)
      })
    },
  },
}
</script>
