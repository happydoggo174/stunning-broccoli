<script setup>
  import { onMounted,ref } from 'vue';
  import MathObject from './MathObject.vue';
  import NavBar from './NavBar.vue';
  import { get_problems } from './api.js';
  const problems=ref([]);
  onMounted(async()=>{
    problems.value=await get_problems();
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
