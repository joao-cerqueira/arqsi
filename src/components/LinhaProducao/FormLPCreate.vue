<template>
  <div>
    <v-form class="arqsi-form" v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field
              v-model="linhaProducaoId"
              :rules="idRules"
              label="Production Line ID"
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
              v-model="maquinasId"
              :items="listaMaquinasId"
              chips="chips"
              multiple="multiple"
              label="Machines ID"
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
    listaMaquinasId: [],
    maquinasId: "",
    linhaProducaoId: "",
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
        LinhaProducaoId: parseInt(this.linhaProducaoId),
        Descricao: this.descricao,
        ListaMaquinasId: []
      };

      this.maquinasId.forEach(element => {
        formData.ListaMaquinasId.push(parseInt(element));
      });

      axios
        .post("https://localhost:5001/api/LinhaProducao", formData)
        .then(() => {
          this.dialogHeadline = "Sucess";
          this.dialogText = "Production Line Created with sucess!";
          this.dialog = true;
          this.dialogColor = "green";
          this.linhaProducaoId = "";
          this.descricao = "";
          this.maquinasId = "";
          this.$store.commit("updateRunningVersion");
        })
        .catch(() => {
          this.dialogHeadline = "Failure";
          this.dialogText = "The production line id entered already exists!";
          this.dialog = true;
          this.dialogColor = "red";
        });
    },
    getListaMaquinas() {
      this.listaMaquinasId = [];
      axios
        .get("https://localhost:5001/api/Maquina")
        .then(res => {
          const data = res.data;

          for (let key in data) {
            this.listaMaquinasId.push(data[key].maquinaId);
          }
        })
        .catch();
    }
  },
  created() {
    this.getListaMaquinas();
  },
  computed: {
    // a computed getter
    btnDisable: function() {
      //var reg = new RegExp("/^[0D]*|D*/g");
      // `this` points to the vm instance
      return (
        this.linhaProducaoId == "" ||
        0 > this.linhaProducaoId > 99999999 ||
        !parseInt(this.linhaProducaoId) ||
        this.descricao == "" ||
        this.maquinasId == ""
      );
    },
    version() {
      return this.$store.state.runningVersion;
    }
  },
  watch: {
    version() {
      this.getListaMaquinas();
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