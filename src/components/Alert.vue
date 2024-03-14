<template>
  <div
    class="alert alert-dismissible fade show position-fixed"
    role="alert"
    style="top: 2%; right: 2%"
    :class="!correct ? 'alert-danger' : 'alert-success'"
  >
    <slot></slot>
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>
<script>
export default {
  props: ["correct"],
};
</script>
<style lang=""></style>
