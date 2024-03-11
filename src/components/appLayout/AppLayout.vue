<template>
    <main>
      <Navbar />
      <section class="d-flex vh-100">
        <Sidebar />
        <div class="flex-grow-1 p-4 mh-100" style="overflow-y: auto">
          <slot></slot>
        </div>
      </section>
    </main>
  </template>
  
  <script>
  import Navbar from "./Navbar.vue";
  import Sidebar from "./Sidebar.vue";
  
  export default {
    components: { Navbar, Sidebar },
  };
  </script>
  
  <style></style>
  