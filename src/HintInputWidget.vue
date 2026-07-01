<script setup>
    import delete_svg from "@/assets/delete.svg";
    import { ref,watch,useTemplateRef } from "vue";
    const prop=defineProps({
        idx:Number
    });
    const content=ref("");
    const emits=defineEmits(["remove","update"]);
    /**
     * 
     * @param {InputEvent} e
     */
    function handle_input(e){
        emits("update",prop.idx,content.value);
    }
    watch(content,handle_input);
    const name_field=useTemplateRef("name-field");
    function resize_field(){
        const field=name_field.value;
        field.style.height="auto";
        field.style.height=`${field.scrollHeight}px`;
    }
</script>
<style scoped>
    .hint-item{
        color: black;
        margin-left: 12px;
        font-size: 18px;
        border: 1px solid black;
        align-items: center;
        display: flex;
        padding: 4px;
        border-radius: 8px;
        word-break: normal;
        word-wrap: break-word;
    }
    .hint-content{
        padding: 4px;
        background-color: unset;
        border: unset;
        width: 60vw;
        font-size: 18px;
        resize: none;
    }
    .hint-content:hover{
        border: 1px solid black;
    }
</style>
<template>
    <div class="hint-item row">
        <textarea type="text" class="hint-content spacer" placeholder="your hint text here" v-model="content" 
        ref="name-field" @input="resize_field"></textarea>
        <button style="margin-left: 8px;border: none" @click="emits('remove',idx)">
            <img :src="delete_svg" alt="remove" v-once >
        </button>
    </div>
</template>