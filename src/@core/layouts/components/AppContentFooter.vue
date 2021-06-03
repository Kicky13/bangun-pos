<template>
  <b-row style="background: #343a40 !important; padding: 10px;">
    <!-- <b-col
      lg="1"
      md="1"
      sm="12"
    /> -->
    <b-col
      lg="3"
      md="12"
      sm="12"
      style="text-align: center;"
    >
      <div style="margin-bottom: 20px;" />
      <b-img
        :src="require('@/assets/images/logo/logo-at-putih.png')"
        fluid
        alt="Logo Akses Toko Putih"
        style="max-width: 216px;"
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
        href="mailto:customerservice@aksestoko.id"
        target="_blank"
        style="display: inline-block; align-content: center; justify-content: center; color: #343a40; background-color: white; padding: 5px 10px; font-size: 13px; border-radius: 50px;"
      >
        <feather-icon
          icon="MailIcon"
          size="20"
        />
        <span style="margin-left:5px;"> customerservice@aksestoko.id</span>
      </b-link>
      <div style="margin-bottom: 20px;" />
    </b-col>
    <b-col
      lg="2"
      md="3"
      sm="12"
    >
      <div style="margin-bottom: 20px;" />
      <h2
        class="text-white"
      >
        Memulai
      </h2>
      <b-link
        class="ml-25 text-white"
        href="https://qa.aksestoko.id/auth/signup"
        target="_blank"
        style="font-size: 1.25rem;"
      >Daftar</b-link>
      <br>
      <b-link
        class="ml-25 text-white"
        href="https://qa.aksestoko.id/auth/signin"
        target="_blank"
        style="font-size: 1.25rem;"
      >Masuk</b-link>
      <br>
      <b-link
        class="ml-25 text-white"
        href="https://qa.aksestoko.id/auth/profile"
        target="_blank"
        style="font-size: 1.25rem;"
      >Akun</b-link>
      <br>
      <b-link
        class="ml-25 text-white"
        href="https://qa.aksestoko.id/order"
        target="_blank"
        style="font-size: 1.25rem;"
      >Pesanan</b-link>
      <br>
      <div style="margin-bottom: 20px;" />
    </b-col>
    <b-col
      lg="2"
      md="3"
      sm="12"
    >
      <div style="margin-bottom: 20px;" />
      <h2
        class="text-white"
      >
        Bantuan
      </h2>
      <b-link
        class="ml-25 text-white"
        href="https://qa.aksestoko.id/home/faq"
        target="_blank"
        style="font-size: 1.25rem;"
      >FAQ</b-link>
      <br>
      <b-link
        class="ml-25 text-white"
        href="https://qa.aksestoko.id/home/cs"
        target="_blank"
        style="font-size: 1.25rem;"
      >Layanan Pelanggan</b-link>
      <!-- <br>
      <b-link
        class="ml-25 text-white"
        href="https://qa.aksestoko.id/home/cs"
        target="_blank"
      >Live Chat</b-link> -->
      <br>
      <div style="margin-bottom: 20px;" />
    </b-col>
    <b-col
      lg="3"
      md="3"
      sm="12"
    >
      <div style="margin-bottom: 20px;" />
      <h2
        class="text-white"
      >
        Tentang Kami
      </h2>
      <b-link
        class="ml-25 text-white"
        href="https://sig.id"
        target="_blank"
        style="font-size: 1.25rem;"
      >PT Semen Indonesia (Persero) Tbk (SIG)</b-link>
      <br>
      <b-link
        class="ml-25 text-white"
        href="https://sisi.id"
        target="_blank"
        style="font-size: 1.25rem;"
      >PT Sinergi Informatika Semen Indonesia (SISI)</b-link>
      <br>
      <div style="margin-bottom: 20px;" />
    </b-col>
    <b-col
      lg="2"
      md="3"
      sm="12"
    >
      <div style="margin-bottom: 20px;" />
      <h2
        class="text-white"
      >
        Aplikasi
      </h2>
      <b-link
        class="ml-25 text-white"
        href="https://play.google.com/store/apps/details?id=id.sisi.aksestokomobile"
        target="_blank"
        style="font-size: 1.25rem;"
      >
        <b-img
          :src="require('@/assets/images/logo/gplay-id.png')"
          fluid
          alt="Logo Google Play"
        />
      </b-link>
      <div style="margin-bottom: 20px;" />
      <b-link
        class="ml-25 text-white"
        href="https://aksestoko.id/application/ios"
        target="_blank"
        style="font-size: 1.25rem;"
      >
        <b-img
          src="https://aksestoko.id/themes/aksestoko/assets/img/App-Store-Logo-black.png"
          fluid
          alt="Logo App Store"
        />
      </b-link>
      <div style="margin-bottom: 20px;" />
    </b-col>
    <!-- <b-col
      lg="1"
      md="1"
      sm="12"
    /> -->
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
