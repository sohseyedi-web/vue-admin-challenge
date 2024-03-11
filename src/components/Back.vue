<template>
    <div>
      <div @click="onUpdate" v-if="active" class="overlay d-lg-none"></div>
    </div>
  </template>
  <script>
    export default{
        props:['active','onUpdate'],
    }
</script>
  <style>
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10;
    transition: all 0.3s;
  }
  
  </style>