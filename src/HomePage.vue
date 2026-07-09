<script setup>
    import Menu from './Menu.vue';
    import { get_problems,get_knowledge_home } from './api.js';
    import MathObject from './MathObject.vue';
    import KnowledgeWidget from './KnowledgeWidget.vue';
    import { onMounted,ref } from 'vue';
    import next from "@/assets/next.svg";
    import router from './router/index.js';
    const challenge=ref([]);
    const lesson=ref([]);
    onMounted(async()=>{
        try{
            challenge.value=(await get_problems()).slice(0,2);
            lesson.value=(await get_knowledge_home()).slice(0,2);
        }catch{

        }
    });
</script>
<style scoped>
    .outer-col{
        margin-left: 24px;
        margin-right: 24px;
        color: black;
    }
</style>
<template>
    <Menu>
        <div class="column outer-col">
            <div class="column">
                <div class="row" style="justify-content: space-between;">
                    <div></div>
                    <h2>learn</h2>
                    <button class="borderless no-bg" @click="router.push('/learn')">
                        <img :src="next" alt="more lesson"></button>
                </div>
                <span class="text-center">learn about math and how it's used in the real world</span>
                <KnowledgeWidget :category="kwd.category" :title="kwd.title" :id="kwd.id" :author="kwd.author_name"
                :key="kwd.id" :difficulty="kwd.difficulty" v-for="kwd in lesson" ></KnowledgeWidget>
            </div>
            <div class="column">
                <div class="row" style="justify-content: space-between;">
                    <div></div>
                    <h2>challenge</h2>
                    <button class="borderless no-bg" @click="router.push('/challenge').then()">
                        <img :src="next" alt="more challenge"></button>
                </div>
                <span class="text-center">try out your knowledge in real world application and remember better</span>
                <MathObject
                    v-for="prob in challenge"
                    :key="prob.id"
                    :title="prob.title"
                    :difficulty="prob.difficulty"
                    :reaction="prob.reaction"
                    :id="prob.id"
                    :problem_status="prob.status" 
                />
            </div>
        </div>
    </Menu>
</template>