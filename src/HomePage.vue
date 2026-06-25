<script setup>
  import { onMounted,ref,watch } from 'vue';
  import MathObject from './MathObject.vue';
  import Menu from './menu.vue';
  import { get_problems } from './api.js';
  import Loading from './Loading.vue';
  import { sync_completion } from './completion';
  import { show_dialog } from './notificationdaemon';
  import { isAuthenticated } from './auth';
  const err=ref(null);
  const resolved=ref(false);
  const problems=ref([]);
  onMounted(async()=>{
    watch(()=>isAuthenticated.value,async()=>{
      resolved.value=false;
      try{
        problems.value=await get_problems();
      }catch{
        err.value="can't load problem";
        return;
      }
      resolved.value=true;
      if(isAuthenticated.value){
        sync_completion().then((sync_count)=>{
          if(sync_count){
            show_dialog("done","completed problem saved",false);
          }
        }).catch(()=>{
          show_dialog("error","can't save completed problem");
        });
      }
    },{immediate:true});
  });
</script>
<style>
  @import './index.css';
</style>
<template>
  <Menu>
    <Loading :err="err" :resolved="resolved"/>
    <MathObject
      v-for="prob in problems"
      :key="prob.id"
      :title="prob.title"
      :difficulty="prob.difficulty"
      :reaction="prob.reaction"
      :id="prob.id"
      :problem_status="prob.status" 
    />
  </Menu>
</template>
