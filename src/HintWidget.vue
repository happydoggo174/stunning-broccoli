<script setup>
    import {ref} from "vue";
    import next from '@/assets/next.svg';
    import back from '@/assets/back.svg';
    const prop=defineProps({
        hint:Array
    });
    const idx=ref(0);
    const hints=ref(prop.hint.map((v,i)=>{return {text:v,idx:i+1}}));
</script>
<style scoped>
    .hint-btn{
        border: none;
        background-color: unset;
        border-radius: 4px;
    }
</style>
<template>
    <div v-if="hints.length>0" class="row spacer" style="justify-content: space-between;margin-top: 12px;">
        <button @click="()=>{idx--;if(idx<0){idx=hints.length}}" class="hint-btn hover-shadow">
            <img :src="back" alt="" width="24px" height="24px">
        </button>
        <span v-if="!idx" style="display: block;text-align: center;font-size: 18px;">---hints---</span>
        <div v-for="hint_text in hints.filter(h=>h.idx==idx)">
            <span>{{hint_text.text}}</span>
        </div>
        <button @click="idx=(idx+1)%(hint.length+1)" class="hint-btn hover-shadow">
            <img :src="next" width="24px" height="24px">
        </button>
    </div>
</template>