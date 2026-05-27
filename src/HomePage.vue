<script setup>
  import MathObject from './MathObject.vue';
  import NavBar from './NavBar.vue';
  const problems=[
    {title:"easy problem",difficulty:"easy",reaction:3,id:0},
    {title:"medium problem",difficulty:"medium",reaction:-13,id:1},
    {title:"hard problem",difficulty:"hard",reaction:26,id:2}
  ];
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
