<script setup>
    import { get_comment,make_comment } from '@/api';
    import CommentWidget from './CommentWidget.vue';
    import { ref,onMounted,computed } from 'vue';
    import more from "@/assets/more.svg";
    import less from "@/assets/less.svg";
    import send from "@/assets/send.svg";
    import { show_dialog } from './notificationdaemon';
    import { useAuth0 } from '@auth0/auth0-vue';
    const prop=defineProps({
        problem_id:Number,
        comment_count:Number
    });
    const data=ref([]);
    const show_comment=ref(false);
    const more_src=computed(()=>show_comment.value?less:more);
    const comment_placeholder=computed(
    ()=>auth.isAuthenticated.value?"your comment here":auth.isLoading.value?"loading...":"please login to comment");
    onMounted(async()=>{
        data.value=await get_comment(prop.problem_id);
    });
    const toggle_comment=()=>show_comment.value=!show_comment.value;
    const comment=ref("");
    let is_commenting=false;
    const auth=useAuth0();
    function add_comment(content){
        prop.comment_count++;
        const claim=auth.idTokenClaims.value;
        data.value.push({username:claim.name|| claim.nickname,profile:claim.profile,content:content});
    }
    function validate_comment(content){
        if(auth.isLoading.value){
            show_dialog("error","loading account info,please wait");
            return false;
        }
        if(!auth.isAuthenticated.value){
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
            add_comment(content);
        }finally{
            is_commenting=false;
        }
    }
</script>
<style scoped>
    .comment-banner{
        font-size: 18px;
        margin-top: 14px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .more-btn{
        background-color: unset;
        border-radius: 8px;
        padding: 0px;
        &:hover{
            background-color: aqua;
        }
    }
    .comment-section{
        display: flex;
        flex-direction: column;
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
        <span class="comment-banner">comments({{ comment_count }})</span>
        <button class="more-btn" @click="toggle_comment">
            <img :src="more_src" alt="show comments">
        </button>
    </div>
    <div class="comment-section" v-if="show_comment">
        <div class="row" style="width:100%;margin-top: 14px;margin-bottom: 12px;">
            <textarea id="comment-field" :placeholder="comment_placeholder" v-model="comment" 
            :readonly="!auth.isAuthenticated.value" maxlength="250"></textarea>
            <button style="background-color: green;" @click="handle_make_comment">
                <img :src="send" alt="send comment">
            </button>
        </div>
        <CommentWidget v-for="comment in data" :content="comment.content" 
        :profile="comment.profile" :username="comment.username"/>
    </div>
</template>