<script setup>
import { reactive, watch,ref,computed,useTemplateRef } from 'vue';
import { get_problem_detail,get_problem_status,like_problem,dislike_problem,remove_problem } from './api.js';
import Loading from './Loading.vue';
import Menu from './Menu.vue';
import Solver from './Solver.vue';
import done from "@/assets/done.svg";
import like from "@/assets/like.svg";
import dislike from "@/assets/dislike.svg";
import like_filled from "@/assets/like_filled.svg";
import dislike_filled from "@/assets/dislike_filled.svg";
import done_gray from "@/assets/done_gray.svg";
import delete_img from "@/assets/delete.svg";
import { show_dialog,show_confirm } from './notificationdaemon.js';
import { is_problem_completed } from './completion.js';
import Comment from './Comment.vue';
import { isAuthenticated,isLoading,uid } from './auth.js';
import options from "@/assets/options.svg";
import router from "./router"
import HintWidget from './HintWidget.vue';
import {renderToString} from "katex";
import dompurify from 'dompurify';
import { serialize_expression,html } from './tool.js';
    const err=ref(null);
    const resolved=ref(false);
    const prop=defineProps({
        id:Number
    });
    const show_menu=ref(false);
    let detail=reactive({});
    let status=reactive({});
    const display=ref([]);
    const description=ref("");
    const description_tag=useTemplateRef("description");
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
        if(detail.reaction!=undefined){
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
        if(detail.reaction!=undefined){
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
        try{
            description.value=dompurify.sanitize(serialize_expression(detail.description),
            {
                ADD_TAGS: ['math', 'annotation', 'semantics', 'mtext', 'mn', 'mo', 'mi', 'mspace', 'mover', 'elements'],
                ADD_ATTR: ['target'],
            });
        }catch(e){
            description.value=html`${detail.description}`;
        }
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
    function delete_problem(){
        show_confirm("warning",`are you sure you want to delete problem ${detail.title}?`,r=>{
            if(!r){return;}
            remove_problem(prop.id).then(()=>{router.push('/').then()},
            ()=>{show_dialog('error','unable to remove problem')});
        });
    }
    const solved_title=computed(()=>
    status.status=='solved-offline'?'please login to save progess into your account':'solved');
</script>
<style scoped>
    @import "./css/index.css";
    @import "./css/problem_detail.css";
</style>
<template>
    <Menu>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.17.0/dist/katex.min.css" 
        integrity="sha384-vlBdW0r3AcZO/HboRPznQNowvexd3fY8qHOWkBi5q7KGgqJ+F48+DceybYmrVbmB" 
        crossorigin="anonymous">
        <Loading v-if="!resolved" :resolved="resolved" :err="err"/>
        <div id="top-panel" v-else>
            <div id="info-panel">
                <div id="info-padding">
                    <div class="row" style="justify-content: space-between;">
                        <div></div>
                        <div style="justify-content: center;align-items: center;" class="row">
                            <h1 class="problem-tilte">{{detail.title}}</h1>
                            <img :src="done_src" style="margin-left: 12px;" v-if="done_src!=0" :title="solved_title">
                        </div>
                        <div class="row" style="position: relative;">    
                            <div class="menu column" v-if="show_menu && uid==detail.author_id">
                                <button class="delete-btn row" @click="delete_problem">
                                    remove problem
                                    <img :src="delete_img" alt="">   
                                </button>
                            </div>
                            <button class="options-btn" v-if="isAuthenticated" @click="show_menu=!show_menu">
                                <img :src="options" alt="more option">
                            </button>
                        </div>
                    </div>
                    <div class="row" style="justify-content: center;align-items: center;">
                        <h2 class="problem-author">{{detail.author}}</h2>
                        <img :src="detail.profile" alt="author profile" 
                        width="24px" height="24px" class="author-profile">
                    </div>
                    <div style="margin-top: 16px;word-wrap: break-word;overflow-x:auto;" v-html="description"></div>
                    <div class="row">
                        <div class="row react-wrapper">
                            <button @click="handle_like" class="react-btn">
                                <img :src="like_src">
                            </button>
                            <span style="margin-left: 12px;">{{ detail.reaction }}</span>
                            <button style="margin-left: 12px;" @click="handle_dislike" class="react-btn">
                                <img :src="dislike_src" >
                            </button>
                        </div>
                        <div class="spacer"></div>
                    </div>
                    <HintWidget :hint="detail.hint"></HintWidget>
                    <Comment :problem_id="prop.id" :comment_count="detail.comment_count"/>
                </div>
            </div>
            <div id="run-panel">
                <Solver :parameter="detail.parameter" @solved="status.status='solved'" 
                @solved-offline="status.status='solved-offline'":output="detail.output" 
                :problem_id="prop.id" :problem_status="status.status" :example_name="detail.display_name"/>
            </div>
        </div>
    </Menu>
</template>