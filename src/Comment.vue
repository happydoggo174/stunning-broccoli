<script setup>
    import { get_comment,make_comment } from '@/api';
    import CommentWidget from './CommentWidget.vue';
    import { ref,onMounted,computed } from 'vue';
    import more from "@/assets/more.svg";
    import less from "@/assets/less.svg";
    import send from "@/assets/send.svg";
    import { show_dialog } from './notificationdaemon';
    import { get_auth_object,isAuthenticated,isLoading } from './auth';
    const prop=defineProps({
        problem_id:Number,
        comment_count:Number
    });
    const data=ref([]);
    const show_comment=ref(false);
    const more_src=computed(()=>show_comment.value?less:more);
    const comment_cnt=ref(prop.comment_count)
    const comment_placeholder=computed(
    ()=>isAuthenticated.value?"your comment here":isLoading.value?"loading...":"please login to comment");
    onMounted(async()=>{
        data.value=await get_comment(prop.problem_id);
    });
    const toggle_comment=()=>show_comment.value=!show_comment.value;
    const comment=ref("");
    let is_commenting=false;
    async function add_comment(content){
        const auth=await get_auth_object();
        comment_cnt.value++;
        const claim=auth.idTokenClaims;
        data.value.push({username:claim.name|| claim.nickname,profile:claim.profile || claim.picture,content:content});
    }
    function validate_comment(content){
        if(isLoading.value){
            show_dialog("error","loading account info,please wait");
            return false;
        }
        if(!isAuthenticated.value){
            show_dialog("error","please login to comment");
            return false;
        }
        if(content.length>250){
            show_dialog("error",`comment too long.${content.length} out of 250 characters used`);
            return false;
        }
        return true;
    }
    async function handle_make_comment(){
        if(is_commenting){return;}
        is_commenting=true;
        try{
            const content=comment.value;
            if(!validate_comment(content)){return;}
            try{
                await make_comment(prop.problem_id,content);
            }catch{
                return show_dialog("error",`error adding comment`);
            }
            comment.value="";
            await add_comment(content);
        }finally{
            is_commenting=false;
        }
    }
    function resize_comment(e){
        const field=e.target;
        field.style.height="auto";
        field.style.height=field.scrollHeight+'px';
    }
</script>
<style scoped>
    .comment-banner{
        font-size: 18px;
        margin-top: 14px;
        justify-content: center;
    }
    .more-btn{
        background-color: unset;
        border-radius: 8px;
        padding: 0px;
    }
    .more-btn:hover{
        background-color: aqua;
    }
    .comment-section{
        padding-left: 14px;
        padding-right: 14px;
    }
    #comment-field{
        flex-grow: 1;
        font-size: 16px;
    }
</style>
<template>
    <div class="row" style="justify-content: space-between;align-items: center;">
        <span class="comment-banner column">comments({{ comment_cnt }})</span>
        <button class="more-btn" @click="toggle_comment">
            <img :src="more_src" alt="show comments">
        </button>
    </div>
    <div class="comment-section column" v-if="show_comment">
        <div class="row" style="width:100%;margin-top: 14px;margin-bottom: 12px;">
            <textarea id="comment-field" :placeholder="comment_placeholder" v-model="comment" 
            :readonly="!isAuthenticated" maxlength="250" @input="resize_comment"></textarea>
            <button style="background-color: green;" @click="handle_make_comment">
                <img :src="send" v-once alt="send comment">
            </button>
        </div>
        <CommentWidget v-for="comment in data" :content="comment.content" 
        :profile="comment.profile" :username="comment.username"/>
    </div>
</template>