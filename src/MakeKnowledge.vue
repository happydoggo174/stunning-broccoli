<script setup>
    import { make_knowledge } from './api';
    import { ref } from 'vue';
    import LatexInput from './LatexInput.vue';
    import Parameter from './Parameter.vue';
    import router from './router';
    import { show_dialog } from './notificationdaemon';
    import add_mini from "@/assets/add_mini.svg";
    import Menu from './Menu.vue';
    const title=ref("");
    const content=ref("");
    const level=ref("beginner");
    const category=ref([]);
    let idx=0;
    function handle_post(){
        make_knowledge(title.value,content.value,category.value.map(v=>v.content),level.value).then(()=>{
            router.push("/");
        },()=>{
            show_dialog("error","unable to post lesson");
        });
    }
</script>
<style scoped>
    .main-column{
        margin: 16px;
        color: black;
    }
    .title-inp{
        display: block;
        text-align: center;
        margin-bottom: 16px;
        font-size: 20px;
        width: min(60vw,200px);
        border: none;
        padding: 4px;
    }
    .title-inp:hover{
        border: 1px solid black;
    }
    .level-banner{
        margin-right: 16px;
    }
    .diff-row{
        margin-top: 16px;
    }
    .categories{
        margin-bottom: 16px;
        align-items: center;
    }
    .post-btn{
        padding: 8px;
        border-radius: 12px;
        margin-top: 32px;
    }
    .title-row{
        justify-content: center;    
    }
    .add-param{
        padding: 4px;
        border-radius: 50%;
        margin-left: 8px;
    }
    .cat-label{
        margin-right: 8px;
    }
</style>
<template>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.17.0/dist/katex.min.css" 
    integrity="sha384-vlBdW0r3AcZO/HboRPznQNowvexd3fY8qHOWkBi5q7KGgqJ+F48+DceybYmrVbmB" 
    crossorigin="anonymous">
    <Menu>  
        <div class="column main-column">
            <div class="row title-row">
                <input type="text" placeholder="your title here" class="title-inp" v-model="title">
            </div>
            <div class="row categories">
                <span class="cat-label">categories</span>
                <Parameter v-for="cat in category" :key="cat.idx" :idx="cat.idx" :name="cat.content" 
                v-model="cat.content" @remove="(idx)=>category=category.filter(v=>v.idx!=idx)"></Parameter>
                <button class="add-param" @click="category.push({'idx':++idx,'name':''})">
                    <img :src="add_mini" alt="">
                </button>
            </div>
            <LatexInput placeholder="your content here" v-model="content"></LatexInput>
            <div class="row diff-row">
                <span class="level-banner">level</span>
                <select v-model="level">
                    <option value="beginner">beginner</option>
                    <option value="intermediate">intermediate</option>
                    <option value="advanced">advanced</option>
                </select>
            </div>
            <button class="post-btn" @click="handle_post">post</button>
        </div>
    </Menu>
</template>