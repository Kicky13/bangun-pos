<template>
  <div class="auth-wrapper auth-v2 logincontainer">
    <b-row class="auth-inner m-0">
      <b-col
        lg="8"
        class="d-none d-lg-flex align-items-center p-5"
      >
        <div class="w-100 d-lg-flex align-items-center justify-content-center px-5">
          <b-img
            v-once
            lazy="loading"
            fluid
            :src="imgUrl"
            alt="Login V2"
            style="display:none;"
          />
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Login-->
      <b-col
        lg="4"
        class="d-flex align-items-center auth-bg px-2 p-lg-5 panellogin"
      >
        <b-col
          sm="8"
          md="6"
          lg="12"
          class="px-xl-2 mx-auto"
        >
          <b-card-title
            class="mb-1 font-weight-bold"
            title-tag="h2"
          >
            <b-img
              v-once
              lazy="loading"
              fluid
              :src="logoUrl"
              alt="Logo POS Retail"
              style="margin-bottom : 20px;"
            />
            Selamat Datang 👋
          </b-card-title>
          <b-card-text class="mb-2">
            <!--Please sign-in to your account and start the adventure-->
          </b-card-text>

          <!-- form -->
          <validation-observer
            ref="loginForm"
          >
            <b-form
              class="auth-login-form mt-2"
              @submit.prevent="login"
            >
              <!-- email -->
              <b-form-group
                label="Username"
                label-for="login-email"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Email"
                  vid="email"
                  rules="required"
                >
                  <b-form-input
                    id="login-email"
                    v-model="userEmail"
                    :state="errors.length > 0 ? false:null"
                    name="login-email"
                    placeholder="johnExample"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- forgot password -->
              <b-form-group>
                <div class="d-flex justify-content-between">
                  <label for="login-password">Password</label>
                </div>
                <validation-provider
                  #default="{ errors }"
                  name="Password"
                  vid="password"
                  rules="required"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid':null"
                  >
                    <b-form-input
                      id="login-password"
                      v-model="password"
                      :state="errors.length > 0 ? false:null"
                      class="form-control-merge"
                      :type="passwordFieldType"
                      name="login-password"
                      placeholder="Password"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        class="cursor-pointer"
                        :icon="passwordToggleIcon"
                        @click="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- submit buttons -->
              <b-button
                type="submit"
                variant="primary"
                block
                style="color: #b20838;"
              >
                Masuk
              </b-button>
            </b-form>
          </validation-observer>

          <!--<b-card-text class="text-center mt-2">-->
          <!--<span>New on our platform? </span>-->
          <!--<b-link :to="{name:'auth-register'}">-->
          <!--<span>&nbsp;Create an account</span>-->
          <!--</b-link>-->
          <!--</b-card-text>-->

          <!-- divider -->
          <div class="divider my-2">
            <div class="divider-text" />
          </div>

          <!--=========================-->
          <!--=========================-->
          <!-- SOSIAL MEDIA MENU VUE -->
          <!--<div class="auth-footer-btn d-flex justify-content-center">-->
          <!--<b-button-->
          <!--variant="facebook"-->
          <!--href="javascript:void(0)"-->
          <!--&gt;-->
          <!--<feather-icon icon="FacebookIcon" />-->
          <!--</b-button>-->
          <!--<b-button-->
          <!--variant="twitter"-->
          <!--href="javascript:void(0)"-->
          <!--&gt;-->
          <!--<feather-icon icon="TwitterIcon" />-->
          <!--</b-button>-->
          <!--<b-button-->
          <!--variant="google"-->
          <!--href="javascript:void(0)"-->
          <!--&gt;-->
          <!--<feather-icon icon="MailIcon" />-->
          <!--</b-button>-->
          <!--<b-button-->
          <!--variant="github"-->
          <!--href="javascript:void(0)"-->
          <!--&gt;-->
          <!--<feather-icon icon="GithubIcon" />-->
          <!--</b-button>-->
          <!--</div>-->
        </b-col>
      </b-col>
    <!-- /Login-->
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from 'vee-validate'
// import VuexyLogo from '@core/layouts/components/Logo.vue'
import {
  BRow, BCol, BFormGroup, BFormInput, BInputGroupAppend, BInputGroup, BCardText, BCardTitle, BImg, BForm, BButton, VBTooltip,
} from 'bootstrap-vue'
import { required, email } from '@validations'
import authService from '@/connection/connection'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import store from '@/store/index'
import { getHomeRouteForLoggedInUser } from '@/auth/utils'

