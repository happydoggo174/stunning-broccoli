<script setup>
    import { ref } from 'vue';
    import edit from "@/assets/edit.svg";
    const model=defineModel();
    const editing=ref(false);
    const hovering=ref(false);
</script>
<style scoped>
    .edit-btn{
        margin-right: 8px;
        padding: 8px;
        border-radius: 50%;
    }
</style>
<template>
    <div class="row" @mouseenter="hovering=true" @mouseleave="hovering=false">
        <button @click="editing=!editing" v-show="hovering" class="edit-btn borderless no-bg hover-shadow">
            <img :src="edit" alt="">
        </button>
        <div v-if="!editing">{{ model }}</div>
        <input type="text" v-model="model" v-else>
    </div>
</template>