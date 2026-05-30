<script setup>
    import { computed, defineProps } from 'vue';
    const param=defineProps({
        text:String,
        test_status:String
    });
</script>
<style>
    .sample-item{
        display: block;
        text-align: center;
        margin-top: 8px;
        background-color: white;
        border-radius: 12px;
        padding: 6px;
    }
</style>
<template>
    <div class="sample-item">
        <span>{{ text }}</span>
    </div>
</template>