<script setup>
    const prop=defineProps({
        tag:String,
    });
</script>
<style scoped>
    .category{
        margin-left: 8px;
        padding-left: 4px;
        padding-right: 4px;
        border-radius: 12px;
        background-color: rgba(18, 74, 68, 0.36);
    }
</style>
<template>
    <div class="category">
        {{ tag }}
    </div>
</template>