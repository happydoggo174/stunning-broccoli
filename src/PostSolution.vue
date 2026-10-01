<script setup>
    import Menu from './Menu.vue';
    import { post_solution } from './api';
    import { show_dialog } from './notificationdaemon.js';
    import { ref,onMounted } from 'vue';
    import router from "./router";
    import { get_problem_detail } from './api';
    const prop=defineProps({
        id:Number,
    });
    const title=ref("");
    const descripion=ref("");
    const equation=ref("");
    const ptitle=ref(null);
    async function post(e){
        e.preventDefault();
        if(title.value.length=='' || title.value.length>150){
            return show_dialog(`error`,`title too long:${title.value.length}/150 characters used`);
        }
        if(descripion.value.length=='' || descripion.value.length>6000){
            return show_dialog(`error`,`description too long:${descripion.value.length}/6000 characters used`);
        }
        try{
            await post_solution(prop.id,title.value,descripion.value,equation.value);
            router.push(`/problem/${prop.id}`);
        }catch{
            show_dialog(`error`,'unable to post solution',true);
        }
    }
    
    function resize_field(e){
        const field=e.target;
        field.style.height="auto";
        field.style.height=`${field.scrollHeight}px`;
    }
    onMounted(async()=>{
        try{
            const detail=await get_problem_detail(prop.id);
            ptitle.value=detail.title;
        }catch{

        }
        const data=localStorage.getItem("solution-data");
        if(data==null || !data.length){
            return;
        }
        try{
            const info=JSON.parse(data);
            if(info.id!=prop.id){
                return;
            }
            equation.value=info.expr;
        }catch{
            return;
        }
    });
</script>
<style scoped>
    form{
        color: black;
        width: 30vw;
        padding: 30px;
        background-color: white;
    }
    .title{
        display: block;
        text-align: center;
        font-size: 18px;
        margin-bottom: 12px;
    }
    .field{
        margin-bottom: 12px;
        padding: 4px;
    }
    .post-btn{
        padding: 8px;
        border-radius: 12px;
        background-color: rgb(127, 223, 240);
    }
    .post-btn:hover{
        background-color: rgb(21, 110, 193);
    }
    .title-inp{
        font-size: 24px;
        width: 30vw;
        text-align: center;
        border: 1px solid rgba(0, 0,0, 0.3);
    }
    .title-inp:hover{
        border: 1px solid black;
    }
</style>
<template>
    <Menu>
        <div style="color: black;margin-left: 12px;margin-right: 12px;" class="column">
            <span class="title">
                {{'post a solution'}}
                <span v-if="ptitle!=null">for 
                    <RouterLink style="color: green;font-weight: bold;" :to="`/problem/${prop.id}`">
                        {{ ptitle }}
                    </RouterLink>
                </span>
            </span>
            <div class="row" style="display: flex;justify-content: center;">
                <input type="text" v-model="title" placeholder="your title here" class="title-inp field">
            </div>
            <input type="text" v-model="equation" placeholder="your equation here" class="field">
            <textarea v-model="descripion" placeholder="explain your solution here" class="field" @input="resize_field">
            </textarea>
            <button class="post-btn" @click="post">post</button>
        </div>
    </Menu>
</template>