<template>
    <aside class="vh-100 sidebar text-white top-0 position-sticky left-0">
      <h4 class="px-3">Post</h4>
      <!-- <ul class="list">
        <router-link to="/" class="py-2 text-white" active-class="">
          <li class="w-100 py-2">All Articles</li>
        </router-link>
        <router-link to="/n" class="py-2 text-white">
          <li class="w-100 py-2">New Article</li>
        </router-link>
      </ul> -->
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
  
  <style>
  .sidebar {
    width: 250px;
    background-color: #1c7cd5;
    padding: 0.813rem 0;
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
  