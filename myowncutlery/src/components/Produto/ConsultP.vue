<template >
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="listaProdutosId" :search="search"></v-data-table>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      search: "",
      headers: [
        { text: "Product ID", value: "produtoId" },
        { text: "Description", value: "descricao" },
        { text: "Product Type ID", value: "tipoProdutoId" },
        { text: "Manufacturing Plan", value: "planoFabricoId" }
      ],
      listaProdutosId: []
    };
  },
  methods: {
    getListaPlanosFabrico(planoId) {
      planosFabrico = [];
      axios
        .get("https://localhost:5002/api/PlanoFabrico/"+planoId)
        .then(res => {
          const data = res.data;

          for (let element in data) {
            let planoFabrico = {
              planoFabricoId: "",
              descricao: "",
              operacoesId: []
            };

            planoFabrico.operacoesId = (data[element].listaOperacoesId + "")
              .split(",")
              .join(" ");
            planosFabrico.push(planoFabrico);
          }
          return planosFabrico.operacoesId[0];
        })
        .catch(error => console.log(error));
    },
    getListaProdutos() {
      this.listaProdutosId = [];
      axios
        .get("https://localhost:5002/api/Produto")
        .then(res => {
          const data = res.data;

          for (let element in data) {
            let produto = {
              produtoId: "",
              descricao: "",
              tipoProdutoId: "",
              planoFabricoId: ""
            };
            produto.produtoId = data[element].produtoId;
            produto.descricao = data[element].descricao;
            produto.tipoProdutoId = data[element].tipoProdutoId;
            produto.operacoesId = getListaPlanosFabrico(data[element].planoFabricoId);

            this.listaProdutosId.push(produto);
          }
        })
        .catch(error => console.log(error));
    }
  },
  computed: {
    version() {
      return this.$store.state.runningVersion;
    }
  },
  watch: {
    version() {
      this.getListaProdutos();
    }
  },
  created() {
    this.getListaProdutos();
  }
};
</script>

