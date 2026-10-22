<script setup>
    defineProps({
        shortcut:String,
        message:String
    });
</script>
<style scoped>
    .shortcut{
        background-color: black;
        color: white;
        padding: 4px;
        border-radius: 8px;
        padding-left: 8px;
        padding-right: 8px;
        position: absolute;
        right: -80px;
        top: 0;
    }
</style>
<template>
    <div class="column shortcut">
        <span>{{ message }}</span>
        <span style="margin-top: 4px;font-size: 16px;text-align: center;">{{ shortcut }}</span>
    </div>
</template>