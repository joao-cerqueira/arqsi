<template>
  <v-app>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-icon>mdi-account-plus</v-icon>
                <v-toolbar-title>Signup</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    :rules="emptyRules"
                    label="Name"
                    v-model="name"
                    prepend-icon="mdi-account"
                    type="text"
                  />

                  <v-text-field
                    :rules="emptyRules"
                    v-model="email"
                    label="Email"
                    prepend-icon="mdi-email"
                    type="text"
                  />
                  <v-text-field
                    v-model="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    :rules="passRules"
                  />
                  <v-text-field
                    :rules="emptyRules"
                    v-model="address"
                    label="Address"
                    prepend-icon="mdi-sign-direction"
                    type="text"
                  />
                  <v-text-field
                    :rules="emptyRules"
                    v-model="nif"
                    label="NIF"
                    prepend-icon="mdi-receipt"
                    type="number"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn :disabled="btnDisable" @click="submit" color="primary">Sign up</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title
          class="headline arqsi-form__card-titler"
          :style="{color: dialogColor}"
        >{{ dialogHeadline }}</v-card-title>

        <v-card-text>{{ dialogText }}</v-card-text>

        <v-card-actions class="arqsi-form__card-action">
          <v-btn text @click="dialog = false" :to="redirection">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      address: "",
      nif: "",
      dialog: false,
      redirection: "",
      passRules: [v => v.length > 5 || "Field must be 6 chars"],
      emptyRules: [v => v != "" || "The field cannot be empty"]
    };
  },
  methods: {
    submit() {
      const formData = {
        name: this.name,
        email: this.email,
        password: this.password,
        address: this.address,
        nif: this.nif

      };

      axios
        .post(
          "https://backend-nodejs-g10.herokuapp.com/api/auth/signup",
          formData
        )
        .then(res => {
          //pop up
          this.dialogHeadline = "Sucess";
          this.dialogText = "Welcome to your cutlery site!";
          this.dialogColor = "green";
          this.redirection = "/";
          this.dialog = true;
          //
          this.$store.commit("authenticate", res.data.user, res.data.token);
        })
        .catch(() => {
          this.dialogHeadline = "Fail";
          this.dialogText = "Something went wrong! Try later";
          this.dialogColor = "red";
          this.dialog = true;
        });
    }
  },
  computed: {
    // a computed getter
    btnDisable: function() {
      //var reg = new RegExp("/^[0D]*|D*/g");
      // `this` points to the vm instance
      return (
        this.name == "" ||
        0 > this.nif > 999999999 ||
        !parseInt(this.nif) ||
        this.password.length < 6 ||
        this.address == "" ||
        this.email == ""
      );
    }
  }
};
</script>