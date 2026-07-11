<script setup>
    import { watch,reactive,computed } from 'vue';
    import { get_knowledge_detail } from './api';
    import Menu from './Menu.vue';
    import CategoryLabel from './CategoryLabel.vue';
    import LatexDisplay from './LatexDisplay.vue';
    import { show_profile } from './tool';
    import like from "@/assets/like.svg";
    import dislike from "@/assets/dislike.svg";
    import like_filled from "@/assets/like_filled.svg";
    import dislike_filled from "@/assets/dislike_filled.svg";
    import { isAuthenticated } from './auth';
    import { like_knowledge,dislike_knowledge } from './api';
    import { show_dialog } from './notificationdaemon';
    const prop=defineProps({
        id:Number
    });
    const data=reactive({});
    watch(()=>[prop.id,isAuthenticated.value],async(id)=>{
        try{
            Object.assign(data,await get_knowledge_detail(prop.id));  
        }catch(e){
            console.log(e);
        }   
    },{immediate:true});
    const like_src=computed(()=>{
        return data.reaction==='liked'?like_filled:like;
    });
    const dislike_src=computed(()=>{
        return data.reaction==='disliked'?dislike_filled:dislike;
    });
    function handle_like(){
        if(!isAuthenticated.value){
            show_dialog("error","please login to like");
            return;
        }
        like_knowledge(prop.id).then(()=>{
            if(data.reaction=='disliked'){
                data.dislikes--;
            }
            data.likes++;
            data.reaction='liked';
        });
    }
    function handle_dislike(){
        if(!isAuthenticated.value){
            show_dialog("error","please login to dislike");
            return;
        }
        dislike_knowledge(prop.id).then(()=>{
            if(data.reaction=='liked'){
                data.likes--;
            }
            data.dislikes++;
            data.reaction='disliked';
        });;
    }
</script>
<style scoped>
    .content{
        margin-top: 14px;
        word-wrap: break-word;
    }
    .pbanner{
        margin-top: 24px;
        margin-bottom: 16px;
        font-size: 20px;
        width: 100%;
        border-bottom: 1px solid black;
    }
    .rprob{
        margin-bottom: 8px;
        border-radius: 16px;
        color: black;
        text-decoration: underline;
    }
    .react-wrapper{
        margin-top: 16px;
        border: 1px solid black;
        padding: 4px;
        border-radius: 12px;
    }
    .react-btn{
        border: none;
        background-color: unset;
        border-radius: 10px;
        transition: 0.12s background-color ease-in-out;
    }
    .react-btn:hover{
        background-color: rgb(46, 134, 139);
    }
</style>
<template>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.17.0/dist/katex.min.css" 
    integrity="sha384-vlBdW0r3AcZO/HboRPznQNowvexd3fY8qHOWkBi5q7KGgqJ+F48+DceybYmrVbmB" 
    crossorigin="anonymous">
    <Menu>
        <div class="column" style="color: black;margin-left: 12vw;margin-right: 12vw;margin-top: 12px;">
            <h2 style="font-weight: bold;font-size: 24px;">{{ data.title }}</h2>
            <div class="row" style="align-items: center;" @click="show_profile(data.author_id)">
                <img :src="data.profile" alt="" width="24px" height="24px" style="margin-right: 8px;" class="circle">
                <span>{{ data.author_name }}</span>
            </div>
            <div class="row" style="border-bottom: 1px solid black;padding-bottom: 4px;margin-top: 8px;">
                <CategoryLabel v-for="tag in data.category" :tag="tag"></CategoryLabel>
            </div>
            <LatexDisplay class="content" :content="data.content" :plaintext="data.plain_content"></LatexDisplay>
            <div class="column" v-if="data.related_problem?.length>0">
                <span class="pbanner">practice problem</span>
                <RouterLink :to="`/problem/${prob.id}`" v-for="prob in data.related_problem" class="rprob">
                {{ prob.title }}</RouterLink>
            </div>
            <div class="row">
                <div class="row react-wrapper" v-if="data!==undefined">
                    <button @click="handle_like" class="react-btn">
                        <img :src="like_src">
                    </button>
                    <span style="margin-left: 12px;">{{ data.likes-data.dislikes }}</span>
                    <button style="margin-left: 12px;" @click="handle_dislike" class="react-btn">
                        <img :src="dislike_src" >
                    </button>
                </div>
                <div class="spacer"></div>
            </div>
        </div>
    </Menu>
</template>