<script setup>
import { reactive, watch,ref,computed } from 'vue';
import { get_problem_detail,get_problem_status,like_problem,dislike_problem } from './api.js';
import Loading from './Loading.vue';
import NavBar from './NavBar.vue';
import Solver from './Solver.vue';
import done from "@/assets/done.svg";
import like from "@/assets/like.svg";
import dislike from "@/assets/dislike.svg";
import like_filled from "@/assets/like_filled.svg";
import dislike_filled from "@/assets/dislike_filled.svg";
import done_gray from "@/assets/done_gray.svg";
import { show_dialog } from './notificationdaemon.js';
import { is_problem_completed } from './completion.js';
import Comment from './Comment.vue';
import { isAuthenticated,isLoading } from './auth.js';
    const err=ref(null);
    const resolved=ref(false);
    const prop=defineProps({
        id:Number
    });
    let detail=reactive({});
    let status=reactive({});
    let count=0;
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
            detail.reaction+=status.reaction=="disliked"?2:1;
        }
        status.reaction="liked";
    };
    async function handle_dislike() {
        if(isLoading.value || status.reaction=="disliked"){return;}
        if(!isAuthenticated.value){
            return show_dialog("error","please login to dislike");
        }
        try{
            await dislike_problem(prop.id);
        }catch{
            return show_dialog("error","can't dislike this problem");
        }
        if(detail.reaction){
            detail.reaction-=status.reaction=='liked'?2:1;
        }
        status.reaction="disliked";
    }
    watch(()=>prop.id,async(newid)=>{
        if(newid==undefined){return;}
        const cnt=++count;
        let data=null;
        resolved.value=false;
        err.value=false;
        if(is_problem_completed(prop.id) && status.status!="solved"){
            status.status='solved-offline';
        }
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
    watch(()=>[isAuthenticated,prop.id],async()=>{
        if(!isAuthenticated){return;}
        try{
            const pstatus=await get_problem_status(prop.id);
            Object.assign(status,pstatus);
        }catch{return;}
    },{immediate:true});
    const like_src=computed(()=> status.reaction=='liked'?like_filled:like);
    const dislike_src=computed(()=>status.reaction=='disliked'?dislike_filled:dislike);
    const done_src=computed(()=>{
        if(status.status=='solved-offline'){
            return done_gray;
        }
        if(status.status=='solved'){
            return done;
        }
        return 0;
    });
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
                <div style="justify-content: center;align-items: center;" class="row">
                    <h1 class="problem-tilte">{{detail.title}}</h1>
                    <img :src="done_src" style="margin-left: 12px;" v-if="done_src!=0" 
                    :title="status.status=='solved-offline'?'please login to save progess into your account':'solved'">
                </div>
                <h2 class="problem-author">{{detail.author}}</h2>
                <div style="margin-top: 16px;word-wrap: break-word;">{{detail.description}}</div>
                <div class="row">
                    <div class="row" style="margin-top: 16px;border: 1px solid black;padding: 4px;border-radius: 12px;">
                        <button style="border: none;background-color: unset;" @click="handle_like">
                            <img :src="like_src">
                        </button>
                        <span style="margin-left: 12px;">{{ detail.reaction }}</span>
                        <button style="margin-left: 12px;border: none;background-color: unset;" @click="handle_dislike">
                            <img :src="dislike_src" >
                        </button>
                    </div>
                    <div class="spacer"></div>
                </div>
                <Comment :problem_id="prop.id" :comment_count="detail.comment_count"/>
            </div>
        </div>
        <div id="run-panel">
            <Solver :parameter="detail.parameter" @solved="status.status='solved'" 
            @solved-offline="status.status='solved-offline'":output="detail.output" 
            :problem_id="prop.id" :problem_status="status.status"/>
        </div>
    </div>
</template>