<template>
  <div class="arqsi-card">
    <v-card flat class="mx-auto arqsi-card__card" dark max-width="600" title="Machine">
      <v-toolbar-title>
        <strong>Product Type</strong>
      </v-toolbar-title>
      <v-tabs background-color="deep-purple accent-4" class="elevation-2" dark>
        <v-tabs-slider></v-tabs-slider>

        <v-tab key="1" href="#tab-1">
          Create
          <v-icon>mdi-plus</v-icon>
        </v-tab>

        <v-tab-item key="1" value="tab-1">
          <v-card flat tile>
            <app-form-create></app-form-create>
          </v-card>
        </v-tab-item>

        <v-tab key="2" href="#tab-2">
          Alter
          <v-icon>mdi-refresh</v-icon>
        </v-tab>

        <v-tab-item key="2" value="tab-2">
          <v-card flat tile>
            <app-form-alter></app-form-alter>
          </v-card>
        </v-tab-item>

        <v-tab key="3" href="#tab-3">
          Delete
          <v-icon>mdi-delete</v-icon>
        </v-tab>

        <v-tab-item key="3" value="tab-3">
          <v-card flat tile>
            <app-form-delete></app-form-delete>
          </v-card>
        </v-tab-item>

        <v-tab key="4" href="#tab-4">
          Consult
          <v-icon>mdi-magnify</v-icon>
        </v-tab>

        <v-tab-item key="4" value="tab-4">
          <v-card flat tile>
            <app-consult></app-consult>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </div>
</template>

<script>
import FormCreate from "../components/TipoProduto/FormTPCreate.vue";
import FormAlter from "../components/TipoProduto/FormTPAlter";
import FormDelete from "../components/TipoProduto/FormTPDelete";
import ConsultM from "../components/TipoProduto/ConsultTP";

export default {
  data: () => ({
    tabs: 4
  }),
  components: {
    appFormCreate: FormCreate,
    appFormAlter: FormAlter,
    appFormDelete: FormDelete,
    appConsult: ConsultM
  }
};
</script>

<style lang="scss">
.arqsi-card {
  justify-content: center;
  display: flex;
  &__card {
    margin: 0;
    top: 2rem;
    background-color: $arqsi-grey;
  }
  .v-slide-group__content.v-tabs-bar__content {
    background-color: $arqsi-grey !important;
  }
}
</style>