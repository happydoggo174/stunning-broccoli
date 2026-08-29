<script setup>
    import { list_solution } from './api';
    import {ref,onMounted,useTemplateRef,watch} from "vue";
    import SolutionWidget from './SolutionWidget.vue';
    import router from './router';
    const prop=defineProps({
        problem_id:Number,
        shown:Boolean
    });
    const solutions=ref([]);
    let observer=null;
    let all_loaded=false;
    const loader_div=useTemplateRef("loader");
    onMounted(()=>{
        watch(()=>prop.shown,v=>{
            if(!observer && v){
                const options = {
                    root: null,
                    rootMargin: "0px",
                    scrollMargin: "0px",
                    threshold: 0.5,
                };
                observer=new IntersectionObserver(async(e)=>{
                    if(!e[0]?.isIntersecting || all_loaded){
                        return;
                    }
                    let last_id=undefined;
                    if(solutions.value.length>0){
                        last_id=solutions.value[solutions.value.length-1].id;
                    }
                    const ext=await list_solution(prop.problem_id,last_id);
                    if(!ext.length){
                        all_loaded=true;
                    }else{
                        solutions.value=solutions.value.concat(ext);
                    }
                },options);
                observer.observe(loader_div.value);
            }
        },{immediate:true});
    });
    function post_solution(){
        router.push(`/post/solution/${prop.problem_id}`);
    }
</script>
<style scoped>
    .post-btn{
        padding: 4px;
        border-radius: 12px;
        background-color: rgb(35, 209, 209);
    }
</style>
<template>
    <div class="column" style="color: black;">
        <div class="row" style="justify-content: space-between;margin-top: 8px;margin-right: 12px;">
            <div></div>
            <button class="post-btn hover-shadow" @click="post_solution">post your solution</button>
        </div>
        <SolutionWidget v-for="sol in solutions" :id="sol.solution_id" :title="sol.title" :author_name="sol.username"
        :author_profile="sol.author_profile" :key="sol.id" v-if="solutions.length"></SolutionWidget>
        <div v-else class="column" style="margin-left: 30%;margin-top: 30%;">
            <span class="text-center">this challenge has no solution yet</span>
            <span class="text-center">try solving it yourself</span>
        </div>
        <div style="width: 100vw;height: 30px;opacity: 0;" ref="loader"></div>
    </div>
</template>
