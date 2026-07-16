<style scoped>
  .auth-btn{
    padding: 6px;
    border-radius: 10px;
    background-color: aqua;
    margin-right: 8px;
  }
  .logout-btn{
    padding: 4px;
    border-radius: 8px;
    border: none;
    background-color: unset;
  }
  .logout-btn:hover{
    background-color: rgba(0,0,0,0.2);
  }
  .menu{
    background-color: white;
    padding: 8px;
    width: 20vw;
    position: absolute;
    right: 0px;
    top: 36px;
  }
</style>
<template>
  <div v-if="isLoading">Loading...</div>
  <div class="column" v-else-if="isAuthenticated && auth!=null" style="position: relative;" ref="profile">
    <div  class="row" @click="toggle_menu">
      <div style="justify-content: center;" class="column">
        <p style="color: black;margin-right: 12px;">{{ auth.user?.nickname }}</p>
      </div>
      <img :src="auth.user?.picture" alt="profile picture" width="32px" height="32px" class="circle">
    </div>
    <div class="column menu" v-if="show_menu" ref="menu">
      <button @click="logout" class="logout-btn">logout</button>
    </div>
  </div>

  <div v-else class="row">
    <p v-if="error_msg" style="color: red;margin-right: 12px;">Error: {{ error_msg }}</p>

    <button @click="signup" class="auth-btn">Signup</button>

    <button @click="login" class="auth-btn">Login</button>
  </div>
</template>

<script setup>
import { get_auth_object,isAuthenticated,isLoading,uid } from './auth';
import { computed,onMounted,ref,useTemplateRef } from 'vue';
import { show_profile } from './tool';
const auth=ref(null);
const show_menu=ref(false);
const menu=useTemplateRef("menu");
const profile=useTemplateRef("profile");
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

const logout = () =>{
  const return_addr=window.location.origin+`/${import.meta.env.VITE_BASE}/`;
  auth.value?.logout({ logoutParams: { returnTo:  return_addr} });
}
function handle_click(e){
  if(menu.value?.contains(e.target) || profile.value?.contains(e.target)){
    
  }else{
    document.removeEventListener('click',handle_click);
    show_menu.value=false;
  }
}
function toggle_menu(){
  if(show_menu.value){
    show_profile(uid.value);
  }else{
    show_menu.value=true;
    document.addEventListener('click',handle_click);
  }
}
</script>