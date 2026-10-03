<script setup>
import { reactive, watch,ref,computed,useTemplateRef} from 'vue';
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
import LatexDisplay from './LatexDisplay.vue';
import { show_profile } from './tool.js';
import "katex/dist/katex.min.css";
import loading from "./loading.js";
import SolutionList from './SolutionList.vue';
import edit from "@/assets/edit.svg";
import DialogBackdrop from './DialogBackdrop.vue';
    const loader=reactive(new loading());
    const prop=defineProps({
        id:Number
    });
    const show_menu=ref(false);
    const page=ref(0);
    const detail=reactive({});
    const status=reactive({});
    const show_done=ref(false);
    const solver=useTemplateRef("solver");
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
        if(detail.likes!=undefined){
            detail.likes++;
            if(status.reaction=='disliked'){
                detail.dislikes--;
            }
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
        if(detail.dislikes!=undefined){
            detail.dislikes++;
            if(status.reaction=='liked'){
                detail.likes--;
            }
        }
        status.reaction="disliked";
    }
    watch(()=>prop.id,async(newid)=>{
        if(newid==undefined){return;}
        await loader.wrap(async()=>{    
            const cnt=++count;
            let data=null;
            if(is_problem_completed(prop.id) && status.status!="solved"){
                status.status='solved-offline';
            }
            try{
                data=await get_problem_detail(newid);
            }catch{
                throw "failed to load problem";
            }
            if(cnt!=count || data==null){return;}
            Object.assign(detail,data);
        });
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
    function handle_solve(){
        show_done.value=true;
        status.status='solved';
    }
    function handle_offline_solve(){
        status.status='solved-offline';
    }
    async function post_solution() {
        localStorage.setItem('solution-data',JSON.stringify({
            id:prop.id,
            expr:solver.value.get_expr()
        }));
        await router.push(`/post/solution/${prop.id}`);
    }
</script>
<style scoped>
    @import "./css/index.css";
    @import "./css/problem_detail.css";
</style>
<template>
    <DialogBackdrop v-if="show_done">
        <div style="background-color: white;color: black;padding: 16px;border-radius: 12px;" class="column">
            <div class="row">
                <h2 style="color: green;">problem solved</h2>
                <img class="circle" :src="done" alt="" style="margin-left: 8px;">
            </div>
            <div style="margin-top: 8px;display: grid;grid-template-columns: repeat(2,1fr);">
                <button class="solved-btn spacer" style="margin-right: 8px;" @click="post_solution">post solution</button>
                <button class="solved-btn spacer" @click="show_done=false">ok</button>
            </div>
        </div>
    </DialogBackdrop>
    <Menu>
        <Loading :resolved="loader.resolved" :err="loader.err"/>
        <div id="top-panel" v-if="loader.resolved && !loader.err">
            <div id="info-panel">
                <div class="row tab-bar">
                    <button class="tab-btn" :class="!page?'underline':''" style="margin-left: 16px;" 
                    @click="page=0">challenge</button>
                    <button class="tab-btn" :class="page?'underline':''" @click="page=1">solution</button>
                </div>
                <div id="info-padding"  v-show="!page">
                    <div class="row" style="justify-content: space-between;">
                        <div></div>
                        <div style="justify-content: center;align-items: center;" class="row">
                            <h1 class="problem-tilte">{{detail.title}}</h1>
                            <img :src="done_src" style="margin-left: 12px;" v-if="done_src!=0" :title="solved_title">
                        </div>
                        <div class="row" style="position: relative;">    
                            <div class="menu column" v-if="show_menu && uid==detail.author_id">
                                <button class="delete-btn row" @click="router.push(`/edit/problem/${parseInt(id)}`)">
                                    <img :src="edit" alt="" style="margin-right: 4px;">   
                                    edit problem
                                </button>
                                <button class="delete-btn row" @click="delete_problem">
                                    <img :src="delete_img" alt="" style="margin-right: 4px;">   
                                    remove problem
                                </button>
                            </div>
                            <button :class="[uid==detail.author_id?'options-btn':'blocked','icon-btn']" 
                            v-if="isAuthenticated" @click="show_menu=!show_menu" :disabled="uid!=detail.author_id" 
                            :title="uid==detail.author_id?'more option':'only for author'">
                                <img :src="options" alt="more option">
                            </button>
                        </div>
                    </div>
                    <div class="row author-row" @click="show_profile(detail.author_id)">
                        <h2 class="problem-author">{{detail.author}}</h2>
                        <img :src="detail.profile" alt="author profile" 
                        width="24px" height="24px" class="author-profile">
                    </div>
                    <LatexDisplay class="description" :content="detail.description" :plaintext="detail.plain_desc">
                    </LatexDisplay>
                    <div class="row">
                        <div class="row react-wrapper">
                            <div class="row" style="padding-right:6px;border-right: 1px solid black;">
                                <button @click="handle_like" class="react-btn">
                                    <img :src="like_src">
                                </button>
                                <span style="margin-left: 12px;">{{ detail.likes }}</span>
                            </div>
                            <button style="margin-left: 6px;" @click="handle_dislike" class="react-btn">
                                <img :src="dislike_src" >
                            </button>
                            <span style="margin-left: 12px;">{{ detail.dislikes }}</span>
                        </div>
                        <div class="spacer"></div>
                    </div>
                    <HintWidget :hint="detail.hint"></HintWidget>
                    <Comment :problem_id="prop.id" :comment_count="detail.comment_count"/>
                </div>
                <SolutionList :problem_id="prop.id" :shown="page==1" v-show="page==1"></SolutionList>
            </div>
            <div id="run-panel">
                <Solver :parameter="detail.parameter" @solved="handle_solve" 
                @solved-offline="handle_offline_solve":output="detail.output" 
                :problem_id="prop.id" :problem_status="status.status" :example_name="detail.display_name" 
                ref="solver"/>
            </div>
        </div>
    </Menu>
</template>