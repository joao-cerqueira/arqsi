<template>
  <div class="arqsi-header">
    <v-app-bar class="arqsi-header__bar" dark>
      <v-app-bar-nav-icon v-if="this.$store.state.userLogged" @click.stop="showMenu"></v-app-bar-nav-icon>

      <router-link to="/" class="arqsi-header__title">
        <v-toolbar-title>My Own Cutlery</v-toolbar-title>
        <v-icon>mdi-silverware-variant</v-icon>
      </router-link>

      <v-spacer></v-spacer>
      <v-btn v-if="!this.$store.state.userLogged" to="/signup" text>
        <v-icon>mdi-account-plus</v-icon>
      </v-btn>
      <v-btn v-if="!this.$store.state.userLogged" to="/login" text>
        <v-icon>mdi-login</v-icon>
      </v-btn>
      <v-btn v-if="this.$store.state.userLogged" to="/" @click="logout"  text>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  components: {},
  methods: {
    showMenu() {
      this.$store.commit("changeDrawer");
    },
    ativarNavBarBtn() {
      this.$store.commit("changeNavBarBtn");
    },
    logout() {
      console.log("Logout");
      this.$store.state.userLogged = null;
      this.$store.state.token = null;
    }
  }
};
</script>

<style lang="scss">
.arqsi-header {
  &__bar {
    background-color: $arqsi-dark-grey !important;
  }

  &__title {
    color: white !important;
    text-decoration: none;
  }
  &__bar.v-sheet.v-sheet--tile.theme--dark.v-toolbar.v-app-bar {
    height: 40px !important;
    background-color: $arqsi-grey !important;
  }
  &__title.router-link-active {
    display: flex;
  }
  .v-toolbar__content {
    height: 40px !important;
  }
  .v-toolbar__title {
    font-size: 18px;
  }
}
</style>