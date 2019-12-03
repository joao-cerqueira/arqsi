<template>
  <div class="arqsi-form">
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" md="12">
            <v-overflow-btn
              v-model="maquinaId"
              class="my-2"
              :items="listaMaquinasId"
              label="Machine ID"
              editable
              item-value="text"
            ></v-overflow-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field v-model="descricao" label="Description" required></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-overflow-btn
              v-model="tipoMaquinaId"
              class="my-2"
              :items="listaTiposMaquinasId"
              label="Machine Type"
              editable
              item-value="text"
            ></v-overflow-btn>
          </v-col>
        </v-row>
      </v-container>
      <v-btn
        class="arqsi-form__btn"
        type="submit"
        color="success"
        form="check-login-form"
        :disabled="btnDisable"
        @click="onSubmit"
      >Alter</v-btn>
      <v-dialog v-model="dialog" max-width="290">
        <v-card>
          <v-card-title
            class="headline arqsi-form__card-titler"
            :style="{color: dialogColor}"
          >{{ dialogHeadline }}</v-card-title>

          <v-card-text>{{ dialogText }}</v-card-text>

          <v-card-actions class="arqsi-form__card-action">
            <v-btn text @click="dialog = false">Ok</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    valid: false,
    dialog: false,
    dialogText: "",
    dialogHeadline: "",
    dialogColor: "",
    //btnDisable: true,
    listaTiposMaquinasId: [],
    listaMaquinasId: [],
    maquinaId: "",
    descricao: "",
    tipoMaquinaId: "",
    idRules: [
      v =>
        (v > 0 && v < 100000000) ||
        v == "" ||
        "Field must be between 1 and 99999999"
    ]
  }),
  methods: {
    onSubmit() {
      const formData = {
        MaquinaId: parseInt(this.maquinaId),
        Descricao: this.descricao,
        TipoMaquinaId: this.tipoMaquinaId
      };

      axios
        .put("https://localhost:5001/api/Maquina/" + this.maquinaId, formData)
        .then(() => {
          this.dialogHeadline = "Sucess";
          this.dialogText = "Machine altered with sucess!";
          this.dialog = true;
          this.dialogColor = "green";
          this.maquinaId = "";
          this.descricao = "";
          this.tipoMaquinaId = "";
          this.$store.commit("updateRunningVersion");
        })
        .catch(error => {
          this.dialogHeadline = "Failure";
          this.dialogText = "Fail altering the machine";
          this.dialog = true;
          this.dialogColor = "red";
          console.log(error.response);
        });
    },
    getListaMaquinas() {
      this.listaMaquinasId = [];
      axios
        .get("https://localhost:5001/api/TipoMaquina")
        .then(res => {
          const data = res.data;

          for (let key in data) {
            this.listaTiposMaquinasId.push(data[key].tipoMaquinaId);
          }
        })
        .catch(error => console.log(error));

      axios
        .get("https://localhost:5001/api/Maquina")
        .then(res => {
          const data = res.data;

          for (let key in data) {
            this.listaMaquinasId.push(data[key].maquinaId);
          }
        })
        .catch(error => console.log(error));
    }
  },
  created() {
    this.getListaMaquinas();
  },
  computed: {
    // a computed getter
    btnDisable: function() {
      // `this` points to the vm instance
      return (
        this.maquinaId == "" || this.descricao == "" || this.tipoMaquinaId == ""
      );
    },
    version() {
      return this.$store.state.runningVersion;
    }
  },
  watch: {
    version() {
      this.getListaMaquinas();
    }
  }
};
</script>

<style lang="scss">
.arqsi-form {
  &__btn {
    margin: 1rem;
  }
  .v-label.theme--light {
    left: 15px !important;
  }
}
</style>