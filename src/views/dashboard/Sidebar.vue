<template>
  <aside class="vh-100 sidebar text-white top-0 position-sticky left-0">
    <h4 class="px-3">Post</h4>
    <ul>
      <li class="px-4 bg-warning py-1">
        <router-link to="/">
            All Articles
        </router-link>
      </li>
      <li class="px-4 bg-warning py-1">
        <router-link to="/">
            New Article
        </router-link>
      </li>
    </ul>
  </aside>
</template>

<style>
.sidebar {
  width: 250px;
  background-color: #1c7cd5;
  padding: 0.813rem 0;
}
</style>
