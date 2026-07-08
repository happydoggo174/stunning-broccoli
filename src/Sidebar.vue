<script setup>
import add_mini from "@/assets/add_mini.svg";
import router from "./router";
</script>
<style scoped>
    .side-nav-btn{
        padding: 6px;
        border-radius: 12px;
        align-items: center;
        margin-top: 8px;
    }
    img{
        margin-right: 8px;
    }
    .nav-col{
        background-color: white;
        border-right: 1px solid black;
        padding: 8px;
        width: 30vh;
        justify-content: space-between;
    }
</style>
<template>
    <div class="column nav-col">
        <div class="column">  
            <button @click="router.push('/make_problem').then()" class="row side-nav-btn hover-shadow">
                <img :src="add_mini" alt="post problem">post problem
            </button>
            <button @click="router.push('/make_lesson').then()" class="row side-nav-btn hover-shadow">
                <img :src="add_mini" alt="post lesson">post lesson
            </button>
        </div>
    </div>
</template>