<script setup>
    const prop=defineProps({
        id:Number,
        title:String,
        author_name:String,
        author_profile:String
    });
</script>
<style scoped>
    .solution{
        border-bottom: 1px solid black;
        padding: 8px;
        transition: 0.2s background-color ease-in-out;
        transition-delay: 84ms;
        border-radius: 8px;
        color: black;
        background-color: rgba(0,0,128,0.1);
    }
    .title{
        font-size: 18px;
    }
</style>
<template>
    <RouterLink :to="`/solution/${id}`" style="margin: 12px;margin-bottom: 0px;">
        <article class="column solution hover-shadow">
            <span class="title">{{ title }}</span>
            <div class="row">
                <img :src="author_profile" alt="">
                <span>{{ author_name }}</span>
            </div>
        </article>
    </RouterLink>
</template>