<style>
  .auth-btn{
    padding: 6px;
    border-radius: 10px;
    background-color: aqua;
    margin-right: 8px;
  }
</style>
<template>
  <div v-if="isLoading">Loading...</div>

  <div v-else-if="isAuthenticated && user" style="display: flex;flex-direction: row;">
    <div style="display: flex;flex-direction: column;justify-content: center;">
      <p style="color: black;margin-right: 12px;">{{ user.nickname }}</p>
    </div>
    <img :src="user.picture" alt="profile picture" width="32px" height="32px" style="border-radius: 50%;">
  </div>

  <div v-else style="display: flex;flex-direction: row;">
    <p v-if="error_msg" style="color: red;margin-right: 12px;">Error: {{ error_msg }}</p>

    <button @click="signup" class="auth-btn">Signup</button>

    <button @click="login" class="auth-btn">Login</button>
  </div>
</template>

<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue'
import { computed } from 'vue';

const {
  isLoading,
  isAuthenticated,
  error,
  loginWithRedirect,
  logout: auth0Logout,
  user
} = useAuth0()
const error_msg=computed(()=>{
  if(!isAuthenticated.value && error.value?.message=="Login required"){
    return null;
  }
  return error.value?.message;
});
const signup = () =>
  loginWithRedirect({ authorizationParams: { screen_hint: 'signup' } })

const login = () => loginWithRedirect()

const logout = () =>
  auth0Logout({ logoutParams: { returnTo: window.location.origin } })
</script>