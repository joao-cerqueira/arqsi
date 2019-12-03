<template>
  <div class="arqsi-form">
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" md="12">
            <v-overflow-btn
              v-model="operacaoId"
              class="my-2"
              :items="listaOperacoesId"
              label="Operation ID"
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
              v-model="tipoOperacaoId"
              class="my-2"
              :items="listaTiposOperacoesId"
              label="Operation Type ID"
              editable
              item-value="text"
            ></v-overflow-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-overflow-btn
              v-model="ferramentaId"
              class="my-2"
              :items="listaFerramentaId"
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
    listaOperacoesId: [],
    listaTiposOperacoesId: [],
    tipoOperacaoId: "",
    operacaoId: "",
    operacoesId: [],
    ferramentaId: "",
    descricao: "",
    listaFerramentaId: [],
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
        OperacaoId: parseInt(this.operacaoId),
        Descricao: this.descricao,
        TipoOperacaoId: parseInt(this.tipoOperacaoId),
        FerramentaId: parseInt(this.ferramentaId)
      };

      axios
        .put(
          "https://localhost:5001/api/Operacao/" + formData.OperacaoId,
          formData
        )
        .then(() => {
          this.dialogHeadline = "Sucess";
          this.dialogText = "Operation altered with sucess!";
          this.dialog = true;
          this.dialogColor = "green";
          this.operacaoId = "";
          this.descricao = "";
          this.tipoOperacaoId = "";
          this.ferramentaId = "";
          this.$store.commit("updateRunningVersion");
        })
        .catch(() => {
          this.dialogHeadline = "Failure";
          this.dialogText = error.response.data;
          this.dialog = true;
          this.dialogColor = "red";
        });
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
    getListaFerramentas() {
      this.listaFerramentaId = [];
      axios
        .get("https://localhost:5001/api/Ferramenta")
        .then(res => {
          const data = res.data;

          for (let key in data) {
            this.listaFerramentaId.push(data[key].ferramentaId);
          }
        })
        .catch();
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
    }
  },
  created() {
    this.getListaTipoOperacoes();
    this.getListaFerramentas();
    this.getOperacoesId();
  },
  computed: {
    // a computed getter
    btnDisable: function() {
      // `this` points to the vm instance
      return (
        this.operacaoId == "" ||
        0 > this.operacaoId > 99999999 ||
        !parseInt(this.operacaoId) ||
        this.descricao == "" ||
        this.tipoOperacaoId == "" ||
        this.ferramentaId == ""
      );
    },
    version() {
      return this.$store.state.runningVersion;
    }
  },
  watch: {
    version() {
      this.getOperacoesId();
      this.getListaTipoOperacoes();
      this.getListaFerramentas();
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