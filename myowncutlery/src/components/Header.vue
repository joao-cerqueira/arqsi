<template>
  <div class="arqsi-header">
    <v-app-bar class="arqsi-header__bar" dark>
      <v-app-bar-nav-icon :disabled="this.$store.state.showNavBarBtn" @click.stop="showMenu"></v-app-bar-nav-icon>

      <router-link to="/" class="arqsi-header__title">
        <v-toolbar-title>My Own Cutlery</v-toolbar-title>
        <v-icon>mdi-silverware-variant</v-icon>
      </router-link>

      <v-spacer></v-spacer>
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