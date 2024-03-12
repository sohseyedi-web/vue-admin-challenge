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
        <label for="password" style="color: #373a3c" class="mb-1"
          >Password:</label
        >
        <input
          type="password"
          id="password"
          v-model="user.password"
          class="form-control"
          required
        />
      </div>
      <ButtonFormVue text="Login" v-if="isLoading" />
      <pulse-loader
        class="btn btn-primary w-100 py-2 text-center d-flex align-items-center justify-content-center"
        :loading="isLoading"
        color="#fff"
        size=".5rem"
      ></pulse-loader>
      <div class="d-flex align-items-center mt-3" style="color: #373a3c">
        <span class="mr-2">Don’t have account?</span>
        <router-link to="/register">
          <span style="color: #373a3c" class="font-weight-bold"
            >Register Now</span
          >
        </router-link>
      </div>
    </form>
  </section>
</template>

<script>
import ButtonFormVue from "../../components/ButtonForm.vue";
import { loginUser } from "../../services/authServices";

export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      isLoading: false,
    };
  },
  methods: {
    async submitForm() {
      this.isLoading = true;
      try {
        const data = await loginUser({
          user: this.user,
        });
        localStorage.setItem("accessToken", data?.user?.token);
        this.$router.push("/");
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
  components: {
    ButtonFormVue,
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
