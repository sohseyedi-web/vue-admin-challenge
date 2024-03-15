<template>
  <!-- alerts -->
  <Alert v-if="succNotifyEdit" :correct="true">
    <strong>Well Done!</strong> Article updated successfuly
  </Alert>

  <Alert v-if="succNotifyCreate" :correct="true">
    <strong>Well Done!</strong> Article created successfuly

  </Alert>
  <Alert v-if="errNotifyEdit" :correct="false">
    <strong>Edit Failed!</strong>
  </Alert>

  <Alert v-if="errNotifyCreate" :correct="false">
    <strong>Create Failed!</strong>

  </Alert>
  <!-- login code -->
  <header class="d-flex align-items-center justify-content-between mb-3">
    <h3 class="title">{{ text }}</h3>
  </header>
  <!-- form groups -->
  <form class="row" @submit.prevent="submitForm">
    <div action="" class="col-12 col-md-9">
      <TextField
        name="title"
        label="title"
        type="text"
        v-model="article.title"
        :validate="validate"
        :inputError="errors.title"
      />
      <TextField
        name="description"
        label="description"
        type="text"
        v-model="article.description"
        :validate="validate"
        :inputError="errors.description"
      />
      <div class="form-group text-left my-4 postion-relative">
        <label for="body" :class="errors.body ? 'err' : 'textInput'"
          >Body:</label
        >
        <textarea
          type="text"
          id="body"
          name="body"
          class="form-control no-resize"
          :class="errors.body ? 'borderErr' : 'borderSucc'"
          v-model="article.body"
          style="height: 225px; resize: none"
          @blur="validate('body')"
          @keypress="validate('body')"
        />
        <span v-if="!!errors.body" class="err position-absolute">{{
          errors.body
        }}</span>
      </div>
      <!-- show modal for responsive page -->
      <div
        class="w-100 form-control d-lg-none pointer my-3 position-relative"
        data-toggle="modal"
        data-target="#exampleModalCenter"
        style="cursor: pointer"
        :class="errors.tagList ? 'borderErr' : 'borderSucc'"
      >
        Tags
      </div>
      <Modal>
        <Tags
          name="tags"
          label="Tags"
          v-model="article.tagList"
          :validate="validate"
          :inputError="errors.tagList"
        />
      </Modal>
      <!-- end modal -->
      <button type="submit" class="customBtn py-2 text-white" v-if="!isLoading">
        Submit
      </button>
      <!-- loading icon -->
      <pulse-loader
        class="customBtn py-2 text-center"
        :loading="isLoading"
        color="#fff"
        size=".5rem"
      ></pulse-loader>
    </div>
    <!-- show tags as lg page -->
    <div class="col-6 col-md-3 pt-1 d-none d-lg-block position-relative">
      <Tags
        label="Tags"
        v-model="article.tagList"
        name="tags"
        :validate="validate"
        :inputError="errors.tagList"
      />
    </div>
  </form>
</template>
<script>
import Tags from "./Tags.vue";
import Modal from "./Modal.vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import {
  createArticles,
  editArticle,
  getSingleArticleBySlug,
} from "../services/articleService";
import TextField from "./TextField.vue";
import * as Yup from "yup";
import Alert from "./Alert.vue";

// validation schema
const ArticleSchema = Yup.object().shape({
  title: Yup.string().required("Required field"),
  description: Yup.string().required("Required field"),
  body: Yup.string().required("Required field"),
  tagList: Yup.array().required("Required field"),
});

export default {
  components: { Tags, Modal, PulseLoader, TextField, Alert },
  props: ["text"],
  data() {
    return {
      article: {
        title: "",
        description: "",
        body: "",
        tagList: [],
      },
      errors: {
        title: "",
        description: "",
        body: "",
        tagList: [],
      },
      slug: null,
      isLoading: false,
      succNotifyCreate: false,
      errNotifyCreate: false,
      succNotifyEdit: false,
      errNotifyEdit: false,
    };
  },
  created() {
    this.slug = this.$route.params.slug;
    this.getSingleArticle(this.slug);
  },
  methods: {
    // submiting form
      async submitForm() {
      if (this.slug && this.article) {
        // edit articles function
        this.isLoading = true;
        try {
          await ArticleSchema.validate(this.article, { abortEarly: false });
          await editArticle({ article: this.article, slug: this.slug });
          this.succNotifyEdit = true;

          this.$router.push("/articles");
        } catch (err) {
          err.inner.forEach((error) => {
            this.errors = { ...this.errors, [error.path]: error.message };
          });
          console.log(err);
          this.errNotifyEdit = true;

        } finally {
          this.isLoading = false;
        }
      } else {
        this.isLoading = true;
        // create  articles function
        try {
          await ArticleSchema.validate(this.article, { abortEarly: false });
          await createArticles({
            article: this.article,
          });
          this.succNotifyCreate = true;

          this.$router.push("/articles");
        } catch (err) {
          err.inner.forEach((error) => {
            this.errors = { ...this.errors, [error.path]: error.message };
          });
          console.log(err);
          this.errNotifyCreate = true;

        } finally {
          this.isLoading = false;
        }
      }
    },
    validate(field) {
      ArticleSchema.validateAt(field, this.article)
        .then(() => (this.errors[field] = ""))
        .catch((err) => {
          this.errors[err.path] = err.message;
        });
    },
    async getSingleArticle(slug) {
      try {
        const data = await getSingleArticleBySlug(slug);
        this.article = data.article;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style>
.title {
  font-size: 2.5rem;
  color: #000;
}

.customBtn {
  width: 99px;
  border-radius: 4px;
  border: solid 1px #1c7cd5;
  background-color: #1c7cd5;
}
</style>
