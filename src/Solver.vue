<script setup>
    import {ref} from "vue"
    import {calculate,parse} from "./calc";
    let expr=ref("");
    function parse_expr(){
        const exp=expr.value;
        console.log(calculate(exp,{π:Math.PI}));
    }
</script>
<style scoped>
    #expr-field{
        padding: 4px;
        min-height: 40vh;
        align-items: baseline;
        font-size: 18px;
    }
    #submit-btn{
        background-color: blue;
        padding: 8px;
        border-radius: 14px;
        margin-top: 12px;
        margin-left: 12px;
        margin-right: 12px;
        transition: 0.27s ease-in-out background-color;
        &:hover{
            background-color: rgb(0, 217, 255);
        }
    }
</style>
<template>
    <div style="display: flex;flex-direction: column;">    
        <textarea id="expr-field" type="text" v-model="expr" ></textarea>
        <button id="submit-btn" @click="parse_expr">submit</button> 
    </div>
</template>