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
    <v-data-table :headers="headers" :items="linhasProducao" :search="search"></v-data-table>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      search: "",
      headers: [
        { text: "Production Line ID", value: "linhaProducaoId" },
        { text: "Description", value: "descricao" },
        { text: "Machines ID", value: "listaMaquinasId" }
      ],
      linhasProducao: []
    };
  },
  methods: {
    getListaLinhasProducao() {
      this.linhasProducao = [];
      axios
        .get("https://localhost:5001/api/LinhaProducao")
        .then(res => {
          const data = res.data;

          for (let element in data) {
            let linhaProducao = {
              linhaProducaoId: "",
              descricao: "",
              listaMaquinasId: []
            };
            linhaProducao.linhaProducaoId = data[element].linhaProducaoId;
            linhaProducao.descricao = data[element].descricao;
            linhaProducao.listaMaquinasId = (data[element].listaMaquinasId + "")
              .split(",")
              .join(" ");
            this.linhasProducao.push(linhaProducao);
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
      this.getListaLinhasProducao();
    }
  },
  created() {
    this.getListaLinhasProducao();
  }
};
</script>

