<script setup>
    import { ref } from 'vue';
    const prop=defineProps({
        id:Number
    });
    const name=ref();
    const url=ref();
    const emit=defineEmits(["cancel","add"]);
</script>
<style scoped>
    .outer{
        width: 30vw;
        background-color: white;
        padding: 24px;
        border-radius: 12px;
        color: black;
    }
    .action-row{
        margin-top: 12px;
    }
    button{
        padding: 6px;
        border-radius: 8px;
        margin-left: 12px;
        flex-grow: 1;
    }
    .banner{
        display: block;
        text-align: center;
        margin-bottom: 6px;
        font-size: 18px; 
    }
    .label{
        width: 80px;
    }
    input{
        flex-grow: 1;
    }
    .inp-row{
        margin-top: 12px;
    }
</style>
<template>
    <div class="outer"> 
        <div class="column">
            <span class="banner">add citation</span>
            <div class="row inp-row">
                <span class="label">name</span>
                <input type="text" v-model="name">
            </div>
            <div class="row inp-row">
                <span class="label">url</span>
                <input type="text" v-model="url">
            </div>
            <div class="row action-row">
                <button @click="emit('add',{'name':name,'url':url})">add</button>
                <button @click="emit('cancel')">cancel</button>
            </div>
        </div>
    </div>
</template>