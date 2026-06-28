<script setup>
    import close from "@/assets/close.svg";
    import { computed } from "vue";
    const prop=defineProps({
        params:Array,
        correct:Number,
        output:Number|String,
    });
    const emit=defineEmits(["closed"]);
    const content=computed(()=>`f(${prop.params.join(',')})=`);
</script>
<style scoped>
    .answer{
        background-color: white;
        margin-top: 12px;
        padding: 4px;
        border-radius: 8px;
        flex-grow: 1;
    }
</style>
<template>
    <div class="column" style="color: black;margin-left: 18px;margin-right: 18px;">
        <div class="row" style="justify-content: space-between;align-items: center;">
            <div></div>
            <h2 style="display: block;text-align: center;color: red;">wrong answer</h2>
            <button @click="emit('closed')" style="border: none;background-color: unset;">
                <img :src="close" alt="close">
            </button>
        </div>
        <div class="row" style="align-items: center;">
            <span style="width: 80px;">function</span>
            <span class="answer row" v-html='content' style="align-items: center;"></span>
        </div>
        <div class="row" style="align-items: center;">
            <span style="width: 80px;">expected</span>
            <span class="answer">{{ correct }}</span>
        </div>
        <div class="row" style="align-items: center;">
            <span style="width: 80px;">result</span>
            <span class="answer">{{ output }}</span>
        </div>
    </div>
</template>