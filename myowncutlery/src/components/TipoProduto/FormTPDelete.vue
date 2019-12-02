<template>
  <div class="arqsi-form">
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" md="12">
            <v-overflow-btn
              v-model="tipoProdutoId"
              class="my-2"
              :items="listaTipoProdutosId"
              label="Product Type ID"
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
    listaTipoProdutosId: [],
    tipoProdutoId: ""
  }),
  methods: {
    onSubmit() {
      const formData = {
        TipoProdutoId: parseInt(this.tipoProdutoId)
      };

      axios
        .delete(
          "https://localhost:5002/api/TipoProduto/" + formData.TipoProdutoId
        )
        .then(() => {
          this.dialogHeadline = "Sucess";
          this.dialogText = "Product Type deleted with sucess!";
          this.dialog = true;
          this.dialogColor = "green";
          this.tipoProdutoId = "";
          this.$store.commit("updateRunningVersion");
        })
        .catch(error => {
          this.dialogHeadline = "Failure";
          this.dialogText = "Fail deleting the product type";
          this.dialog = true;
          this.dialogColor = "red";
          console.log(error.response);
        });
    },
    getListaTipoProdutos() {
      this.listaTipoProdutosId = [];
      axios
        .get("https://localhost:5002/api/TipoProduto")
        .then(res => {
          const data = res.data;

          for (let key in data) {
            this.listaTipoProdutosId.push(data[key].tipoProdutoId);
          }
        })
        .catch(error => console.log(error));
    }
  },
  created() {
    this.getListaTipoProdutos();
  },
  computed: {
    // a computed getter
    btnDisable: function() {
      // `this` points to the vm instance
      return this.tipoProdutoId == "";
    },
    version() {
      return this.$store.state.runningVersion;
    }
  },
  watch: {
    version() {
      this.getListaTipoProdutos();
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