<template>
  <td>{{ index + 1 }}</td>
  <td class="col-2">
    {{ truncateTextBody(article?.title) }}
  </td>
  <td class="col-2">@{{ article?.author?.username }}</td>
  <td class="col-1">
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
  <td colspan="2" class="col-4">{{ truncateTextBody(article?.body) }}</td>

  <td colspan="1" class="d-flex align-items-center justify-content-end">
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
              data-dismiss="modal"
              type="submit"
              class="btn btn-danger"
              v-if="!isLoading"
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

export default {
  props: ["index", "article"],
  data() {
    return {
      showDrop: false,
      isLoading: false,
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
        await deleteArticle(value);
        this.$forceUpdate();
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
  components: { Modal, PulseLoader },
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
