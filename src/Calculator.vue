<script setup>
    import { watch,ref,useTemplateRef } from 'vue';
    const prop=defineProps({buttons:Array});    
    const expr_field=ref(null);
    const content=ref("");
    const emits=defineEmits(["input"]);
    watch(content,(val)=>{
        emits("input",val);
    });
    function add_key(key){
        const field=expr_field.value;
        const value=content.value;
        if(field.selectionStart){
            const start=field.selectionStart;
            content.value=value.slice(0,start)+key+value.slice(start,value.length);
        }else{
            content.value=value+key;
        }
        expr_field.value.focus();
    }
    function resize_field(){
        const field=expr_field.value;
        field.style.height="auto";
        field.style.height=`${field.scrollHeight}px`;
    }
    const functions=ref(["log","ln","min","sin","cos","tan","asin","acos","atan"]);
</script>
<style scoped>
    #expr-field{
        padding: 4px;
        align-items: baseline;
        font-size: 18px;
        flex-grow: 1;
    }
    #data-key{
        display: grid;
        grid-template-columns: repeat(6,1fr);
    }
    #data-key button{
        padding: 8px;
        font-size: 20px;
    }
    .var-btn{
        flex-grow: 1;
        font-size: 20px;
        padding: 8px;
    }
    .formula-field{
        align-items: center;
    }
    #formula-label{
        color: black;
        font-size: 18px;
    }
</style>
<template>
    <div class="column">
        <div class="formula-field row">
            <span id="formula-label">{{ `f(${buttons.join(",")})=` }}</span>
            <textarea id="expr-field" type="text" v-model="content" autofocus ref="expr_field" @input="resize_field"></textarea>
        </div>    
        <div class="row">
            <button v-for="btn in buttons" @click="add_key(btn)" class="var-btn">{{ btn }}</button>
        </div>
        <div id="data-key">
            <button @click="add_key('+')">+</button>
            <button @click="add_key('-')">-</button>
            <button @click="add_key('*')">*</button>
            <button @click="add_key('/')">/</button>
            <button @click="add_key('^()')">x<sup>y</sup></button>
            <button @click="add_key('√')">√</button>
            <button @click="add_key('!')">!</button>
            <button @click="add_key('%')">%</button>
            <button @click="add_key('||')">|x|</button>
            <button v-for="fn in functions" @click="add_key(fn+'()')" v-once>{{ fn }}</button>
        </div>
    </div>
</template>