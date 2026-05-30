<!-- src/App.vue -->
<script setup>
    import Overlay from './Overlay.vue'
</script>
<template>
    <!-- CRITICAL: This is where Vue Router injects your pages -->
    <Overlay/>
    <router-view /> 
</template>