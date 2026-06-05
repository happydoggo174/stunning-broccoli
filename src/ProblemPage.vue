<script setup>
import { reactive, watch,ref,computed } from 'vue';
import { get_problem_detail,get_problem_status,like_problem,dislike_problem } from './api.js';
import Loading from './Loading.vue';
import NavBar from './NavBar.vue';
import Solver from './Solver.vue';
import { useAuth0 } from '@auth0/auth0-vue';
import done from "@/assets/done.svg";
import like from "@/assets/like.svg";
import dislike from "@/assets/dislike.svg";
import like_filled from "@/assets/like_filled.svg";
import dislike_filled from "@/assets/dislike_filled.svg";
import { show_dialog } from './notificationdaemon.js';
    const err=ref(null);
    const resolved=ref(false);
    const prop=defineProps({
        id:Number
    });
    let detail=reactive({});
    let status=reactive({});
    let count=0;
    const {isAuthenticated,isLoading}=useAuth0();
    async function handle_like(){
        if(isLoading.value || status.reaction=="liked"){return;}
        if(!isAuthenticated.value){
            return show_dialog("error","please login to like");
        }
        try{
            await like_problem(prop.id);
        }catch{
            show_dialog("error","can't like this problem");
            return;
        }
        if(detail.reaction){
            detail.reaction++;
        }
        status.reaction="liked";
    };
    async function  handle_dislike() {
        if(isLoading.value || status.reaction=="disliked"){return;}
        if(!isAuthenticated.value){
            return show_dialog("error","please login to dislike");
        }
        try{
            await dislike_problem(prop.id);
        }catch{
            show_dialog("error","can't dislike this problem");
            return;
        }
        if(detail.reaction){
            detail.reaction--;
        }
        status.reaction="disliked";
    }
    watch(()=>prop.id,async(newid)=>{
        if(newid==undefined){return;}
        const cnt=++count;
        let data=null;
        resolved.value=false;
        err.value=false;
        try{
            data=await get_problem_detail(newid);
        }catch(e){
            if(cnt==count){
                err.value="failed to load problem";
            }
            return;
        }
        if(cnt!=count || data==null){return;}
        Object.assign(detail,data);
        resolved.value=true;
    },{immediate:true});
    watch(isAuthenticated,async()=>{
        if(!isAuthenticated){return;}
        try{
            const pstatus=await get_problem_status(prop.id);
            Object.assign(status,pstatus);
        }catch{return;}
    },{immediate:true});
    const like_src=computed(()=>{return status.reaction=='liked'?like_filled:like});
    const dislike_src=computed(()=>{return status.reaction=='disliked'?dislike_filled:dislike});
</script>
<style scoped>
    @import "./index.css";
    @import "./problem_detail.css";
</style>
<template>
    <NavBar/>
    <Loading v-if="!resolved" :resolved="resolved" :err="err"/>
    <div id="top-panel" v-else>
        <div id="info-panel">
            <div id="info-padding">
                <div style="display: flex;flex-direction: row;justify-content: center;">
                    <h1 class="problem-tilte">{{detail.title}}</h1>
                    <img :src="done" v-if="status.status=='solved'" style="margin-left: 12px;">
                </div>
                <h2 class="problem-author">{{detail.author}}</h2>
                <div style="margin-top: 16px;word-wrap: break-word;">{{detail.description}}</div>
                <div class="row" style="margin-top: 16px;">
                    <button style="border: none;" @click="handle_like">
                        <img :src="like_src" alt="">
                    </button>
                    <span style="margin-left: 12px;">{{ detail.reaction }}</span>
                    <button style="margin-left: 12px;border: none;" @click="handle_dislike">
                        <img :src="dislike_src" alt="">
                    </button>
                </div>
            </div>
        </div>
        <div id="run-panel">
            <Solver :parameter="detail.parameter" :output="detail.output"/>
        </div>
    </div>
</template>