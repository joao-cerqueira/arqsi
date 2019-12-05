<template>
  <div>
    <v-form class="arqsi-form" v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field
              v-model="tipoOperacaoId"
              :rules="idRules"
              label="Operation Type ID"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field v-model="descricao" label="Description" required></v-text-field>
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
      >Create</v-btn>
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
    tipoOperacaoId: "",
    descricao: "",

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
        TipoOperacaoId: parseInt(this.tipoOperacaoId),
        Descricao: this.descricao
      };

      axios
        .post("https://localhost:5001/api/TipoOperacao", formData)
        .then(() => {
          this.dialogHeadline = "Sucess";
          this.dialogText = "Operation Type created with sucess!";
          this.dialog = true;
          this.dialogColor = "green";
          this.tipoOperacaoId = "";
          this.descricao = "";
          this.$store.commit("updateRunningVersion");
        })
        .catch(error => {
          this.dialogHeadline = "Failure";
          this.dialogText = "The operation type id entered already exists!";
          this.dialog = true;
          this.dialogColor = "red";
          console.log(error.response);
        });
    }
  },
  computed: {
    // a computed getter
    btnDisable: function() {
      //var reg = new RegExp("/^[0D]*|D*/g");
      // `this` points to the vm instance
      return (
        this.tipoOperacaoId == "" ||
        0 > this.tipoOperacaoId > 99999999 ||
        !parseInt(this.tipoOperacaoId) ||
        this.descricao == ""
      );
    },
    version() {
      return this.$store.state.runningVersion;
    }
  },
  watch: {
    version() {}
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