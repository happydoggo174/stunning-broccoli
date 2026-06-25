<script setup>
    const prop=defineProps({
        params:Array,
        correct:Number,
        output:Number|String,
    });
    const emit=defineEmits(["closed"]);
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
        <h2 style="display: block;text-align: center;color: red;">wrong answer</h2>
        <div class="row" style="align-items: center;">
            <span style="width: 80px;">function</span>
            <span class="answer">f({{ params.join(",") }})=</span>
        </div>
        <div class="row" style="align-items: center;">
            <span style="width: 80px;">expected</span>
            <span class="answer">{{ correct }}</span>
        </div>
        <div class="row" style="align-items: center;">
            <span style="width: 80px;">result</span>
            <span class="answer">{{ output }}</span>
        </div>
        <button style="padding: 6px;border-radius: 12px;margin-top: 12px;" @click="emit('closed')">close</button>
    </div>
</template>