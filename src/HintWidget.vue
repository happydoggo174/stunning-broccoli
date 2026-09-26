<script setup>
    import {ref} from "vue";
    import lightbulb from "@/assets/lightbulb.svg";
    import lightbulb_filled from "@/assets/lightbulb_filled.svg";
    import HintDisplay from "./HintDisplay.vue";
    const prop=defineProps({
        hint:Array
    });
    const shown=ref(false);
</script>
<style scoped>
    .toggle-btn{
        text-align: center;
        font-size: 18px;
        align-items: center;
        border: none;
        background-color: unset;
    }
</style>
<template>
    <div class="column" style="margin-top: 12px;" v-if="hint.length">
        <button class="row spacer hover-tint toggle-btn" @click="shown=!shown" style="margin-bottom: 4px;">
            <img :src="shown?lightbulb_filled:lightbulb" alt="hint" style="margin-right: 4px;">
            hints
        </button>
        <HintDisplay v-if="shown" v-for="(hint_text,idx) in hint" :content="hint_text" :enabled="idx==0" 
        style="margin-top: 12px;"></HintDisplay>
    </div>
</template>