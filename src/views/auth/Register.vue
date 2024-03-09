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
        const data = await registerUser({
          user: this.user,
        });
        localStorage.setItem("accessToken", data?.user?.token);
        toast.success("Register Successful", {
          autoClose: "3000",
          rtl: true,
        });
        console.log(data);
      } catch (error) {
        console.log(error);
        toast.error("error in register", {
          autoClose: "3000",
          rtl: true,
        });
      }
    },
  },
};
</script>

<style></style>
