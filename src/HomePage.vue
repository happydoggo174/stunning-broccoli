<script setup>
  import { onMounted,ref } from 'vue';
  import MathObject from './MathObject.vue';
  import NavBar from './NavBar.vue';
  import { get_problems } from './api.js';
  import { show_dialog } from './notificationdaemon';
  const problems=ref([]);
  onMounted(async()=>{
    try{
      problems.value=await get_problems();
    }catch{
      show_dialog("error","error loading home page");
    }
  });
</script>
<style>
  @import './index.css';
</style>
<template>
  <NavBar/>
  <MathObject
    v-for="prob in problems"
    :key="prob.id"
    :title="prob.title"
    :difficulty="prob.difficulty"
    :reaction="prob.reaction"
    :id="prob.id" 
  />
</template>
