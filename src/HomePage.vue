<script setup>
  import { onMounted,ref } from 'vue';
  import MathObject from './MathObject.vue';
  import NavBar from './NavBar.vue';
  import { get_problems } from './api.js';
  import Loading from './Loading.vue';
  const err=ref(null);
  const resolved=ref(false);
  const problems=ref([]);
  onMounted(async()=>{
    try{
      problems.value=await get_problems();
    }catch{
      err.value="can't load problem";
      return;
    }
    resolved.value=true;
  });
</script>
<style>
  @import './index.css';
</style>
<template>
  <NavBar/>
  <Loading :err="err" :resolved="resolved"/>
  <MathObject
    v-for="prob in problems"
    :key="prob.id"
    :title="prob.title"
    :difficulty="prob.difficulty"
    :reaction="prob.reaction"
    :id="prob.id" 
  />
</template>
