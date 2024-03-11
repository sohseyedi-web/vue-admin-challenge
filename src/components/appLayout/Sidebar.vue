<template>
    <Back :active="active" :onUpdate="onUpdate"/>
    <aside :class="active ? 'sidebar' : 'd-none' ">
      <h4 class="px-3 text-white">Post</h4>
      
      <ul class="w-100">
        <li>
          <router-link
            to="/articles"
            class="text-white py-2"
          >
            All Articles
          </router-link>
        </li>
        <li>
          <router-link
            to="/articles/create"
            class="text-white py-2"
          >
            New Article
          </router-link>
        </li>
      </ul>
    </aside>
  </template>
  <script>
import Back from '../Back.vue';

  export default{
    props:['active','onUpdate'],
    components: { Back }
}
</script>
  <style>
  .sidebar-deactive{
    width: 0;
    top: 0;
    left: -100%;
    transition: all .4 ease-in-out;

  }
  .sidebar {
    width: 250px;
    background-color: #1c7cd5;
    padding: 0.813rem 0;
    transition: all .4 ease-in-out;
    z-index: 50;
    top: 0;
    left: 0;
    position: sticky;
    min-height: 100dvh;
  }
  @media screen and (max-width: 1024px) {
    .sidebar {
      display: fixed;
    transition: all .4 ease-in-out;

    }
  }
 

  
  ul li a.router-link-exact-active{
    flex : 1;
    background-color: rgba(255, 255, 255, 0.15);
  }
  
  ul li a{
    font-size: 1.125rem;
    transition: all 0.4s ease-in-out;
    cursor: pointer;
    flex: 1;
    display: flex;
    padding-left: 2rem;
  }
 
  
  ul  li a:hover{
    background-color: rgba(255, 255, 255, 0.15);
    transition: all 0.4s ease-in-out;
  }
  </style>
  