<template>
  <section
    class="container d-flex align-items-center justify-content-center vh-100"
  >
    <form @submit.prevent="submitForm" class="custom-box">
      <h3 class="title text-center">LOGIN</h3>
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

      <ButtonFormVue :text="text" v-if="!isLoading" />
      <pulse-loader
        class="btn btn-primary w-100 py-2 text-center d-flex align-items-center justify-content-center"
        :loading="isLoading"
        v-else-if="isLoading"
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
import TextField from "../../components/TextField.vue";
import { loginUser } from "../../services/authServices";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      isLoading: false,
      inputError: "",
      text: "Login",
    };
  },
  methods: {
    async submitForm() {
      if (this.user.email.length === 0 && this.user.password.length === 0) {
        this.inputError = "Required field";
      } else {
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
      }
    },
    handleError(value) {
      if (value.length === 0) {
        this.inputError = "Required field";
      } else {
        this.inputError = "";
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
