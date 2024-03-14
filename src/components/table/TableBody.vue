<template>
  <td>
    <Alert v-if="succNotify" :correct="true">
      <strong>Well Done!</strong> Article Deleted Succesfully.
    </Alert>

    <Alert v-if="errNotify" :correct="false"> {{ errNotify }}. </Alert>
    {{ index + 1 }}
  </td>
  <td>
    {{ truncateTextBody(article?.title) }}
  </td>
  <td>@{{ article?.author?.username }}</td>
  <td>
    <div class="dropdown">
      <button
        class="btn btn-secondary btn-sm dropdown-toggle"
        type="button"
        id="dropdownMenu2"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        tags
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenu3">
        <span class="d-block ml-1" v-for="tag in article?.tagList" :key="tag">
          {{ tag }}
        </span>
      </div>
    </div>
  </td>
  <td colspan="2">{{ truncateTextBody(article?.body) }}</td>

  <td class="d-flex align-items-center justify-content-end">
    <span class="mr-2">{{ toLocalDateString(article?.createdAt) }}</span>
    <div class="position-relative">
      <button @click="openModal" class="customDropDown btn btn-sm">
        <span class="mr-2">...</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#fff"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#fff"
          style="width: 12px; height: 12px"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>
      <div class="customModal" v-if="showDrop">
        <router-link
          class="modalText"
          style="padding-top: 1rem"
          :to="'/articles/edit/' + article?.slug"
          >Edit</router-link
        >
        <div class="dropdown-divider"></div>
        <div
          data-toggle="modal"
          data-target="#exampleModalCenter"
          class="modalText"
        >
          Delete
        </div>
        <Modal text="Delete Article">
          <p>Are you sure to delete Article?</p>
          <template v-slot:footer>
            <button type="button" class="btn btn-white" data-dismiss="modal">
              No
            </button>
            <button
              @click="handleRemoveArticle(article?.slug)"
              type="submit"
              class="btn btn-danger"
              v-if="!isLoading"
              data-dismiss="modal"
            >
              Yes
            </button>
            <pulse-loader
              class="btn btn-danger"
              :loading="isLoading"
              color="#fff"
              size=".5rem"
            ></pulse-loader>
          </template>
        </Modal>
      </div>
    </div>
  </td>
</template>
<script>
import { truncateText } from "../../utils/truncateText";
import { toLocalDate } from "../../utils/toLocalDate";
import Modal from "../Modal.vue";
import { deleteArticle } from "../../services/articleService";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import Alert from "../Alert.vue";

export default {
  props: ["index", "article"],
  data() {
    return {
      showDrop: false,
      isLoading: false,
      succNotify: null,
      errNotify: null,
    };
  },
  methods: {
    truncateTextBody(value) {
      return truncateText(value);
    },
    toLocalDateString(value) {
      return toLocalDate(value);
    },
    openModal() {
      this.showDrop = !this.showDrop;
    },

    async handleRemoveArticle(value) {
      this.isLoading = true;
      try {
        const data = await deleteArticle(value);
        console.log(data);
        this.succNotify = true;
        this.$forceUpdate();
      } catch (error) {
        console.log(error);
        this.errNotify = error?.response?.data?.message;
        this.$forceUpdate();
      } finally {
        this.isLoading = false;
      }
    },
  },
  components: { Modal, PulseLoader, Alert },
};
</script>
<style>
.customDropDown {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background-color: #5bc0de;
  border: solid 1px #5bc0de;
}
.customModal {
  width: 175px;
  padding: 0.5rem 0;
  border-radius: 4px;
  border: solid 1px #ddd;
  background-color: #fff;
  position: absolute;
  top: 100%;
  right: 0%;
}
.modalText {
  padding: 0 0.7rem;
  color: #373a3c;
  cursor: pointer;
}
.modalText:hover {
  color: inherit;
}
</style>
