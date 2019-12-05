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
    <v-data-table :headers="headers" :items="maquinas" :search="search"></v-data-table>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      search: "",
      headers: [
        { text: "Machine ID", value: "maquinaId" },
        { text: "Description", value: "descricao" },
        { text: "Machine Type ID", value: "tipoMaquinaId" }
      ],
      maquinas: []
    };
  },
  methods: {
    getListaMaquinas() {
      this.maquinas = [];
      axios
        .get("https://localhost:5001/api/Maquina")
        .then(res => {
          const data = res.data;

          for (let element in data) {
            let maquina = {
              maquinaId: "",
              descricao: "",
              tipoMaquinaId: ""
            };
            maquina.maquinaId = data[element].maquinaId;
            maquina.descricao = data[element].descricao;
            maquina.tipoMaquinaId = data[element].tipoMaquinaId;
            this.maquinas.push(maquina);
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
      this.getListaMaquinas();
    }
  },
  created() {
    this.getListaMaquinas();
  }
};
</script>

