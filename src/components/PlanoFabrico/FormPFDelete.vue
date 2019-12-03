<template>
  <div class="arqsi-form">
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" md="12">
            <v-overflow-btn
              v-model="planoFabricoId"
              class="my-2"
              :items="listaPlanosFabricoId"
              label="Manufacturing Plan ID"
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
    listaPlanosFabricoId: [],
    planoFabricoId: ""
  }),
  methods: {
    onSubmit() {
      const formData = {
        PlanoFabricoId: parseInt(this.planoFabricoId)
      };

      axios
        .delete(
          "https://localhost:5002/api/PlanoFabrico/" + formData.PlanoFabricoId,
          formData
        )
        .then(() => {
          this.dialogHeadline = "Sucess";
          this.dialogText = "Manufacturing Plan deleted with sucess!";
          this.dialog = true;
          this.dialogColor = "green";
          this.planoFabricoId = "";
          this.$store.commit("updateRunningVersion");
        })
        .catch(error => {
          this.dialogHeadline = "Failure";
          this.dialogText = "Fail deleting the manufacturing plan";
          this.dialog = true;
          this.dialogColor = "red";
          this.$store.commit("updateRunningVersion");
          console.log(error.response);
        });
    },
    getListaPlanosFabrico() {
      this.listaPlanosFabricoId = [];
      axios
        .get("https://localhost:5002/api/PlanoFabrico")
        .then(res => {
          const data = res.data;

          for (let key in data) {
            this.listaPlanosFabricoId.push(data[key].planoFabricoId);
          }
        })
        .catch(error => console.log(error));
    }
  },
  created() {
    this.getListaPlanosFabrico();
  },
  computed: {
    // a computed getter
    btnDisable: function() {
      // `this` points to the vm instance
      return this.planoFabricoId == "";
    },
    version() {
      return this.$store.state.runningVersion;
    }
  },
  watch: {
    version() {
      this.getListaPlanosFabrico();
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