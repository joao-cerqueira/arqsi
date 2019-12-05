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
    listaMaquinasId: [],
    maquinaId: ""
  }),
  methods: {
    onSubmit() {
      const formData = {
        MaquinaId: parseInt(this.maquinaId)
      };

      axios
        .delete(
          "https://localhost:5001/api/Maquina/" + this.maquinaId,
          formData
        )
        .then(() => {
          this.dialogHeadline = "Sucess";
          this.dialogText = "Machine deleted with sucess!";
          this.dialog = true;
          this.dialogColor = "green";
          this.maquinaId = "";
          this.descricao = "";
          this.tipoMaquinaId = "";
          this.$store.commit("updateRunningVersion");
          this.listaMaquinasId = this.getMaquinasList();
        })
        .catch(() => {
          this.dialogHeadline = "Failure";
          this.dialogText = "Fail deleting the machine";
          this.dialog = true;
          this.dialogColor = "red";
          this.$store.commit("updateRunningVersion");
        });
    },
    getMaquinasList() {
      var result = [];
      axios
        .get("https://localhost:5001/api/Maquina")
        .then(res => {
          const data = res.data;

          for (let key in data) {
            result.push(data[key].maquinaId);
          }
        })
        .catch();
      return result;
    }
  },
  created() {
    this.listaMaquinasId = this.getMaquinasList();
  },
  computed: {
    // a computed getter
    btnDisable: function() {
      // `this` points to the vm instance
      return this.maquinaId == "";
    },
    version() {
      return this.$store.state.runningVersion;
    }
  },
  watch: {
    version() {
      this.listaMaquinasId = this.getMaquinasList();
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