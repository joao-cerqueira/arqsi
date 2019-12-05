<template>
  <div class="arqsi-form">
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" md="12">
            <v-overflow-btn
              v-model="produtoId"
              class="my-2"
              :items="listaProdutosId"
              label="Product ID"
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
    listaProdutosId: [],
    produtoId: ""
  }),
  methods: {
    onSubmit() {
      const formData = {
        ProdutoId: parseInt(this.produtoId)
      };

      axios
        .delete("https://localhost:5002/api/Produto/" + formData.ProdutoId)
        .then(() => {
          this.dialogHeadline = "Sucess";
          this.dialogText = "Product deleted with sucess!";
          this.dialog = true;
          this.dialogColor = "green";
          this.produtoId = "";
          this.$store.commit("updateRunningVersion");
        })
        .catch(error => {
          this.dialogHeadline = "Failure";
          this.dialogText = "Fail deleting the product";
          this.dialog = true;
          this.dialogColor = "red";
          console.log(error.response);
        });
    },
    getProdutosId() {
      this.listaProdutosId = [];

      axios
        .get("https://localhost:5002/api/Produto")
        .then(res => {
          const data = res.data;

          for (let key in data) {
            this.listaProdutosId.push(data[key].produtoId);
          }
        })
        .catch(error => console.log(error));
    }
  },
  created() {
    this.getProdutosId();
  },
  computed: {
    // a computed getter
    btnDisable: function() {
      // `this` points to the vm instance
      return this.produtoId == "";
    },
    version() {
      return this.$store.state.runningVersion;
    }
  },
  watch: {
    version() {
      this.getProdutosId();
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