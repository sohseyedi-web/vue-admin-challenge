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
import { loginUser } from "../../services/authServices";
import { toast } from "vue3-toastify";

export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async submitForm() {
      try {
        const data = await loginUser({
          user: this.user,
        });
        localStorage.setItem("accessToken", data?.user?.token);
        toast.success("Login Successful", {
          autoClose: "3000",
          rtl: true,
        });
        console.log(data);
      } catch (error) {
        console.log(error);
        toast.error("Email or password is invalid", {
          autoClose: "3000",
          rtl: true,
        });
      }
    },
  },
};
</script>

<style></style>
