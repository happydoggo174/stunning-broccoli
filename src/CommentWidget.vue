<script setup>
    import options from '@/assets/options.svg';
    import delete_img from '@/assets/delete.svg';
    import { ref } from 'vue';
    import { isAuthenticated,uid } from './auth';
    import { remove_comment } from './api';
    import { show_dialog,show_confirm } from './notificationdaemon';
    import { show_profile } from './tool';
    const prop=defineProps({
        username:String,
        profile:String,
        content:String,
        problem_id:Number,
        cid:Text
    });
    const show_delete=ref(false);
    function handle_delete(){
        show_confirm("warning","are you sure you want to delete this comment",v=>{
            if(!v){return;}
            remove_comment(prop.problem_id).catch(()=>{
                show_dialog("error","can't delete this comment");
            });
        });
    }
</script>
<style scoped>
    .comment{
        padding-bottom: 12px;
        padding-top: 12px;
        border-radius: 8px;
    }
    .more-btn{
        border: none;
        background-color: unset;
        border-radius: 4px;
    }
    .more-btn:hover{
        background-color: rgb(42, 163, 163);
    }
    .delete-btn{
        position: absolute;
        right: 20px;
        padding: 6px;
        border-radius: 4px;
    }
</style>
<template>
    <div class="comment">
        <div class="row" style="justify-content: space-between;">
            <div class="row" @click="show_profile(cid)">      
                <img :src="profile" :alt="`profile picture`" width="24px" height="24px" class="circle">
                <span style="margin-left: 14px;">{{ username }}</span>
            </div>
            <div class="row" style="position: relative;">  
                <button v-if="show_delete" class="delete-btn row" @click="handle_delete">
                    <img :src="delete_img" alt="" style="margin-right: 4px;">
                    delete comment
                </button>  
                <button class="more-btn row" @click="show_delete=!show_delete" v-if="isAuthenticated && uid==cid">
                    <img :src="options" alt="more">
                </button>
            </div>
        </div>
        <span style="margin-top: 8px;">{{ content }}</span>
    </div>
</template>