<script setup>
    import { computed } from 'vue';
    import done from "@/assets/done.svg";
    import fail from "@/assets/fail.svg";
    const param=defineProps({
        text:String,
        test_status:String
    });
    const status=computed(()=>{
        if(param.test_status=="pass"){return done;}
        if(param.test_status=='fail'){return fail;}
        return "";
    });
</script>
<style>
    .sample-item{
        display: flex;
        flex-direction: row;
        text-align: center;
        margin-top: 8px;
        background-color: white;
        border-radius: 12px;
        padding: 6px;
    }
</style>
<template>
    <div class="sample-item">
        <div style="display: flex;flex-direction:row;justify-content: center;flex-grow: 1;">
            <span>{{ text }}</span>
        </div>
        <img :src="status">
    </div>
</template>