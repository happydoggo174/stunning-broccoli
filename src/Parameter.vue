<script setup>
    import delete_svg from "@/assets/delete.svg";
    const prop=defineProps({
        name:String,
        idx:Number
    });
    let content=prop.name;
    const emits=defineEmits(["remove","update"]);
    /**
     * 
     * @param {InputEvent} e
     */
    function handle_input(e){
        emits("update",prop.idx,e.target.innerText);
        e.target.focus();
    }
</script>
<style scoped>
    .parameter{
        color: black;
        margin-left: 12px;
        font-size: 18px;
        border: 1px solid black;
        align-items: center;
        display: flex;
        padding: 4px;
        border-radius: 8px;
    }
    .param-name{
        padding: 4px;
    }
    .param-name:hover{
        border: 1px solid black;
    }
</style>
<template>
    <div class="parameter row">
        <div contenteditable="plaintext-only" class="param-name" @input="handle_input">{{ content }}</div>
        <button style="margin-left: 8px;border: none" @click="emits('remove',idx)">
            <img :src="delete_svg" alt="remove" v-once >
        </button>
    </div>
</template>