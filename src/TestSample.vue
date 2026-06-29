<script setup>
    import { computed } from 'vue';
    import delete_img from "@/assets/delete.svg";
    import warning from "@/assets/warning.svg";
    import { serialize_display_row } from './tool';
    const prop=defineProps({
        parameter:Array,
        value:Object
    });
    const msg=computed(()=>{
        let out="f(";
        for(let name of prop.parameter){
            out+=serialize_display_row([prop.value.display_name[name.name]])[0]+",";
        }
        if(out.endsWith(",")){
            out=out.slice(0,out.length-1);
        }
        out+=`)=${prop.value.output}`;
        return out;
    });
    const emits=defineEmits(["delete"]);
</script>
<style>
    .sample-item{
        text-align: center;
        margin-top: 8px;
        background-color: white;
        border-radius: 12px;
        padding: 6px;
        color: black;
    }
</style>
<template>
    <div class="sample-item row">
        <div style="justify-content: center;" class="row spacer">
            <span v-html="msg" class="row" style="align-items: center;"></span>
        </div>
        <img v-if="value.is_err===true" :src="warning" alt="" style="margin-right: 12px;">
        <button @click="emits('delete',value.id)">
            <img :src="delete_img" alt="delete">
        </button>
    </div>
</template>