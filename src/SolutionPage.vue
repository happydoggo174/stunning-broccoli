<script setup>
    import { get_solution } from './api';
    import { reactive,onMounted } from 'vue';
    import LatexDisplay from './LatexDisplay.vue';
    import Menu from './Menu.vue';
    const prop=defineProps({
        id:Number
    });
    const detail=reactive({});
    onMounted(async()=>{
        try{
            Object.assign(detail,await get_solution(prop.id));
        }catch{

        }
    });
</script>
<style scoped>
    h1{
        text-align: center;
        margin-top: 8px;
    }
    .header{
        font-size: 17px;
        font-weight: bold;
    }
</style>
<template>
    <Menu>
        <div style="color: black;margin-left: 12px;margin-right: 12px;"> 
            <h1 >{{ detail.title }}</h1>
            <div class="row" style="justify-content: center;margin-top: 12px;">
                <div class="row">
                    <span>{{detail.username}}</span>
                    <img :src="detail.profile" alt="" decoding="async" 
                    class="circle" width="24px" height="24px" style="margin-left: 12px;">
                </div>
            </div>
            <span class="header">explaination</span>
            <LatexDisplay :content="detail.description" :plaintext="detail.is_plain" style="margin-left: 8px;"></LatexDisplay>
            <span class="header">solution</span>
            <div style="display: block;text-align: center;font-size: 18px;">{{ detail.equation }}</div>
        </div>
    </Menu>
</template>