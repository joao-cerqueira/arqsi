<template>
  <v-app>
    <div id="app" class="arqsi">
      <appHeader></appHeader>
      <appNavBar></appNavBar>
      <div>
        <router-view class="arqsi__router-view" />
      </div>
      <app-footer></app-footer>
    </div>
  </v-app>
</template>


<script>
import Header from "./components/Header.vue";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

export default {
  data: () => ({
    dropdown_edit: [1, 2, 3, 4]
  }),
  components: {
    appFooter: Footer,
    appNavBar: NavBar,
    appHeader: Header
  }
};
</script>


<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}

.arqsi {
  &__router-view {
    height: 100%;
    margin-bottom: 100px;
  }
}
</style>
