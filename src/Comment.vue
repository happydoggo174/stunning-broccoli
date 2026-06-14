<script setup>
    import { get_comment } from '@/api';
    import CommentWidget from './CommentWidget.vue';
    import { ref,onMounted,computed } from 'vue';
    import more from "@/assets/more.svg";
    import less from "@/assets/less.svg";
    const prop=defineProps({
        problem_id:Number,
        comment_count:Number
    });
    const data=ref([]);
    const show_comment=ref(false);
    const more_src=computed(()=>show_comment.value?less:more);
    onMounted(async()=>{
        data.value=await get_comment(prop.problem_id);
    });
    const toggle_comment=()=>show_comment.value=!show_comment.value;
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
</style>
<template>
    <div class="row" style="justify-content: space-between;align-items: center;">
        <span class="comment-banner">comments({{ comment_count }})</span>
        <button class="more-btn" @click="toggle_comment">
            <img :src="more_src" alt="show comments">
        </button>
    </div>
    <div style="display: flex;flex-direction: column;">
        <CommentWidget v-for="comment in data"  v-if="show_comment" :content="comment.content" 
        :profile="comment.profile" :username="comment.username"/>
    </div>
</template>