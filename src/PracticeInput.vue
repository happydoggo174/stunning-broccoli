<script setup>
    import delete_img from "@/assets/delete.svg";
    const model=defineModel();
    const emit=defineEmits(['remove',]);
    const prop=defineProps({
        id:Number
    });
</script>
<style scoped>
    input{
        padding: 4px;
        border-radius: 8px;
    }
</style>
<template>
    <div class="row">
        <input type="text" v-model="model" placeholder="paste your problem url here" class="spacer">
        <button class="borderless no-bg" style="margin-left: 8px;" @click="emit('remove',id)">
            <img :src="delete_img" alt="">
        </button>
    </div>
</template>