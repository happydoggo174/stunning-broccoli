<script setup>
import { reactive, watch,ref } from 'vue';
import { get_problem_detail } from './api.js';
import Loading from './Loading.vue';
import NavBar from './NavBar.vue';
import Solver from './Solver.vue';
    const err=ref(null);
    const resolved=ref(false);
    const prop=defineProps({
        id:Number
    });
    let detail=reactive({});
    let count=0;
    watch(()=>prop.id,async(newid)=>{
        if(newid==undefined){return;}
        const cnt=++count;
        let data=null;
        try{
            data=await get_problem_detail(newid);
        }catch{
            if(cnt==count){
                err.value="failed to load problem";
            }
            return;
        }
        if(cnt!=count || data==null){return;}
        Object.assign(detail,data);
        resolved.value=true;
    },{immediate:true});
</script>
<style scoped>
    @import "./index.css";
    @import "./problem_detail.css";
</style>
<template>
    <NavBar/>
    <Loading v-if="detail.title==undefined" :resolved="detail.title!=undefined" :err="err"/>
    <div id="top-panel" v-else>
        <div id="info-panel">
            <div id="info-padding">
                <h1 class="problem-tilte">{{detail.title}}</h1>
                <h2 class="problem-author">{{detail.author}}</h2>
                <div style="margin-top: 16px;word-wrap: break-word;">{{detail.description}}</div>
            </div>
        </div>
        <div id="run-panel">
            <Solver :parameter="detail.parameter" :output="detail.output"/>
        </div>
    </div>
</template>