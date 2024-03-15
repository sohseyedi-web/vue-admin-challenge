<template>
  <section
    class="container d-flex align-items-center justify-content-center vh-100"
  >
    <!-- form groups -->
    <Alert v-if="succNotify" :correct="true">
      <strong>Login Done!</strong> Hello {{ user.email }}.
    </Alert>

    <Alert v-if="errMessage" :correct="false">
      <strong>Login Failed!</strong> Username and password {{ errMessage }}.
    </Alert>
    <form @submit.prevent="submitForm" class="custom-box">
      <h3 class="title text-center">LOGIN</h3>
      <!-- email input -->
      <TextField
        :validate="validate"
        name="email"
        label="email"
        type="email"
        v-model="user.email"
        :inputError="errors.email"
      />
      <!-- password input -->

      <TextField
        :validate="validate"
        name="password"
        label="password"
        type="password"
        v-model="user.password"
        :inputError="errors.password"
      />
      <!-- button -->
      <ButtonFormVue :text="text" v-if="!isLoading" />
      <!-- loading icon -->
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
import * as Yup from "yup";
import Alert from "../../components/Alert.vue";
// validation schema
const ArticleSchema = Yup.object().shape({
  email: Yup.string().required("Required field").email("Email not correct"),
  password: Yup.string().required("Required field"),
});
export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      errors: {
        email: "",
        password: "",
      },
      isLoading: false,
      text: "Login",
      succNotify: false,
      errNotify: false,
      errMessage: null,
    };
  },
  methods: {
    // function form
    async submitForm() {
      this.isLoading = true;
      try {
        await ArticleSchema.validate(this.user, { abortEarly: false });

        const data = await loginUser({
          user: this.user,
        });
        this.succNotify = true;
        localStorage.setItem("accessToken", data?.user?.token);
        this.$router.push("/articles");
      } catch (err) {
        err.inner.forEach((error) => {
          this.errors = { ...this.errors, [error.path]: error.message };
        });
        this.errMessage = err.response.data.errors["email or password"][0];
      } finally {
        this.isLoading = false;
      }
    },
    validate(field) {
      ArticleSchema.validateAt(field, this.user)
        .then(() => (this.errors[field] = ""))
        .catch((err) => {
          this.errors[err.path] = err.message;
        });
    },
  },
  components: {
    ButtonFormVue,
    TextField,
    PulseLoader,
    Alert,
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
