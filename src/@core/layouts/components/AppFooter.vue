<template>
  <b-row style="background: #343a40 !important;">
    <b-col
      lg="1"
      md="1"
      sm="12"
    />
    <b-col
      lg="2"
      md="2"
      sm="12"
      style="text-align: center;"
    >
      <b-img
        :src="require('@/assets/images/logo/logo-at-putih.png')"
        fluid
        alt="Logo Akses Toko Putih"
      />
      <div>
        <b-link
          class="ml-25 text-white"
          href="https://wa.me/6281132001306"
          target="_blank"
        >
          <feather-icon
            icon="MessageCircleIcon"
            size="20"
          />
        </b-link>
        <b-link
          class="ml-25 text-white"
          href="https://www.facebook.com/aksestokoid"
          target="_blank"
        >
          <feather-icon
            icon="FacebookIcon"
            size="20"
          />
        </b-link>
        <b-link
          class="ml-25 text-white"
          href="https://www.instagram.com/aksestokoid"
          target="_blank"
        >
          <feather-icon
            icon="InstagramIcon"
            size="20"
          />
        </b-link>
      </div>
      <br>
      <b-link
        class="ml-25 btn-cs"
        href="mailto:customerservice@aksestoko.id"
        target="_blank"
      >
        <feather-icon
          icon="MailIcon"
          size="20"
          style="margin-left:5px;"
        />
        <span style="font-size: 13px;margin-left:10px;"> customerservice@aksestoko.id</span>
      </b-link>
      <div style="margin-bottom: 20px;" />
    </b-col>
    <b-col
      lg="2"
      md="2"
      sm="12"
    >
      <h2
        class="text-white"
      >
        Memulai
      </h2>
      <b-link
        class="ml-25 text-white"
        href="https://qa.aksestoko.id/auth/signup"
        target="_blank"
      >Daftar</b-link>
      <br>
      <b-link
        class="ml-25 text-white"
        href="https://qa.aksestoko.id/auth/signin"
        target="_blank"
      >Masuk</b-link>
      <br>
      <b-link
        class="ml-25 text-white"
        href="https://qa.aksestoko.id/auth/profilr"
        target="_blank"
      >Akun</b-link>
      <br>
      <b-link
        class="ml-25 text-white"
        href="https://qa.aksestoko.id/order"
        target="_blank"
      >Pesanan</b-link>
      <br>
      <div style="margin-bottom: 20px;" />
    </b-col>
    <b-col
      lg="2"
      md="2"
      sm="12"
    >
      <h2
        class="text-white"
      >
        Bantuan
      </h2>
      <b-link
        class="ml-25 text-white"
        href="https://qa.aksestoko.id/home/faq"
        target="_blank"
      >FAQ</b-link>
      <br>
      <b-link
        class="ml-25 text-white"
        href="https://qa.aksestoko.id/home/cs"
        target="_blank"
      >Layanan Pelanggan</b-link>
      <br>
      <b-link
        class="ml-25 text-white"
        href="https://qa.aksestoko.id/home/cs"
        target="_blank"
      >Live Chat</b-link>
      <br>
      <div style="margin-bottom: 20px;" />
    </b-col>
    <b-col
      lg="2"
      md="2"
      sm="12"
    >
      <h2
        class="text-white"
      >
        Tentang Kami
      </h2>
      <b-link
        class="ml-25 text-white"
        href="https://sig.id"
        target="_blank"
      >PT Semen Indonesia (Persero) Tbk (SIG)</b-link>
      <br>
      <b-link
        class="ml-25 text-white"
        href="https://sisi.id"
        target="_blank"
      >PT Sinergi Informatika Semen Indonesia (SISI)</b-link>
      <br>
      <div style="margin-bottom: 20px;" />
    </b-col>
    <b-col
      lg="2"
      md="2"
      sm="12"
    >
      <h2
        class="text-white"
      >
        Aplikasi
      </h2>
      <b-img
        :src="require('@/assets/images/logo/gplay-id.png')"
        fluid
        alt="Logo Google Play"
      />
      <div style="margin-bottom: 20px;" />
    </b-col>
    <b-col
      lg="1"
      md="1"
      sm="12"
    />
    <b-col cols="12" />
    <b-col cols="12" style="background: black !important;">
      <p
        v-if="$route.meta.resource !== 'PointSale'"
        class="clearfix mb-0"
        style="text-align:center; margin-top: 15px; margin-bottom: 15px !important;"
      >
        <span class="d-block d-md-inline-block mt-25">
          COPYRIGHT  © {{ new Date().getFullYear() }}
          <b-link
            class="ml-25"
            href="https://sisi.id"
            target="_blank"
            style="color: red !important; font-weight: bold;"
          >PT Sinergi Informatika Semen Indonesia</b-link>
          <span class="d-none d-sm-inline-block">, anak usaha dari PT Semen Indonesia TBK. All rights reserved.</span>
        </span>
      </p>
    </b-col>
  </b-row>
</template>

<script>
import {
  BLink, BRow, BCol, BImg,
} from 'bootstrap-vue'

export default {
  components: {
    BLink,
    BRow,
    BCol,
    BImg,
  },
}
</script>

<style scoped>
.text-white {
  color: white;
}
.text-link {
  font-size: initial;
}
.btn-cs {
  background: white;
  color: black;
  padding: 0.5rem;
  border-radius: 20px;
  display: flex;
  text-align: left;
}
.circle-cs {
  background-color: #b20838;
  border-radius: 50%;
  margin-right: 5px;
}
</style>
