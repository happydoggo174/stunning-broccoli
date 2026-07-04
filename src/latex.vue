<script setup>
    import {ref,watch} from "vue";
    import { serialize_expression } from "./tool";
    const input=ref("");
    const output=ref("");
    watch(input,v=>{
        output.value=serialize_expression(v);
    });
</script>
<template>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.17.0/dist/katex.min.css" 
    integrity="sha384-vlBdW0r3AcZO/HboRPznQNowvexd3fY8qHOWkBi5q7KGgqJ+F48+DceybYmrVbmB" 
    crossorigin="anonymous">
    <input type="text" v-model="input">
    <div style="color:black" v-html="output"></div>
</template>