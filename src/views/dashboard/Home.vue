<template>
  <main>
    <Navbar/>
    <section class="d-flex vh-100">
      <Sidebar/>
      <div class="flex-1 p-4">
        <div>ei</div>
      </div>
    </section>
  </main>
</template>

<script>
import Navbar from './Navbar.vue';
import Sidebar from './Sidebar.vue';

export default {
    components: { Navbar, Sidebar }
}
</script>

<style>

</style>