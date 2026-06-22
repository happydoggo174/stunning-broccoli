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

  <div v-else-if="isAuthenticated && auth!=null" class="row">
    <div style="justify-content: center;" class="column">
      <p style="color: black;margin-right: 12px;">{{ auth.user?.nickname }}</p>
    </div>
    <img :src="auth.user?.picture" alt="profile picture" width="32px" height="32px" style="border-radius: 50%;">
  </div>

  <div v-else class="row">
    <p v-if="error_msg" style="color: red;margin-right: 12px;">Error: {{ error_msg }}</p>

    <button @click="signup" class="auth-btn">Signup</button>

    <button @click="login" class="auth-btn">Login</button>
  </div>
</template>

<script setup lang="ts">
import { get_auth_object,isAuthenticated,isLoading } from './auth';
import { computed,onMounted,ref,Ref } from 'vue';
import { useAuth0 } from '@auth0/auth0-vue';
const auth:Ref<null|ReturnType< typeof useAuth0>>=ref(null);
onMounted(async()=>{
  auth.value=await get_auth_object();
});
const error_msg=computed(()=>{
  if(!isAuthenticated.value && auth.value?.error?.value?.message=="Login required"){
    return null;
  }
  return auth.value?.error?.value?.message;
});
const signup = () =>
  auth.value?.loginWithRedirect({ authorizationParams: { screen_hint: 'signup' } })

const login = () => auth.value?.loginWithRedirect()

const logout = () =>
  auth.value?.logout({ logoutParams: { returnTo: window.location.origin } })
</script>