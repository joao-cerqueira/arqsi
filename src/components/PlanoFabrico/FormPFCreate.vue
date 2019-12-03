<template>
  <div>
    <v-form class="arqsi-form" v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field
              v-model="planoFabricoId"
              :rules="idRules"
              label="Manufacturing Plan ID"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field v-model="descricao" label="Description" required></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-select
              v-model="operacoesId"
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
    listaOperacoesId: [],
    planoFabricoId: "",
    operacoesId: [],

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
        PlanoFabricoId: parseInt(this.planoFabricoId),
        Descricao: this.descricao,
        ListaOperacoesId: []
      };

      this.operacoesId.forEach(element => {
        formData.ListaOperacoesId.push(parseInt(element));
      });

      axios
        .post("https://localhost:5002/api/PlanoFabrico", formData)
        .then(() => {
          this.dialogHeadline = "Sucess";
          this.dialogText = "Manufacturing Plan created with sucess!";
          this.dialog = true;
          this.dialogColor = "green";
          this.planoFabricoId = "";
          this.descricao = "";
          this.operacoesId = "";
          this.$store.commit("updateRunningVersion");
        })
        .catch(() => {
          this.dialogHeadline = "Failure";
          this.dialogText = "The Manufacturing Plan id entered already exists!";
          this.dialog = true;
          this.dialogColor = "red";
        });
    },
    getListaOperacoes() {
      this.operacoesId = [];
      axios
        .get("https://localhost:5001/api/Operacao")
        .then(res => {
          const data = res.data;

          for (let key in data) {
            this.listaOperacoesId.push(data[key].operacaoId);
          }
        })
        .catch();
    }
  },
  created() {
    this.getListaOperacoes();
  },
  computed: {
    // a computed getter
    btnDisable: function() {
      //var reg = new RegExp("/^[0D]*|D*/g");
      // `this` points to the vm instance
      return (
        this.planoFabricoId == "" ||
        0 > this.planoFabricoId > 99999999 ||
        !parseInt(this.planoFabricoId) ||
        this.descricao == "" ||
        this.operacoesId == ""
      );
    },
    version() {
      return this.$store.state.runningVersion;
    }
  },
  watch: {
    version() {
      this.getListaOperacoes();
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