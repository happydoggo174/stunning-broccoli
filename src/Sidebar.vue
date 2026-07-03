<script setup>
import add_mini from "@/assets/add_mini.svg";
import router from "./router";
</script>
<style scoped>
    .side-nav-btn{
        padding: 6px;
        border-radius: 12px;
        align-items: center;
    }
</style>
<template>
    <div class="column" style="background-color: white;border-right: 1px solid black;padding: 8px;width: 30vh;">
        <button @click="router.push('/make_problem').then()" class="row side-nav-btn hover-shadow">
            <img :src="add_mini" alt="" style="margin-right: 8px;">post problem
        </button>
    </div>
</template>