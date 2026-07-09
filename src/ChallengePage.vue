<script setup>
  import { onMounted,ref,watch } from 'vue';
  import MathObject from './MathObject.vue';
  import Menu from './Menu.vue';
  import { get_problems,get_favorite_problem,get_completed } from './api.js';
  import Loading from './Loading.vue';
  import filter_img from '@/assets/filter.svg';
  import { sync_completion } from './completion.js';
  import { show_dialog } from './notificationdaemon.js';
  import { isAuthenticated } from './auth.js';
  const err=ref(null);
  const resolved=ref(false);
  const problems=ref([]);
  const filter=ref('all');
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
    watch(filter,async(v)=>{
      try{  
        if(v=='all' || v==''){
          problems.value=(await get_problems());
        }else{
          if(v=='favorite'){
            problems.value=await get_favorite_problem();
          }else{
            if(v=='completed'){
              problems.value=await get_completed();
            }
          }
        }
      }catch{

      }
    });
  });
</script>
<style>
  @import './css/index.css';
</style>
<template>
  <Menu>
    <Loading :err="err" :resolved="resolved"/>
    <div class="column" v-if="resolved && !err">
      <div class="row" style="color: black;margin-left: 14px;margin-top: 12px;" v-if="isAuthenticated">
        <div class="row" style="align-items: center;"><img :src="filter_img" alt="" style="margin-left: 4px;">filter</div>
        <select name="" id="" style="margin-left: 6px;border-radius: 8px;" v-model="filter">
          <option value="all">all</option>
          <option value="favorite">favorite</option>
          <option value="completed">completed</option>
        </select>
      </div>
      <MathObject
        v-for="prob in problems"
        :key="prob.id"
        :title="prob.title"
        :difficulty="prob.difficulty"
        :reaction="prob.reaction"
        :id="prob.id"
        :problem_status="prob.status" 
      />
    </div>
  </Menu>
</template>
