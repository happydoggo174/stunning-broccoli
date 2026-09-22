<script setup>
    import {ref} from "vue";
    import HintInputWidget from "./HintInputWidget.vue";
    import add from "@/assets/add_mini.svg";
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
    function add_hint(){
        hints.value.push({idx:cnt++,data:''});
    }
</script>
<style scoped>
    .add-btn{
        align-items: center;
        width: 30%;
        padding: 4px;
        border-radius: 12px;
        margin-top: 16px;
        justify-content: center;
        transition: 0.2s background-color ease-in-out;
    }
    .add-btn:hover{
        background-color: rgb(161, 194, 207);
    }
</style>
<template>
    <HintInputWidget v-for="h in hints" v-model="h.data" style="margin-top: 8px;" @remove="remove_hint" 
    :idx="h.idx" :key="h.idx"></HintInputWidget>
    <div class="row" style="justify-content: center;">
        <button @click="add_hint" class="row add-btn hover-shadow">
            <img :src="add" alt="" style="margin-right: 8px;">
            add hint
        </button>
    </div>
</template>