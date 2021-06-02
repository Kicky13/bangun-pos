<template>
  <div
    style="background-color: #000000;"
    class="navbar-container d-flex content align-items-center"
  >

    <!-- Nav Menu Toggler -->
    <ul
      v-if="userdata.role === 'admin'"
      class="nav navbar-nav"
    >
      <li class="nav-item">
        <b-link
          class="nav-link"
          @click="toggleVerticalMenuActive"
        >
          <feather-icon
            icon="MenuIcon"
            size="21"
          />
        </b-link>
      </li>
    </ul>

    <!-- Left Col -->

    <!-- Right Col -->
    <b-navbar-nav class="nav align-items-center ml-auto">
      <b-button
        v-if="userdata.role === 'user'"
        variant="danger"
        :to="{ name: 'pointof-sale' }"
      >
        <span>POS</span>
      </b-button>
      <home-bar v-if="userdata.role === 'user'" />
      <user-menu v-if="userdata.role === 'user'" />
      <!-- <dark-Toggler class="d-none d-lg-block" /> -->
      <!-- <search-bar /> -->
      <user-dropdown :roles="userdata.role" />
    </b-navbar-nav>
  </div>
</template>

<script>
import {
  BLink, BNavbarNav, BButton,
} from 'bootstrap-vue'
// import Bookmarks from './components/Bookmarks.vue'
import UserMenu from './components/UserMenu.vue'
// import DarkToggler from './components/DarkToggler.vue'
// import SearchBar from './components/SearchBar.vue'
import HomeBar from './components/Home.vue'
import UserDropdown from './components/UserDropdown.vue'

export default {
  components: {
    BLink,
    BButton,

    // Navbar Components
    BNavbarNav,
    // Bookmarks,
    // DarkToggler,
    // SearchBar,
    HomeBar,
    UserDropdown,
    UserMenu,
  },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      userdata: JSON.parse(localStorage.getItem('userData')),
    }
  },

}
</script>
