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
    <v-data-table :headers="headers" :items="listaFerramentasId" :search="search"></v-data-table>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      search: "",
      headers: [
        { text: "Tool ID", value: "ferramentaId" },
        { text: "Description", value: "descricao" }
      ],
      listaFerramentasId: []
    };
  },
  methods: {
    getListaFerramentas() {
      this.listaFerramentasId = [];
      axios
        .get("https://localhost:5001/api/Ferramenta")
        .then(res => {
          const data = res.data;

          for (let element in data) {
            let ferramenta = {
              ferramentaId: "",
              descricao: ""
            };
            ferramenta.ferramentaId = data[element].ferramentaId;
            ferramenta.descricao = data[element].descricao;
            this.listaFerramentasId.push(ferramenta);
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
      this.getListaFerramentas();
    }
  },
  created() {
    this.getListaFerramentas();
  }
};
</script>

