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
        <li class="py-2">
          <router-link
            to="/articles"
            class="text-white py-2"
          >
            All Articles
          </router-link>
        </li>
        <li class="py-2">
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
  
  ul li {
    font-size: 1.125rem;
    transition: all 0.4s ease-in-out;
    padding-left: 2.2rem;
    cursor: pointer;
    width: 100%;
  }
  
  ul li a{
    flex : 1
  }
  
  ul li a.router-link-exact-active{
    background: #000;
    width: 100%;
  }
  
  ul  li:hover{
    background-color: rgba(255, 255, 255, 0.15);
    transition: all 0.4s ease-in-out;
  }
  </style>
  