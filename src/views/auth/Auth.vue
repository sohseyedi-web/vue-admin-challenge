<template>
  <main class="container">
    <div>form</div>
    <LoginVue v-if="active" />
    <RegisterVue v-else />
    {{ user?.user.username }}
  </main>
</template>

<script>
import { getCurrentUser } from "../../services/authServices";
import LoginVue from "./Login.vue";
import RegisterVue from "./Register.vue";

export default {
  data() {
    return {
      active: true,
      user: null,
    };
  },
  methods: {
    async getUserData() {
      try {
        const res = await getCurrentUser();
        this.user = res;
        console.log(this.user.user);
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getUserData();
  },
  components: {
    LoginVue,
    RegisterVue,
  },
};
</script>

<style></style>
