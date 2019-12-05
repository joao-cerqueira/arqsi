import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Maquina from "../views/Maquina.vue";
import TipoMaquina from "../views/TipoMaquina.vue";
import Operacao from "../views/Operacao";
import TipoOperacao from "../views/TipoOperacao";
import LinhaProducao from "../views/LinhaProducao";
import Ferramenta from "../views/Ferramenta";
import PlanoFabrico from "../views/PlanoFabrico";
import Produto from "../views/Produto";
import TipoProduto from "../views/TipoProduto";
import Simulation from "../views/Simulacao";
import Login from "../views/Login";
import Signup from "../views/Signup";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/machine",
    name: "maquina",
    component: Maquina,
    beforeEnter(to, from, next) {
      try {
        if (store.state.userLogged) {
          next()
        } else {
          next("/login");
        }
      } catch () {
      }
    }
  },
  {
    path: "/machine-type",
    name: "tipoMaquina",
    component: TipoMaquina,
    beforeEnter(to, from, next) {
      try {
        if (store.state.userLogged) {
          next()
        } else {
          next("/login");
        }
      } catch () {
      }
    }
  },
  {
    path: "/operation",
    name: "operacao",
    component: Operacao,
    beforeEnter(to, from, next) {
      try {
        if (store.state.userLogged) {
          next()
        } else {
          next("/login");
        }
      } catch () {
      }
    }
  },
  {
    path: "/operation-type",
    name: "tipoOperacao",
    component: TipoOperacao,
    beforeEnter(to, from, next) {
      try {
        if (store.state.userLogged) {
          next()
        } else {
          next("/login");
        }
      } catch () {
      }
    }
  },
  {
    path: "/production-line",
    name: "linhaProducao",
    component: LinhaProducao,
    beforeEnter(to, from, next) {
      try {
        if (store.state.userLogged) {
          next()
        } else {
          next("/login");
        }
      } catch () {
      }
    }
  },
  {
    path: "/tool",
    name: "ferramenta",
    component: Ferramenta,
    beforeEnter(to, from, next) {
      try {
        if (store.state.userLogged) {
          next()
        } else {
          next("/login");
        }
      } catch () {
      }
    }
  },
  {
    path: "/manufacturing-plan",
    name: "planoFabrico",
    component: PlanoFabrico,
    beforeEnter(to, from, next) {
      try {
        if (store.state.userLogged) {
          next()
        } else {
          next("/login");
        }
      } catch () {
      }
    }
  },
  {
    path: "/product",
    name: "produto ",
    component: Produto,
    beforeEnter(to, from, next) {
      try {
        if (store.state.userLogged) {
          next()
        } else {
          next("/login");
        }
      } catch () {
      }
    }
  },
  {
    path: "/product-type",
    name: "tipoProduto",
    component: TipoProduto,
    beforeEnter(to, from, next) {
      try {
        if (store.state.userLogged) {
          next()
        } else {
          next("/login");
        }
      } catch () {
      }
    }
  },
  {
    path: "/simulation",
    name: "simulation",
    component: Simulation,
    beforeEnter(to, from, next) {
      try {
        if (store.state.userLogged) {
          next()
        } else {
          next("/login");
        }
      } catch () {
      }
    }
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
