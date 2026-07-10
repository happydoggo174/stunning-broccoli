<script setup>
    import { watch,reactive } from 'vue';
    import { get_knowledge_detail } from './api';
    import Menu from './Menu.vue';
    import CategoryLabel from './CategoryLabel.vue';
    import LatexDisplay from './LatexDisplay.vue';
    import { show_profile } from './tool';
    const prop=defineProps({
        id:Number
    });
    const data=reactive({});
    watch(()=>prop.id,async(id)=>{
        try{
            Object.assign(data,await get_knowledge_detail(prop.id));  
        }catch(e){
            console.log(e);
        }   
    },{immediate:true});
</script>
<style scoped>
    .content{
        margin-top: 14px;
        word-wrap: break-word;
    }
    .pbanner{
        margin-top: 24px;
        margin-bottom: 16px;
        font-size: 20px;
        width: 100%;
        border-bottom: 1px solid black;
    }
    .rprob{
        margin-bottom: 8px;
        border-radius: 16px;
        color: black;
        text-decoration: underline;
    }
</style>
<template>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.17.0/dist/katex.min.css" 
    integrity="sha384-vlBdW0r3AcZO/HboRPznQNowvexd3fY8qHOWkBi5q7KGgqJ+F48+DceybYmrVbmB" 
    crossorigin="anonymous">
    <Menu>
        <div class="column" style="color: black;margin-left: 12vw;margin-right: 12vw;margin-top: 12px;">
            <h2 style="font-weight: bold;font-size: 24px;">{{ data.title }}</h2>
            <div class="row" style="align-items: center;" @click="show_profile(data.author_id)">
                <img :src="data.profile" alt="" width="24px" height="24px" style="margin-right: 8px;" class="circle">
                <span>{{ data.author_name }}</span>
            </div>
            <div class="row" style="border-bottom: 1px solid black;padding-bottom: 4px;margin-top: 8px;">
                <CategoryLabel v-for="tag in data.category" :tag="tag"></CategoryLabel>
            </div>
            <LatexDisplay class="content" :content="data.content" :plaintext="data.plain_content"></LatexDisplay>
            <div class="column" v-if="data.related_problem?.length>0">
                <span class="pbanner">practice problem</span>
                <RouterLink :to="`/problem/${prob.id}`" v-for="prob in data.related_problem" class="rprob">
                {{ prob.title }}</RouterLink>
            </div>
        </div>
    </Menu>
</template>