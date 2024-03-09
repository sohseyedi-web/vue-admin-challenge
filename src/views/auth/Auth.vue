<template>
  <main class="container">
    <div>form</div>
    <LoginVue v-if="active" />
    <RegisterVue v-else />
  </main>
</template>

<script>
import LoginVue from "./Login.vue";
import RegisterVue from "./Register.vue";

export default {
  data() {
    return {
      active: true,
    };
  },
  components: {
    LoginVue,
    RegisterVue,
  },
};
</script>

<style></style>
