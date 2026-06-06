<style>
  .auth-btn{
    padding: 6px;
    border-radius: 10px;
    background-color: aqua;
    margin-right: 8px;
  }
</style>
<template>
  <div v-if="account" style="display: flex;flex-direction: column;" @click="show_info=!show_info;">
    <div style="display: flex;flex-direction: column;justify-content: center;">
      <p style="color: black;margin-right: 12px;">{{ account.username }}</p>
    </div>
    <span v-if="show_info" style="color: black;background-color: white;">
      {{ "email:"+account.email }}
    </span>
  </div>

  <div v-else style="display: flex;flex-direction: row;">

    <button @click="signup" class="auth-btn">Signup</button>

    <button @click="login" class="auth-btn">Login</button>
  </div>
</template>

<script setup lang="ts">
    import { reactive,ref,watch } from 'vue';
    import router from './router';
    const count=ref(0);
    const account=ref(0);
    const show_info=ref(false);
    watch(()=>count,()=>{
      const usr=sessionStorage.getItem("currUsr");
      if(usr){
        account.value=JSON.parse(usr)
      }
    },{immediate:true});
    function signup(){
      count.value++;
      router.push("/register");
    }
    function login(){
      count.value++;
      router.push("/login");
    }
</script>