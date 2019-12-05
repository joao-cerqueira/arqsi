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
    <v-data-table :headers="headers" :items="listaOperacoesId" :search="search"></v-data-table>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      search: "",
      headers: [
        { text: "Operation ID", value: "operacaoId" },
        { text: "Description", value: "descricao" },
        { text: "Operation Type ID", value: "tipoOperacaoId" },
        { text: "Tool ID", value: "ferramentaId" }
      ],
      listaOperacoesId: []
    };
  },
  methods: {
    getListaOperacoes() {
      this.listaOperacoesId = [];
      axios
        .get("https://localhost:5001/api/Operacao")
        .then(res => {
          const data = res.data;

          for (let element in data) {
            let operacao = {
              operacaoId: "",
              descricao: "",
              tipoOperacaoId: "",
              ferramentaId: ""
            };
            operacao.operacaoId = data[element].operacaoId;
            operacao.descricao = data[element].descricao;
            operacao.tipoOperacaoId = data[element].tipoOperacaoId;
            operacao.ferramentaId = data[element].ferramentaId;
            this.listaOperacoesId.push(operacao);
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
      this.getListaOperacoes();
    }
  },
  created() {
    this.getListaOperacoes();
  }
};
</script>

