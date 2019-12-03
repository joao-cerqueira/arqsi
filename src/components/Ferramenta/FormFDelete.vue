<template>
  <div class="arqsi-form">
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" md="12">
            <v-overflow-btn
              v-model="ferramentaId"
              class="my-2"
              :items="listaFerramentasId"
              label="Tool ID"
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
    listaFerramentasId: [],
    ferramentaId: ""
  }),
  methods: {
    onSubmit() {
      const formData = {
        FerramentaId: parseInt(this.ferramentaId)
      };

      axios
        .delete(
          "https://localhost:5001/api/Ferramenta/" + formData.FerramentaId
        )
        .then(() => {
          this.dialogHeadline = "Sucess";
          this.dialogText = "Machine deleted with sucess!";
          this.dialog = true;
          this.dialogColor = "green";
          this.ferramentaId = "";
          this.$store.commit("updateRunningVersion");
        })
        .catch(() => {
          this.dialogHeadline = "Failure";
          this.dialogText = "Fail deleting the tool";
          this.dialog = true;
          this.dialogColor = "red";
        });
    },
    getListaFerramenta() {
      this.listaFerramentasId = [];
      axios
        .get("https://localhost:5001/api/Ferramenta")
        .then(res => {
          const data = res.data;

          for (let key in data) {
            this.listaFerramentasId.push(data[key].ferramentaId);
          }
        })
        .catch();
    }
  },
  created() {
    this.getListaFerramenta();
  },
  computed: {
    // a computed getter
    btnDisable: function() {
      // `this` points to the vm instance
      return this.ferramentaId == "";
    },
    version() {
      return this.$store.state.runningVersion;
    }
  },
  watch: {
    version() {
      this.getListaFerramenta();
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