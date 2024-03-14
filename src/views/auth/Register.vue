<template>
  <section
    class="container d-flex align-items-center justify-content-center vh-100"
  >
    <!-- form groups -->
    <Alert v-if="succNotify" :correct="true">
      <strong>Register Done!</strong> Hello {{ user.email }}.
    </Alert>

    <Alert v-if="errMessage" :correct="false">
      <strong>Register Failed!</strong> 
    </Alert>
    <form @submit.prevent="submitForm" class="custom-box">
      <h3 class="title text-center">REGISTER</h3>
      <!-- username input -->
      <TextField
        name="username"
        label="username"
        type="text"
        v-model="user.username"
        :inputError="errors.username"
        :validate="validate"
      />
      <!-- email input -->

      <TextField
        name="email"
        label="email"
        type="email"
        v-model="user.email"
        :validate="validate"
        :inputError="errors.email"
      />
      <!-- password input -->
      <TextField
        name="password"
        label="password"
        type="password"
        :validate="validate"
        v-model="user.password"
        :inputError="errors.password"
      />
      <!-- button -->
      <ButtonFormVue text="Register" v-if="!isLoading" />
      <!-- loading icon -->
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
import * as Yup from "yup";
import Alert from "../../components/Alert.vue";

// schema validation
const ArticleSchema = Yup.object().shape({
  username: Yup.string().required("Required field"),
  email: Yup.string().required("Required field").email("Email not correct"),
  password: Yup.string().required("Required field"),
});
export default {
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
      },
      errors: {
        username: "",
        email: "",
        password: "",
      },
      isLoading: false,
      text: "Register",
      succNotify: false,
      errNotify: false,
    };
  },
  methods: {
    // function form
    async submitForm() {
      this.isLoading = true;
      try {
        await ArticleSchema.validate(this.user, { abortEarly: false });

        const data = await registerUser({
          user: this.user,
        });
        this.succNotify = true;
        localStorage.setItem("accessToken", data?.user?.token);
        this.$router.push("/articles");
      } catch (err) {
        err.inner.forEach((error) => {
          this.errors = { ...this.errors, [error.path]: error.message };
        });
        this.errNotify = true;
        console.log(err);
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
    Alert
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
