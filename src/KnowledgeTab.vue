<script setup>
    import { ref,onMounted } from 'vue';
    import { get_knowledge_home } from './api';
    import KnowledgeWidget from './KnowledgeWidget.vue';
    import Menu from './Menu.vue';
    const prop=defineProps({
        knowledge_id:Number
    });
    const data=ref([]);
    onMounted(async()=>{
        data.value=await get_knowledge_home();
    });
</script>
<template>
    <Menu>
        <div v-for="kwd in data" @click="" style="color: black;margin-left: 14px;margin-right: 14px;" class="column">
            <KnowledgeWidget :category="kwd.category" :title="kwd.title" :id="kwd.id" :author="kwd.author_name"
            :key="kwd.id" :difficulty="kwd.difficulty"></KnowledgeWidget>
        </div>
    </Menu>
</template>