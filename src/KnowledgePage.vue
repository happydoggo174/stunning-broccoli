<script setup>
    import { watch,reactive,computed,ref } from 'vue';
    import { get_knowledge_detail } from './api';
    import Menu from './Menu.vue';
    import CategoryLabel from './CategoryLabel.vue';
    import LatexDisplay from './LatexDisplay.vue';
    import { show_profile } from './tool';
    import like from "@/assets/like.svg";
    import dislike from "@/assets/dislike.svg";
    import like_filled from "@/assets/like_filled.svg";
    import dislike_filled from "@/assets/dislike_filled.svg";
    import { isAuthenticated,uid } from './auth';
    import { like_knowledge,dislike_knowledge,remove_knowledge } from './api';
    import { show_dialog,show_confirm } from './notificationdaemon';
    import "katex/dist/katex.min.css";
    import options from "@/assets/options.svg";
    import router from './router';
    const prop=defineProps({
        id:Number
    });
    const data=reactive({});
    const show_menu=ref(false);
    watch(()=>[prop.id,isAuthenticated.value],async()=>{
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
            return show_dialog("error","please login to like");
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
            return show_dialog("error","please login to dislike");
        }
        dislike_knowledge(prop.id).then(()=>{
            if(data.reaction=='liked'){
                data.likes--;
            }
            data.dislikes++;
            data.reaction='disliked';
        });
    }
    async function drop_kwd() {
        show_confirm("warning",`are you sure you want to delete lesson ${data.title}`,async r=>{
            if(!r){return;}
            remove_knowledge(prop.id).then(()=>{
                router.push("/");
            },()=>{
                show_dialog("error","can't delete lesson",true);
            });
        });        
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
        margin-bottom: 16px;
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
    <Menu>
        <div class="column" style="color: black;margin-left: 12vw;margin-right: 12vw;margin-top: 12px;">
            <div class="row" style="justify-content: space-between;">
                <h2 style="font-weight: bold;font-size: 24px;">{{ data.title }}</h2>
                <div class="row" v-if="data.author_id==uid">
                    <div v-if="show_menu" style="background-color: white;">
                        <button @click="drop_kwd" class="borderless no-bg hover-shadow" 
                        style="padding: 8px;border-radius: 8px;">delete</button>
                    </div>
                    <button @click="show_menu=!show_menu" class="borderless no-bg">
                        <img :src="options" alt="">
                    </button>
                </div>
            </div>
            <div class="row" style="align-items: center;">
                <div class="row" @click="show_profile(data.author_id)">
                    <img :src="data.profile" alt="" width="24px" height="24px" style="margin-right: 8px;" class="circle">
                    <span>{{ data.author_name }}</span>
                </div>
            </div>
            <div class="row" style="border-bottom: 1px solid black;padding-bottom: 8px;margin-top: 8px;">
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