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
    <v-data-table :headers="headers" :items="tipoMaquinas" :search="search"></v-data-table>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      search: "",
      headers: [
        { text: "Machine Type ID", value: "tipoMaquinaId" },
        { text: "Description", value: "descricao" },
        { text: "Operations ID", value: "operacoesId" }
      ],
      tipoMaquinas: []
    };
  },
  methods: {
    getListaTipoMaquinas() {
      this.tipoMaquinas = [];
      axios
        .get("https://localhost:5001/api/TipoMaquina")
        .then(res => {
          const data = res.data;

          for (let element in data) {
            let tipoMaquina = {
              tipoMaquinaId: "",
              descricao: "",
              operacoesId: []
            };
            tipoMaquina.tipoMaquinaId = data[element].tipoMaquinaId;
            tipoMaquina.descricao = data[element].descricao;
            tipoMaquina.operacoesId = (data[element].listaOperacoesId + "")
              .split(",")
              .join(" ");
            this.tipoMaquinas.push(tipoMaquina);
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
      this.getListaTipoMaquinas();
    }
  },
  created() {
    this.getListaTipoMaquinas();
  }
};
</script>

