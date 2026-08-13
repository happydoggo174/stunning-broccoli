<style scoped>
    .bg{
        width: 100vw;
        height: 100vh;
        z-index: 1;
        position: absolute;
        left: 0;
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
<template>
    <div class="bg">
        <slot></slot>    
    </div>
</template>