<script setup>
    const prop=defineProps({
        username:String,
        profile:String,
        content:String
    });
</script>
<style scoped>
    .comment{
        padding-bottom: 12px;
        padding-top: 12px;
        border-radius: 8px;
    }
</style>
<template>
    <div class="comment">
        <div class="row">
            <img :src="profile" :alt="`profile picture`" width="24px" height="24px" style="border-radius: 50%;">
            <span style="margin-left: 14px;">{{ username }}</span>
        </div>
        <span style="margin-top: 8px;">{{ content }}</span>
    </div>
</template>