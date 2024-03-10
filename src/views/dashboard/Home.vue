<template>
  <main>
    <Navbar />
    <section class="d-flex vh-100">
      <Sidebar />
      <div class="flex-grow-1 p-4 h-100" style="overflow-y: auto">
        <ArticleFrom text="New Article" />
      </div>
    </section>
  </main>
</template>

<script>
import ArticleFrom from "../../components/ArticleFrom.vue";
import Navbar from "./Navbar.vue";
import Sidebar from "./Sidebar.vue";

export default {
  components: { Navbar, Sidebar, ArticleFrom },
};
</script>

<style></style>
