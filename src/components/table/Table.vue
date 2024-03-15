<template>
  <div v-if="!isLoading">
    <!-- table -->
    <div class="table-responsive" style="overflow-x: auto">
      <table class="table w-100">
        <!-- table head -->
        <thead class="thead-light">
          <tr>
            <th
              v-for="item in items"
              :class="
                item.label === 'Created' &&
                'd-flex align-items-center justify-content-end'
              "
              :key="item.id"
              :colspan="getColspan(item)"
            >
              {{ item.label }}
            </th>
          </tr>
        </thead>
        <!-- table body -->
        <tbody>
          <tr v-for="(article, index) in articles" :key="article.slug">
            <TableBody :index="index" :article="article" />
          </tr>
        </tbody>
      </table>
    </div>
    <!--pagination  -->
    <div class="mx-auto w-25">
      <nav aria-label="Page navigation example" class="w-100">
        <ul class="pagination">
          <li class="page-item">
            <a
              class="page-link"
              style="color: #373a3c"
              @click="previousPage"
              :disabled="currentPage === 1"
              aria-label="Previous"
            >
              <span aria-hidden="true">&#60;</span>
              <span class="sr-only">Previous</span>
            </a>
          </li>
          <li
            class="page-item"
            :class="{
              'active text-warning': currentPage === page,
            }"
            v-for="page in visiblePages"
            :key="page"
          >
            <a
              @click="changePage(page)"
              class="page-link"
              style="color: #373a3c"
              >{{ page }}</a
            >
          </li>
          <li class="page-item">
            <a
              class="page-link"
              aria-label="Next"
              style="color: #373a3c"
              @click="nextPage"
              :disabled="currentPage === totalPages"
            >
              <span aria-hidden="true">&#62;</span>
              <span class="sr-only">Next</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
  <!-- loading icon -->
  <pulse-loader
    class="d-flex align-items-center justify-content-center w-100"
    :loading="isLoading"
    v-else-if="isLoading"
    color="#1c7cd5"
    size="1rem"
  ></pulse-loader>
</template>

<script>
import { tableHeadItems } from "../../constants/tableHead";
import TableBody from "./TableBody.vue";
import { getArticles } from "../../services/articleService";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

export default {
  data() {
    return {
      items: tableHeadItems,
      articles: [],
      articleLen: null,
      itemsPerPage: 10,
      currentPage: parseInt(this.$route.params.page),
      isLoading: false,
    };
  },

  methods: {
    async getAllArticle() {
      this.isLoading = true;
      try {
        const data = await getArticles(this.itemsPerPage, this.currentPage);
        this.articles = data.articles;
        this.articleLen = data.articlesCount;
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    getColspan(item) {
      return item.label === "Excerpt" ? "2" : "1";
    },
    // change page with pagination functions
    changePage(page) {
      this.currentPage = page;
      this.$router.push({ name: "Home", params: { page: this.currentPage } });
    },
    previousPage() {
      this.currentPage--;
      if (parseInt(this.$route.params.page) > 1) {
        this.$router.push({
          name: "Home",
          params: { page: parseInt(this.$route.params.page) - 1 },
        });
      }
      this.getAllArticle();
    },
    nextPage() {
      if (parseInt(this.$route.params.page) < this.totalPages) {
        this.currentPage++;
        this.$router.push({
          name: "Home",
          params: { page: parseInt(this.$route.params.page) + 1 },
        });
        this.getAllArticle();
      }
    },
  },
  computed: {
    // data pages

    totalPages() {
      return Math.ceil(this.articleLen / this.itemsPerPage);
    },
    visiblePages() {
      const totalPages = this.totalPages;
      let startPage = this.currentPage;
      let endPage = startPage + 3;

      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(endPage - 3, 1);
      }

      return Array(endPage - startPage + 1)
        .fill()
        .map((_, index) => startPage + index);
    },
  },

  // for change page and loading data
  watch: {
    currentPage: {
      immediate: true,
      handler(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.getAllArticle();
        }
      },
    },
  },

  mounted() {
    this.getAllArticle();
  },
  components: { TableBody, PulseLoader },
};
</script>

<style>
th {
  color: #55595c;
  font-family: Helvetica;
}
td {
  color: #373a3c;
}
</style>
