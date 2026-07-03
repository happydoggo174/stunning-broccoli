<script setup>
  import { onMounted,ref,watch } from 'vue';
  import MathObject from './MathObject.vue';
  import Menu from './Menu.vue';
  import { get_search } from './api.js';
  import Loading from './Loading.vue';
  import { sync_completion } from './completion';
  import { show_dialog } from './notificationdaemon';
  import { isAuthenticated } from './auth';
  import close from '@/assets/close.svg';
  const err=ref(null);
  const resolved=ref(false);
  const problems=ref([]);
  const show_banner=ref(true);
  const prop=defineProps({
    query:String
  });
  onMounted(async()=>{
    if(prop.query===undefined || prop.query===null){
        err.value='invalid url';
        return;
    }
    watch(()=>isAuthenticated.value,async()=>{
      resolved.value=false;
      try{
        problems.value=await get_search(prop.query);
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
  @import './css/index.css';
  #search-row{
    margin-top: 12px;
    justify-content: space-between;
    align-items: center;
  }
  #search-header{
    display: block;
    text-align: center;
    color: black;
  }
</style>
<template>
  <Menu>
    <Loading :err="err" :resolved="resolved"/>
    <div class="column" v-if="resolved && !err">
        <div class="row" id="search-row" v-if="show_banner">
          <div></div>
          <h2 id="search-header">search reesult for {{ query }}</h2>
          <button @click="show_banner=false" style="border: none;background-color: unset;">
            <img :src="close" alt="">
          </button>
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
