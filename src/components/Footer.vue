<template>
  <div class="arqsi-footer">
    <v-footer class="arqsi-footer__bar" dark padless absolute>
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} —
        <strong>ARQSI</strong>
      </v-col>
    </v-footer>
  </div>
</template>

<style lang="scss">
.arqsi-footer {
  &__bar {
    background-color: $arqsi-dark-grey !important;
    position: fixed !important;
    font-size: 12px;
  }
}
</style>

