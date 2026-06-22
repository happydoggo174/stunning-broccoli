<!-- src/App.vue -->
<script setup>
    import Overlay from './Overlay.vue'
</script>
<style>
    .row{display: flex;flex-direction: row;}
    .spacer{flex-grow: 1;}
    .column{display: flex;flex-direction: column;}
</style>
<template>
    <Overlay/>
    <router-view /> 
</template>