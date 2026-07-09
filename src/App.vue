<!-- src/App.vue -->
<script setup>
    import Overlay from './Overlay.vue'
</script>
<style>
    .row{display: flex;flex-direction: row;}
    .spacer{flex-grow: 1;}
    .column{display: flex;flex-direction: column;}
    .hover-shadow:hover{box-shadow: -2px 1px 4px 1px;}
    .circle{border-radius: 50%;}
    .borderless{border: unset;}
    .no-bg{background-color: unset;}
    .text-center{display: block;text-align: center;}
</style>
<template>
    <Overlay/>
    <router-view /> 
</template>