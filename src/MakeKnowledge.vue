<script setup>
    import { make_knowledge } from './api';
    import { ref } from 'vue';
    import LatexInput from './LatexInput.vue';
    import Parameter from './Parameter.vue';
    import router from './router';
    import { show_dialog } from './notificationdaemon';
    import add_mini from "@/assets/add_mini.svg";
    import "katex/dist/katex.min.css";
    import Menu from './Menu.vue';
    import PracticeInput from './PracticeInput.vue';
    const title=ref("");
    const content=ref("");
    const level=ref("beginner");
    const category=ref([]);
    const plain_content=ref(false);
    const related_problem=ref([]);
    let idx=0;
    function handle_post(){
        let vaild=true;
        const related_pid=related_problem.value.map(v=>{
            try{
                const part=v.address.split("/")
                const pid=parseInt(part[part.length-1]);
                if(pid===undefined || Number.isNaN(pid)){
                    throw 0;
                }
                return pid;
            }catch(e){
                console.log(e);
                vaild=false;
                show_dialog("error",`invalid challenge url ${v.address}`);
            }
        }).filter(v=>v!==undefined);
        if(!vaild){return;}
        make_knowledge(title.value,content.value,category.value.map(v=>v.content),level.value,plain_content.value,
        related_pid).then(()=>{
            router.push("/");
        },()=>{
            show_dialog("error","unable to post lesson");
        });
    }
    function add_related(){
        related_problem.value.push({"address":"","id":++idx});
    }
    function drop_related(idx){
        related_problem.value=related_problem.value.filter(v=>v.id!=idx);
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
    .practice-col{
        margin-top: 16px;
    }
    .practice-input{
        margin-bottom: 8px;
    }
    .padd-btn{
        margin-left: 8px;
        transform: translateY(0px);
        transition: 0.25s transform ease-in-out;
    }
    .padd-btn:hover{
        transform: translateY(-6px);
    }
</style>
<template>
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
            <LatexInput placeholder="your content here" v-model="content" v-model:is_plain="plain_content"></LatexInput>
            <div class="row diff-row">
                <span class="level-banner">level</span>
                <select v-model="level">
                    <option value="beginner">beginner</option>
                    <option value="intermediate">intermediate</option>
                    <option value="advanced">advanced</option>
                </select>
            </div>
            <div class="column practice-col">
                <div class="row" style="justify-content: center;align-items: center;margin-bottom: 16px;">
                    <span style="position: relative;">practice problem</span>
                    <button class="circle padd-btn" @click="add_related">
                        <img :src="add_mini" alt="" >    
                    </button>
                </div>
                <PracticeInput v-for="rel in related_problem" v-model="rel.address" class="practice-input"
                @remove="drop_related" :id="rel.id" :key="rel.id"></PracticeInput>
                
            </div>
            <button class="post-btn hover-shadow" @click="handle_post">post</button>
        </div>
    </Menu>
</template>