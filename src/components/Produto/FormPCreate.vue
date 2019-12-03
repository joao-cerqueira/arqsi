<template>
  <div>
    <v-form class="arqsi-form" v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field v-model="produtoId" :rules="idRules" label="Product ID" required></v-text-field>
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
              v-model="tipoProdutoId"
              class="my-2"
              :items="listaTiposProdutosId"
              label="Production Type ID"
              editable
              item-value="text"
            ></v-overflow-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <h3>Select Manufactoring Plan</h3>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-overflow-btn
              :disabled="alternative1"
              v-model="planoFabricoId"
              class="my-2"
              :items="listaPlanosFabricoId"
              label="Manufacturing Plan ID"
              editable
              item-value="text"
            ></v-overflow-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <h3>- or -</h3>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field
              :disabled="alternative2"
              v-model="planoFabricoIdNew"
              :rules="idRules"
              label="Manufacturing Plan ID"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field
              :disabled="alternative2"
              v-model="descricaoNew"
              label="Description"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-select
              :disabled="alternative2"
              v-model="operacoesIdNew"
              :items="listaOperacoesId"
              chips="chips"
              multiple="multiple"
              label="Operations ID"
            ></v-select>
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
    listaProdutosId: [],
    listaTiposProdutosId: [],
    produtoId: "",
    tipoProdutoId: "",
    planoFabricoId: "",
    planoFabricoIdNew: "",
    listaPlanosFabricoId: [],
    listaOperacoesId: [],
    operacoesIdNew: "",
    descricao: "",
    descricaoNew: "",
    idRules: [
      v =>
        (v > 0 && v < 100000000) ||
        v == "" ||
        "Field must be between 1 and 99999999"
    ]
  }),
  methods: {
    onSubmit() {
      var aux = 1;
      if (this.planoFabricoId != "") {
        aux = 0;
        const formData = {
          ProdutoId: parseInt(this.produtoId),
          Descricao: this.descricao,
          TipoProdutoId: parseInt(this.tipoProdutoId),
          planoFabricoId: parseInt(this.planoFabricoId)
        };

        axios
          .post("https://localhost:5002/api/Produto", formData)
          .then(() => {
            this.dialogHeadline = "Sucess";
            this.dialogText = "Product Created with sucess!";
            this.dialog = true;
            this.dialogColor = "green";
            this.$store.commit("updateRunningVersion");
          })
          .catch(() => {
            this.dialogHeadline = "Failure";
            this.dialogText = "The product id entered already exists!";
            this.dialog = true;
            this.dialogColor = "red";
          });
      } else {
        const formData = {
          PlanoFabricoId: parseInt(this.planoFabricoIdNew),
          Descricao: this.descricaoNew,
          ListaOperacoesId: []
        };

        this.operacoesIdNew.forEach(element => {
          formData.ListaOperacoesId.push(parseInt(element));
        });

        axios
          .post("https://localhost:5002/api/PlanoFabrico", formData)
          .then(() => {
            this.dialogHeadline = "Sucess";
            this.dialogText = "Manufacturing Plan created with sucess!";
            this.dialog = true;
            this.dialogColor = "green";
            this.$store.commit("updateRunningVersion");
          })
          .catch(() => {
            this.dialogHeadline = "Failure";
            this.dialogText =
              "The Manufacturing Plan id entered already exists!";
            this.dialog = true;
            this.dialogColor = "red";
          });
      }

      if (aux == 1) {
        setTimeout(() => {
          this.aux();
        }, 2000);
      }
    },
    aux() {
      const formDataP = {
        ProdutoId: parseInt(this.produtoId),
        Descricao: this.descricao,
        TipoProdutoId: parseInt(this.tipoProdutoId),
        planoFabricoId: parseInt(this.planoFabricoIdNew)
      };

      axios
        .post("https://localhost:5002/api/Produto", formDataP)
        .then(() => {
          this.dialogHeadline = "Sucess";
          this.dialogText = "Product Created with sucess!";
          this.dialog = true;
          this.dialogColor = "green";
          this.$store.commit("updateRunningVersion");
        })
        .catch(() => {
          this.dialogHeadline = "Failure";
          this.dialogText = "The product id entered already exists!";
          this.dialog = true;
          this.dialogColor = "red";
        });
    },
    getListaTipoOperacoes() {
      this.listaTiposOperacoesId = [];
      axios
        .get("https://localhost:5001/api/TipoOperacao")
        .then(res => {
          const data = res.data;

          for (let key in data) {
            this.listaTiposOperacoesId.push(data[key].tipoOperacaoId);
          }
        })
        .catch();
    },
    getOperacoesId() {
      this.listaOperacoesId = [];
      axios
        .get("https://localhost:5001/api/Operacao")
        .then(res => {
          const data = res.data;

          for (let key in data) {
            this.listaOperacoesId.push(data[key].operacaoId);
          }
        })
        .catch();
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
        .catch();
    },
    getListaTipoProdutos() {
      this.listaTiposProdutosId = [];
      axios
        .get("https://localhost:5002/api/TipoProduto")
        .then(res => {
          const data = res.data;

          for (let key in data) {
            this.listaTiposProdutosId.push(data[key].tipoProdutoId);
          }
        })
        .catch();
    }
  },
  created() {
    this.getListaTipoProdutos();
    this.getListaPlanosFabrico();
    this.getOperacoesId();
  },
  computed: {
    // a computed getter
    btnDisable: function() {
      //var reg = new RegExp("/^[0D]*|D*/g");
      // `this` points to the vm instance
      return (
        this.produtoId == "" ||
        0 > this.produtoId > 99999999 ||
        !parseInt(this.produtoId) ||
        this.descricao == "" ||
        this.tipoProdutoId == "" ||
        (this.planoFabricoId == "" &&
          (this.planoFabricoIdNew == "" ||
            this.descricaoNew == "" ||
            this.operacoesIdNew == ""))
      );
    },
    alternative1() {
      if (this.planoFabricoIdNew == "") {
        return false;
      } else {
        return true;
      }
    },
    alternative2() {
      if (this.planoFabricoId == "") {
        return false;
      } else {
        return true;
      }
    },
    version() {
      return this.$store.state.runningVersion;
    }
  },
  watch: {
    version() {
      this.getListaTipoProdutos();
      this.getListaPlanosFabrico();
      this.getOperacoesId();
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