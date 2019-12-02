<template>
  <div v-html="legacySystemHTML"></div>
</template>

<script>
import axios from "axios";

export default {
  computed: {
    legacySystemHTML() {
      axios.get(
        "C:/Users/Teste/Desktop/aulas/arqsi/repositorio/myowncutlery/src/SGRAI_PROJETO/SGRAI_PROJETO/index.html"
      );
      return "<h1>Teste</h1>";
    }
  }
};
</script>