<template>
    <div>
        <app-login></app-login>
    </div>
</template>

<script>
import LoginForm from "../components/LoginForm.vue";

export default {
  data: () => ({
  }),
  components: {
    appLogin: LoginForm
  }
};
</script>