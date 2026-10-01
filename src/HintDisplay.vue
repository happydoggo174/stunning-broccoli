<script setup>
    import { ref,computed } from 'vue';
    import lightbulb from "@/assets/lightbulb.svg";
    import lightbulb_filled from "@/assets/lightbulb_filled.svg";
    const prop=defineProps({
        enabled:Boolean,
        content:String
    });
    const enabled=ref(prop.enabled);
    const hvr=ref(false);
    const hint_sym=computed(()=>{
        if(enabled.value){
            return hvr.value?lightbulb:lightbulb_filled;
        }
        return hvr.value?lightbulb_filled:lightbulb;
    });
</script>
<style scoped>
    .hidden{
        background-color: black;
        color: black;
        transition: 0.25s background-color ease-in-out;
        width: 100%;
    }
    .shown{
        background-color: unset;
        color: black;
    }
    .no-btn{
        border: none;
        background-color: unset;
    }
</style>
<template>
    <button class="row hover-tint no-btn" style="margin-left: 8px;" @click="enabled=!enabled" @mouseenter="hvr=true" 
    @mouseleave="hvr=false" :title="enabled?'hide hint':'show hint'">
        <img :src="hint_sym" alt="">
        <span style="margin-left: 8px;word-break: break-all;" 
        :class="enabled?'shown':'hidden'">{{ enabled?content:'' }}</span>
    </button>
</template>