<template>
  <section
    class="container d-flex align-items-center justify-content-center vh-100"
  >
    <form @submit.prevent="submitForm" class="custom-box">
      <h3 class="title text-center">REGISTER</h3>
      <TextField
        name="username"
        label="username"
        type="text"
        v-model="user.username"
        :inputError="inputError"
      />
      <TextField
        name="email"
        label="email"
        type="email"
        v-model="user.email"
        :inputError="inputError"
      />
      <TextField
        name="password"
        label="password"
        type="password"
        v-model="user.password"
        :inputError="inputError"
      />
      <ButtonFormVue text="Register" v-if="!isLoading" />
      <pulse-loader
        v-else="isLoading"
        class="btn btn-primary w-100 py-2 text-center d-flex align-items-center justify-content-center"
        :loading="isLoading"
        color="#fff"
        size=".5rem"
      ></pulse-loader>
      <div class="d-flex align-items-center gap-2 mt-3" style="color: #373a3c">
        <span class="mr-2">Already Registered?</span>
        <router-link to="/login">
          <span style="color: #373a3c" class="font-weight-bold">Login</span>
        </router-link>
      </div>
    </form>
  </section>
</template>

<script>
import { registerUser } from "../../services/authServices";
import ButtonFormVue from "../../components/ButtonForm.vue";
import TextField from "../../components/TextField.vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

export default {
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
      },
      isLoading: false,
      inputError: "",
      text: "Register",
    };
  },
  methods: {
    async submitForm() {
      if (
        this.user.email.length === 0 &&
        this.user.password.length === 0 &&
        this.user.username.length === 0
      ) {
        this.inputError = "Required field";
      } else {
        this.isLoading = true;
        try {
          const data = await registerUser({
            user: this.user,
          });
          this.notifySuccess = true;
          localStorage.setItem("accessToken", data?.user?.token);
          this.$router.push("/");
        } catch (error) {
          console.log(error);
        } finally {
          this.isLoading = false;
        }
      }
    },
  },
  components: {
    ButtonFormVue,
    TextField,
    PulseLoader,
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
  font-family: "Helvetica Neue";
}
</style>
