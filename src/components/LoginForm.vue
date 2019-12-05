<template>
  <v-app>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-icon>mdi-login</v-icon>
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Email"
                    v-model="email"
                    prepend-icon="mdi-account"
                    type="text"
                  />

                  <v-text-field
                    v-model="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn @click="submit" color="primary">Login</v-btn>
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
      email: "",
      password: "",
      dialog: false,
      redirection: ""
    };
  },
  methods: {
    submit() {
      const formData = {
        email: this.email,
        password: this.password
      };

      axios
        .post(
          "https://backend-nodejs-g10.herokuapp.com/api/auth/signin",
          formData
        )
        .then(res => {
          //pop up
          this.dialogHeadline = "Sucess";
          this.dialogText = "You are in!";
          this.dialogColor = "green";
          this.redirection = "/";
          this.dialog = true;
          //
          this.$store.commit("authenticate", res.data.user, res.data.token);
        })
        .catch(() => {
          this.dialogHeadline = "Fail";
          this.dialogText = "Verify your access credentials!";
          this.dialogColor = "red";
          this.dialog = true;
        });
    }
  }
};
</script>