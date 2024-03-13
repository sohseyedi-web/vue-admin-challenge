<template>
  <header class="d-flex align-items-center justify-content-between mb-3">
    <h3 class="title">{{ text }}</h3>
  </header>
  <form class="row" @submit.prevent="submitForm">
    <div action="" class="col-12 col-md-9">
      <TextField
        name="title"
        label="title"
        type="text"
        v-model="article.title"
        :inputError="inputError"
      />
      <TextField
        name="description"
        label="description"
        type="text"
        v-model="article.description"
        :inputError="inputError"
      />
      <div class="form-group text-left my-4 postion-relative">
        <label for="body" :class="inputError ? 'err' : 'textInput'"
          >Body:</label
        >
        <textarea
          type="text"
          id="body"
          class="form-control no-resize"
          :class="inputError ? 'borderErr' : 'borderSucc'"
          v-model="article.body"
          style="height: 225px; resize: none"
        />
        <span v-if="inputError" class="err position-absolute">{{
          inputError
        }}</span>
      </div>
      <!-- show modal -->
      <div
        class="w-100 form-control d-lg-none pointer my-3 position-relative"
        data-toggle="modal"
        data-target="#exampleModalCenter"
        style="cursor: pointer"
        :class="inputError ? 'borderErr' : 'borderSucc'"
      >
        Tags
      </div>
      <Modal>
        <Tags label="Tags" :tag-list="article.tagList" :inputError="inputError" />
      </Modal>
      <!-- end modal -->
      <button type="submit" class="customBtn py-2 text-white" v-if="!isLoading">
        Submit
      </button>
      <pulse-loader
        class="customBtn py-2 text-center"
        :loading="isLoading"
        color="#fff"
        size=".5rem"
      ></pulse-loader>
    </div>
    <div class="col-6 col-md-3 pt-1 d-none d-lg-block position-relative">
      <Tags label="Tags" :tagList="article.tagList" :inputError="inputError" />
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
export default {
  components: { Tags, Modal, PulseLoader, TextField },
  props: ["text"],
  data() {
    return {
      article: {
        title: "",
        description: "",
        body: "",
        tagList: [],
      },
      slug: null,
      isLoading: false,
      inputError: "",
    };
  },
  created() {
    this.slug = this.$route.params.slug;
    this.getSingleArticle(this.slug);
  },
  methods: {
    async submitForm() {
      if (
        this.article.title.length === 0 &&
        this.article.description.length === 0 &&
        this.article.body.length === 0 &&
        this.article.tagList.length === 0
      ) {
        this.inputError = "Required field";
      } else {
        if (this.slug && this.article) {
          this.isLoading = true;
          try {
            await editArticle({ article: this.article, slug: this.slug });
            this.$router.push("/articles");
          } catch (error) {
            console.log(error);
          } finally {
            this.isLoading = false;
          }
        } else {
          this.isLoading = true;

          try {
            await createArticles({
              article: this.article,
            });
            this.$router.push("/articles");
          } catch (error) {
            console.log(error);
          } finally {
            this.isLoading = false;
          }
        }
      }
    },
    async getSingleArticle(slug) {
      try {
        const data = await getSingleArticleBySlug(slug);
        this.article = data.article;
        console.log(data);
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
