<script setup>
    const props=defineProps({
        msg:String,
        banner:String
    });
</script>
<style>
    .banner{
        padding: 20px;
        border-radius: 24px;
        display: flex;
        flex-direction: column;
    }
    .row{
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
</style>
<template>
    <div class="banner">
        <div class="row">
            <img v-if="banner" :src="banner">
            <div style="margin-left: 14px;">{{ msg }}</div>
        </div>
        <button>ok</button>
    </div>
</template>