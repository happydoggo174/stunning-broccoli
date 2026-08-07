<script setup>
  import { onMounted,ref,watch,useTemplateRef,reactive } from 'vue';
  import MathObject from './MathObject.vue';
  import Menu from './Menu.vue';
  import { get_problems,get_favorite_problem,get_completed } from './api.js';
  import Loading from './Loading.vue';
  import filter_img from '@/assets/filter.svg';
  import { sync_completion } from './completion.js';
  import { show_dialog } from './notificationdaemon.js';
  import { isAuthenticated } from './auth.js';
  import loading from "@/loading.js";
  const loaded=reactive(new loading());
  const problems=ref([]);
  const filter=ref('all');
  const loader=useTemplateRef("loader");
  let all_loaded=false;
  onMounted(async()=>{
    watch(()=>isAuthenticated.value,async()=>{
      await loaded.wrap(async()=>{
        try{
          problems.value=await get_problems();
        }catch{
          throw "can't load problem"
        }
        if(isAuthenticated.value){
          sync_completion().then((sync_count)=>{
            if(sync_count){
              show_dialog("done","completed problem saved",false);
            }
          }).catch(()=>{
            show_dialog("error","can't save completed problem");
          });
        }
      });
    });
    async function get_problem(){
      await loaded.wrap(async()=>{
          if(all_loaded){return;}
          const prob=problems.value;
          const last_id=prob[prob.length-1]?.id;
          const filt=filter.value;
          let fn=get_problems;
          if(filt=="favorite"){
            fn=get_favorite_problem;
          }else{
            if(filt=="completed"){
              fn=get_completed;
            }
          }
          fn(last_id).then(more=>{
            if(!more.length){
              all_loaded=true;
            }else{
              problems.value=problems.value.concat(more);
            }
          },e=>console.log(`error:${e}`));
      });
    }
    watch(filter,async()=>{
      problems.value.length=0;
      all_loaded=false;
      await get_problem();
    });
    const options = {
      root: null,
      rootMargin: "0px",
      scrollMargin: "0px",
      threshold: 0.5,
    };
    const observer = new IntersectionObserver(async(e)=>{
      if(!e[0].isIntersecting){return;}
      await get_problem();
    }, options);
    observer.observe(loader.value);
  });
</script>
<style>
  @import './css/index.css';
</style>
<template>
  <Menu>
    <Loading :err="loaded.err" :resolved="loaded.resolved"/>
    <div class="column" v-if="loaded.resolved && !loaded.err" key="problem-column">
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
    <div style="height: 30px;width: 100vw;opacity: 0;" ref="loader"></div>
  </Menu>
</template>
