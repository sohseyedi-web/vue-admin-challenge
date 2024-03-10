<template>
    <header class="customNavbar">
      <div class="d-flex align-items-center">
        <h1 class="mr-3 mb-0" style="font-size: 1.375rem">Arvan Challenge</h1>
        <div>
          <span v-if="username">Welcome {{ username }}</span>
          <span v-else>soheil</span>
        </div>
      </div>
      <button class="customButton">Logout</button>
    </header>
  </template>
  <script>
  import { getCurrentUser } from "../../services/authServices";
  export default {
    data() {
      return {
        username: null,
      };
    },
    methods: {
      async getUserProfile() {
        try {
          const user = await getCurrentUser();
          this.username = user?.user?.username;
        } catch (error) {
          console.log(error);
        }
      },
    },
    mounted() {
      if (!localStorage.getItem("accessToken").length) {
        this.$router.push("/login");
      } else {
        this.getUserProfile();
      }
    },
  };
  </script>
  <style>
  .customNavbar {
    background-color: #373a3c;
    padding: 0.5rem 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    position: sticky;
  }
  .customButton {
    width: 86.7px;
    height: 40px;
    padding: 0.688rem 1.125rem;
    border-radius: 0.25rem;
    border: solid 1px #5bc0de;
    color: #5bc0de;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  </style>
  