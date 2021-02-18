<template>
  <div
    style="background-color: #000000;"
    class="navbar-container d-flex content align-items-center"
  >

    <!-- Nav Menu Toggler -->
    <ul class="nav navbar-nav d-xl-none">
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
    <div class="bookmark-wrapper align-items-center flex-grow-1 d-none d-lg-flex">
      <bookmarks v-if="userdata.role === 'admin'" />
    </div>

    <!-- Right Col -->
    <b-navbar-nav class="nav align-items-center ml-auto">
      <b-button
        v-if="userdata.role === 'user'"
        variant="primary"
        :to="{ name: 'pointof-sale' }"
      >
        <span>POS</span>
      </b-button>
      <user-menu v-if="userdata.role === 'user'" />
      <!-- <dark-Toggler class="d-none d-lg-block" /> -->
      <search-bar />
      <user-dropdown />
    </b-navbar-nav>
  </div>
</template>

<script>
import {
  BLink, BNavbarNav, BButton,
} from 'bootstrap-vue'
import Bookmarks from './components/Bookmarks.vue'
import UserMenu from './components/UserMenu.vue'
// import DarkToggler from './components/DarkToggler.vue'
import SearchBar from './components/SearchBar.vue'
import UserDropdown from './components/UserDropdown.vue'

export default {
  components: {
    BLink,
    BButton,

    // Navbar Components
    BNavbarNav,
    Bookmarks,
    // DarkToggler,
    SearchBar,
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
