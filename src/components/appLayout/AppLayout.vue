<template>
      <Navbar :onUpdate="handleSidebar"/>
      <section class="d-flex">
        <Sidebar :active="active" :onUpdate="handleSidebar"/>
        <div class="p-4 vh-100" style="flex: 1;">
          <slot></slot>
        </div>
      </section>
  </template>
  
  <script>
  import Navbar from "./Navbar.vue";
  import Sidebar from "./Sidebar.vue";
  
  export default{
    components:{Sidebar,Navbar},
    data() {
    return {
      active: window.innerWidth > 1024,
    };
  },
  methods: {
    updateMedia() {
      this.active = window.innerWidth > 1024;
    },
    handleSidebar(){
      this.active = !this.active
    }
  },
  mounted() {
    this.updateMedia();
    window.addEventListener("resize", this.updateMedia);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updateMedia);
  },
}
  </script>
  
  <style></style>
  