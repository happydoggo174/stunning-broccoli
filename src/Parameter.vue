<script setup>
    import close from "@/assets/close.svg";
    const prop=defineProps({
        name:String
    });
</script>
<style scoped>
    .parameter{
        color: black;
        margin-left: 12px;
        font-size: 16px;
    }
</style>
<template>
    <div class="parameter row">
        <span>{{ name }}</span>
        <button style="margin-left: 6px;">
            <img :src="close" alt="remove">
        </button>
    </div>
</template>