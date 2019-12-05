<template>
  <div>
    <app-signup></app-signup>
  </div>
</template>

<script>
import SignupForm from "../components/SignupForm.vue";

export default {
  data: () => ({}),
  components: {
    appSignup: SignupForm
  }
};
</script>