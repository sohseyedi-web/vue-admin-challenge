<template>
    <header class="customNavbar">
      <div class="d-flex align-items-center">
        <h1 class="mr-3 mb-0" style="font-size: 1.375rem">Arvan Challenge</h1>
        <div>
          <span v-if="username">Welcome {{ username }}</span>
          <span v-else>soheil</span>
        </div>
      </div>
      <div class="d-flex align-items-center" >
        <span class="mr-3 customIcon d-lg-none" @click="onUpdate"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style="width: 30px;height: 30px;">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a7.464 7.464 0 0 1-1.15 3.993m1.989 3.559A11.209 11.209 0 0 0 8.25 10.5a3.75 3.75 0 1 1 7.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 0 1-3.6 9.75m6.633-4.596a18.666 18.666 0 0 1-2.485 5.33" />
        </svg>
        </span>
        <button class="customButton">Logout</button>
      </div>
    </header>
  </template>
  <script>
  import { getCurrentUser } from "../../services/authServices";
  export default {
    props:['onUpdate'],
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
    
  }
  .customIcon{
    cursor: pointer;
    color: #5bc0de;

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
  