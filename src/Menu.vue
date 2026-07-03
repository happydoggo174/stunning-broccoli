<script setup>
    import {ref} from "vue";
    import NavBar from "./NavBar.vue";
    import Sidebar from "./Sidebar.vue";
    import Footer from "./Footer.vue";
    const is_sidebar=ref(false);
</script>
<style>
    #main{
        width: 100%;
        min-height: calc(100vh - 40px);
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        max-width: none;
    }
</style>
<template>
    <NavBar @menu="is_sidebar=!is_sidebar"/> 
    <div class="row">
        <Sidebar v-if="is_sidebar"/>
        <div id="main">
            <slot></slot>
        </div>
    </div>
    <Footer></Footer>
</template>