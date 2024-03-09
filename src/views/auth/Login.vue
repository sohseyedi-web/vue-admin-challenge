<template>
  <section
    class="container d-flex align-items-center justify-content-center vh-100"
  >
    <form @submit.prevent="submitForm" class="custom-box">
      <h3 class="title text-center">LOGIN</h3>
      <div class="form-group text-left my-4">
        <label for="email" style="color: #373a3c" class="mb-1">Email:</label>
        <input
          type="email"
          id="email"
          v-model="user.email"
          class="form-control"
          required
        />
      </div>
      <div class="form-group text-left my-4">
        <label for="password" style="color: #373a3c" class="mb-1">Password:</label>
        <input
          type="password"
          id="password"
          v-model="user.password"
          class="form-control"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary w-100 h-10">Login</button>
      <div class="d-flex align-items-center gap-2 mt-3">
        <span style="color: #373a3c">Don’t have account?</span>
        <router-link to="/register">
            <span style="color: #373a3c" class="font-weight-bolder">Register Now</span>
        </router-link>
      </div>
    </form>
  </section>
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

<style>
.custom-box {
  width: 450px;
  padding: 37px 20px 19px;
  border-radius: 4px;
  background-color: #eceeef;
}
.title {
  font-size: 2.95rem;
  color: #707070;
  font-family: HelveticaNeue;
}
</style>
