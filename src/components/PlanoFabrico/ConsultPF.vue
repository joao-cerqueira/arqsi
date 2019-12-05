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
    <v-data-table :headers="headers" :items="planosFabrico" :search="search"></v-data-table>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      search: "",
      headers: [
        { text: "Manufacturing Plan ID", value: "planoFabricoId" },
        { text: "Description", value: "descricao" },
        { text: "Operations ID", value: "operacoesId" }
      ],
      planosFabrico: []
    };
  },
  methods: {
    getListaPlanosFabrico() {
      this.planosFabrico = [];
      axios
        .get("https://localhost:5002/api/PlanoFabrico")
        .then(res => {
          const data = res.data;

          for (let element in data) {
            let planoFabrico = {
              planoFabricoId: "",
              descricao: "",
              operacoesId: []
            };
            planoFabrico.planoFabricoId = data[element].planoFabricoId;
            planoFabrico.descricao = data[element].descricao;
            planoFabrico.operacoesId = (data[element].listaOperacoesId + "")
              .split(",")
              .join(" ");
            this.planosFabrico.push(planoFabrico);
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
      this.getListaPlanosFabrico();
    }
  },
  created() {
    this.getListaPlanosFabrico();
  }
};
</script>

