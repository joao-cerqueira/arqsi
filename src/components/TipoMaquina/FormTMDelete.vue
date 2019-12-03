<template>
  <div class="arqsi-form">
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" md="12">
            <v-overflow-btn
              v-model="tipoMaquinaId"
              class="my-2"
              :items="listaTipoMaquinasId"
              label="Machine Type ID"
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
      >Delete</v-btn>
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
    listaTipoMaquinasId: [],
    tipoMaquinaId: ""
  }),
  methods: {
    onSubmit() {
      const formData = {
        MaquinaId: parseInt(this.maquinaId)
      };

      axios
        .delete(
          "https://localhost:5001/api/TipoMaquina/" + this.tipoMaquinaId,
          formData
        )
        .then(() => {
          this.dialogHeadline = "Sucess";
          this.dialogText = "Machine Type deleted with sucess!";
          this.dialog = true;
          this.dialogColor = "green";
          this.tipoMaquinaId = "";
          this.$store.commit("updateRunningVersion");
          this.listaTipoMaquinasId = this.getTipoMaquinasList();
        })
        .catch(error => {
          this.dialogHeadline = "Failure";
          this.dialogText = "Fail deleting the machine type";
          this.dialog = true;
          this.dialogColor = "red";
          this.$store.commit("updateRunningVersion");
          console.log(error.response);
        });
    },
    getTipoMaquinasList() {
      var result = [];
      axios
        .get("https://localhost:5001/api/TipoMaquina")
        .then(res => {
          const data = res.data;

          for (let key in data) {
            result.push(data[key].tipoMaquinaId);
          }
        })
        .catch(error => console.log(error));
      return result;
    }
  },
  created() {
    this.listaTipoMaquinasId = this.getTipoMaquinasList();
  },
  computed: {
    // a computed getter
    btnDisable: function() {
      // `this` points to the vm instance
      return this.tipoMaquinaId == "";
    },
    version() {
      return this.$store.state.runningVersion;
    }
  },
  watch: {
    version() {
      this.listaTipoMaquinasId = this.getTipoMaquinasList();
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
  &__card-action {
    justify-content: center !important;
  }
  &__card-titler {
    justify-content: center !important;
  }
}
</style>