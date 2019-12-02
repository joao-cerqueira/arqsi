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
    component: Maquina
  },
  {
    path: "/machine-type",
    name: "tipoMaquina",
    component: TipoMaquina
  },
  {
    path: "/operation",
    name: "operacao",
    component: Operacao
  },
  {
    path: "/operation-type",
    name: "tipoOperacao",
    component: TipoOperacao
  },
  {
    path: "/production-line",
    name: "linhaProducao",
    component: LinhaProducao
  },
  {
    path: "/tool",
    name: "ferramenta",
    component: Ferramenta
  },
  {
    path: "/manufacturing-plan",
    name: "planoFabrico",
    component: PlanoFabrico
  },
  {
    path: "/product",
    name: "produto ",
    component: Produto
  },
  {
    path: "/product-type",
    name: "tipoProduto",
    component: TipoProduto
  },
  {
    path: "/simulation",
    name: "simulation",
    component: Simulation
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
