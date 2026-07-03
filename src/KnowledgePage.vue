<script setup>
    import { watch,reactive } from 'vue';
    import { get_knowledge_detail } from './api';
    import Menu from './Menu.vue';
    import CategoryLabel from './CategoryLabel.vue';
    const prop=defineProps({
        id:Number
    });
    const data=reactive({});
    watch(()=>prop.id,async(id)=>{
        console.log(id);
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
        word-break: break-all;
        word-wrap: break-word;
    }
</style>
<template>
    <Menu>
        <div class="column" style="color: black;margin-left: 12vw;margin-right: 12vw;margin-top: 12px;">
            <h2 style="font-weight: bold;font-size: 24px;">{{ data.title }}</h2>
            <div class="row" style="align-items: center;">
                <img :src="data.profile" alt="" width="24px" height="24px" style="margin-right: 8px;" class="circle">
                <span>{{ data.author_name }}</span>
            </div>
            <div class="row" style="border-bottom: 1px solid black;padding-bottom: 4px;margin-top: 8px;">
                <CategoryLabel v-for="tag in data.category" :tag="tag"></CategoryLabel>
            </div>
            <div class="content">{{ data.content }}</div>
        </div>
    </Menu>
</template>