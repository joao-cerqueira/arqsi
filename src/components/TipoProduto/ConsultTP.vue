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
    <v-data-table :headers="headers" :items="listaTipoProdutosId" :search="search"></v-data-table>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      search: "",
      headers: [
        { text: "Product Type ID", value: "tipoProdutoId" },
        { text: "Description", value: "descricao" }
      ],
      listaTipoProdutosId: []
    };
  },
  methods: {
    getListaTipoProdutos() {
      this.listaTipoProdutosId = [];
      axios
        .get("https://localhost:5002/api/TipoProduto")
        .then(res => {
          const data = res.data;

          for (let key in data) {
            this.listaTipoProdutosId.push(data[key]);
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
      this.getListaTipoProdutos();
    }
  },
  created() {
    this.getListaTipoProdutos();
  }
};
</script>

