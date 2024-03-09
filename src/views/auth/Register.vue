<template>
  <form @submit.prevent="submitForm">
    <div class="form-group">
      <label for="email">Email:</label>
      <input
        type="email"
        id="email"
        v-model="user.email"
        class="form-control"
        required
      />
    </div>
    <div class="form-group">
      <label for="email">Username:</label>
      <input
        type="email"
        id="email"
        v-model="user.username"
        class="form-control"
        required
      />
    </div>
    <div class="form-group">
      <label for="password">Password:</label>
      <input
        type="password"
        id="password"
        v-model="user.password"
        class="form-control"
        required
      />
    </div>
    <button type="submit" class="btn btn-primary">Login</button>
  </form>
</template>

<script>
import { registerUser } from "../../services/authServices";

export default {
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async submitForm() {
      try {
        await registerUser({
          user: this.user,
        });
        console.log("Register successful");
      } catch (error) {
        console.error("Regsiter failed", error);
      }
    },
  },
};
</script>

<style></style>
