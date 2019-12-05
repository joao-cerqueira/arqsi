import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    drawer: false,
    runningVersion: 0,
    userLogged : null,
    userToken : null
  },
  getters: {
    getDrawer: state => {
      return state.drawer;
    },
    showNavBar: state => {
      return state.showNavBarBtn;
    },
    getVersion: state => {
      return state.runningVersion;
    },
    userLogged: state => {
      return state.userLogged;
    }
  },
  mutations: {
    changeDrawer: state => {
      state.drawer = !state.drawer;
    },
    changeNavBarBtn: state => {
      state.showNavBarBtn = !state.showNavBarBtn;
    },
    updateRunningVersion: state => {
      state.runningVersion += 1;
    },
    authenticate(state, user, token) {
      state.userLogged = user;
      state.userToken = token;
  }
  },
  actions: {},
  modules: {}
});

export default store;