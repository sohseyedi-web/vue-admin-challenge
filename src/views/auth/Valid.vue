<template>
  <div class="row">
    <div class="offset-md-3 col-md-6 mt-5">
      <h3>Article Form</h3>
      <form action="#" @submit.prevent="submitData">
        <TextField
          :validate="validate"
          name="email"
          label="email"
          type="email"
          v-model="article.email"
          :inputError="errors.email"
        />
        <div class="form-group">
          <input
            type="email"
            class="form-control"
            :class="errors.email ? 'borderErr' : 'borderSucc'"
            placeholder="Email"
            v-model="article.email"
            @blur="validate('email')"
            @keypress="validate('email')"
          />
          <p class="errors" v-if="!!errors.email">{{ errors.email }}</p>
        </div>
        <div class="form-group">
          <input
            type="password"
            class="form-control"
            placeholder="password"
            :class="errors.password ? 'borderErr' : 'borderSucc'"
            v-model="article.password"
            @blur="validate('password')"
            @keypress="validate('password')"
          />
          <p class="errors" v-if="!!errors.password">{{ errors.password }}</p>
        </div>
        <div class="form-group">
          <input
            type="submit"
            class="btn btn-primary btn-block"
            value="submit"
          />
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import * as Yup from "yup";
import TextField from "../../components/TextField.vue";
const ArticleSchema = Yup.object().shape({
  email: Yup.string().required("Required field").email("Email not correct"),
  password: Yup.string().required("Required field"),
});
export default {
  name: "ArticleForm",
  data() {
    return {
      article: {
        email: "",
        password: "",
      },
      errors: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    submitData() {
      ArticleSchema.validate(this.article, { abortEarly: false })
        .then(() => {
          const submittedData = `${this.article.email} ${this.article.password}`;
          alert(submittedData);
        })
        .catch((err) => {
          err.inner.forEach((error) => {
            this.errors = { ...this.errors, [error.path]: error.message };
          });
        });
    },
    validate(field) {
      ArticleSchema.validateAt(field, this.article)
        .then(() => (this.errors[field] = ""))
        .catch((err) => {
          this.errors[err.path] = err.message;
        });
    },
  },
  components: { TextField },
};
</script>
<style scoped>
.errors {
  color: #cb2e25;
}
</style>
