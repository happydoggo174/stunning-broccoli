<script setup>
    import { ref,onMounted,useTemplateRef } from 'vue';
    import { get_knowledge_home } from './api';
    import KnowledgeWidget from './KnowledgeWidget.vue';
    import loading from './loading';
    import Menu from './Menu.vue';
    const prop=defineProps({
        knowledge_id:Number
    });
    const data=ref([]);
    const loader=useTemplateRef("loader");
    const loading_obj=new loading();
    let all_loaded=false;
    async function get_knowledge() {
        if(all_loaded){return;}
        await loading_obj.wrap(async()=>{
            const kwd=data.value;
            const last_id=kwd[kwd.length-1]?.id;
            const more=await get_knowledge_home(last_id);
            if(more.length){
                data.value=data.value.concat(more);   
            }else{
                all_loaded=true;
            }
        });
    }
    onMounted(async()=>{
        const options = {
            root: null,
            rootMargin: "0px",
            scrollMargin: "0px",
            threshold: 0.5,
        };
        const observer = new IntersectionObserver(async(e)=>{
        if(!e[0].isIntersecting){return;}
        await get_knowledge();
        }, options);
        observer.observe(loader.value);
    });
</script>
<template>
    <Menu>
        <div style="color: black;margin-left: 14px;margin-right: 14px;" class="column">
            <KnowledgeWidget :category="kwd.category" :title="kwd.title" :id="kwd.id" :author="kwd.author_name"
            :key="kwd.id" :difficulty="kwd.difficulty" v-for="kwd in data" ></KnowledgeWidget>
            <div style="height: 30px;width: 100vw;opacity: 0;" ref="loader"></div>
        </div>
    </Menu>
</template>