import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  directives: {
    'b-tooltip': VBTooltip,
  },
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
    BCardText,
    BCardTitle,
    BImg,
    BForm,
    BButton,
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      status: '',
      password: '',
      userEmail: '',
      sideImg: require('@/assets/images/pages/Login_POS1Medium.jpg'),
      logoImg: require('@/assets/images/logo/POSRetailBlack.png'),
      // sideImg: require('@/assets/images/pages/login-v2.svg'),

      // validation rules
      required,
      email,
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    logoUrl() {
      return this.logoImg
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        // this.sideImg = require('@/assets/images/pages/login-v2-dark.svg')
        // this.sideImg = require('@/assets/images/pages/login-v2-dark.svg')
        return this.sideImg
      }
      return this.sideImg
    },
  },
  methods: {
    login() {
      if (this.validateForm()) {
        authService.login({
          username: this.userEmail,
          password: this.password,
        }).then(res => {
          if (res.data) {
            const toko = this.setDataUser(res.data)
            const { role } = res.data
            localStorage.removeItem('userData')
            localStorage.setItem('userData', JSON.stringify(toko))
            authService.setToken(res.data.token)
            const userAbility = authService.getAbility(role)
            this.$ability.update(userAbility)

            this.$router.replace(getHomeRouteForLoggedInUser(role))
              .then(() => {
                this.$toast({
                  component: ToastificationContent,
                  position: 'top-right',
                  props: {
                    title: `Welcome ${toko.fullName || toko.username}`,
                    icon: 'CoffeeIcon',
                    variant: 'success',
                    text: `You have successfully logged in as ${role}. Now you can start to explore!`,
                  },
                })
              })
              .catch(error => {
                console.log(error)
              })
          } else {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Oops, Something went wrong',
                icon: 'AlertCircleIcon',
                variant: 'danger',
              },
            })
          }
        }).catch(err => {
          if (err.request) {
            const msg = JSON.parse(err.request.response)
            if ('error' in msg) {
              this.$toast({
                component: ToastificationContent,
                position: 'top-right',
                props: {
                  title: 'ERROR!',
                  icon: 'AlertCircleIcon',
                  variant: 'danger',
                  text: msg.error,
                },
              })
            }
          }
        })
      }
    },
    setDataUser(data) {
      const userAbility = authService.getAbility(data.role)
      const userData = {
        id: 'admin01',
        fullName: data.name,
        username: data.username,
        password: data.role,
        // eslint-disable-next-line global-require
        avatar: require('@/assets/images/avatars/13-small.png'),
        email: data.email,
        role: data.role,
        ability: userAbility,
      }
      return userData
    },
    validateForm() {
      const errMsg = []

      if (!this.userEmail.length > 0) {
        errMsg.push('Username wajib diisi')
      }

      if (!this.password.length > 0) {
        errMsg.push('Password wajib diisi')
      }

      if (errMsg.length === 0) {
        return true
      }

      return false
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>

<style scoped lang="scss">
@media (min-width: 992px) {
  .logincontainer {
    background-image: url('~@/assets/images/pages/Login_POS1Medium.jpg');
    background-repeat: no-repeat;
    background-size: cover;
  }
  .panellogin {
    background-color: transparent;
  }
}
@media (max-width: 992px) {
  .logincontainer {
    background-image: url('~@/assets/images/pages/Login_POS1Small.png');
    // background-repeat: no-repeat;
    background-size: cover;
  }
  .panellogin {
    background-color: transparent;
  }
}
</style>
