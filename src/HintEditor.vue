<script setup>
    import {ref} from "vue";
    import HintInputWidget from "./HintInputWidget.vue";
    const prop=defineProps(['old_hint']);
    let cnt=0;
    const hints=ref(prop.old_hint.map(v=>{return {idx:cnt++,data:v}}));
    function get(){
        return hints.value.map(v=>v.data);
    }
    defineExpose({get});
    function remove_hint(idx){
        hints.value=hints.value.filter(v=>v.idx!=idx);
    }
</script>
<style scoped>
    .hint-item{
        display: block;
        margin-top: 8px;
        border-radius: 8px;
        width: 100%;
        font-size: 16px;
        border: none;
    }
    .hint-item:hover{
        border: 1px solid black;
    }
</style>
<template>
    <HintInputWidget v-for="h in hints" v-model="h.data" style="margin-top: 8px;" @remove="remove_hint" 
    :idx="h.idx" :key="h.idx"></HintInputWidget>
</template>