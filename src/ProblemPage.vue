<script setup>
import { reactive, watch } from 'vue';
import { get_problem_detail } from './api.js';
import NavBar from './NavBar.vue';
import Solver from './Solver.vue';
    const prop=defineProps({
        id:Number
    });
    let detail=reactive({});
    let count=0;
    watch(()=>prop.id,async(newid)=>{
        if(newid==undefined){return;}
        const cnt=++count;
        const data=await get_problem_detail(newid);
        if(cnt!=count || data==null){return;}
        Object.assign(detail,data);
        
    },{immediate:true});
</script>
<style scoped>
    @import "./index.css";
    @import "./problem_detail.css";
</style>
<template>
    <NavBar/>
    <div v-if="detail.title==undefined" style="color: black;">loading...</div>
    <div id="top-panel" v-else>
        <div id="info-panel">
            <div id="info-padding">
                <h1 class="problem-tilte">{{detail.title}}</h1>
                <h2 class="problem-author">{{detail.author}}</h2>
                <div style="margin-top: 16px;word-wrap: break-word;">{{detail.description}}</div>
            </div>
        </div>
        <div id="run-panel">
            <Solver/>
        </div>
    </div>
</template>