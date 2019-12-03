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
    <v-data-table :headers="headers" :items="listaTipoOperacoesId" :search="search"></v-data-table>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      search: "",
      headers: [
        { text: "Operation Type ID", value: "tipoOperacaoId" },
        { text: "Description", value: "descricao" }
      ],
      listaTipoOperacoesId: []
    };
  },
  methods: {
    getListaTipoOperacoes() {
      this.listaTipoOperacoesId = [];
      axios
        .get("https://localhost:5001/api/TipoOperacao")
        .then(res => {
          const data = res.data;

          for (let element in data) {
            let tipoOperacao = {
              tipoOperacaoId: "",
              descricao: ""
            };
            tipoOperacao.tipoOperacaoId = data[element].tipoOperacaoId;
            tipoOperacao.descricao = data[element].descricao;
            this.listaTipoOperacoesId.push(tipoOperacao);
          }
        })
        .catch();
    }
  },
  computed: {
    version() {
      return this.$store.state.runningVersion;
    }
  },
  watch: {
    version() {
      this.getListaTipoOperacoes();
    }
  },
  created() {
    this.getListaTipoOperacoes();
  }
};
</script>

