<style>
    #nav-bar{
        height:40px;
        background-color: rgb(65, 105, 225);
        padding-top: 4px;
        padding-bottom: 4px;
        padding-right: 8px;
        justify-content: space-between;
    }
    .nav-btn{
        padding: 4px;
        border-radius: 8px;
        margin-left: 8px;
        border: none;
        background-color: unset;
        color: white;
        font-size: 16px;
        align-items: center;
        display: flex;
    }
    .nav-btn:hover{
        box-shadow: -2px 2px 16px 3px;
        background-color: rgb(12, 138, 235);
    }
    #profile-btn{
        border-radius: 50%;
        width: 30px;
        height: 30px;
        margin-left: 8px;
    }
    #main-search-row{
        margin-left: 18px;
        margin-right: 18px;
        position: relative;
        background-color: white;
        border-radius: 12px;
    }
    #main-search-bar{
        border: none;
        border-radius: 12px;
        font-size: 18px;
    }
    #main-search-bar:focus,#main-search-bar:focus-visible{
        border: none;
        outline: 0px solid white !important;
    }
</style>
<script setup>
    import AuthCorner from './AuthCorner.vue';
    import router from './router';
    import menu_thick from "@/assets/menu_thick.svg";
    import search from '@/assets/search.svg';
    import { isAuthenticated } from './auth.js';
    import { ref } from 'vue';
    const query=ref("");
    const emit=defineEmits(["menu"]);
    async function home(){router.push("/").then();}
    async function learn(){router.push("/learn").then();}
    function handle_search(){
        if(query.value=="" || 1==1){return;}
        router.push(`/search/${encodeURIComponent(query.value)}`).then();
    }
</script>
<template>
    <nav id="nav-bar" class="row">
        <div class="row">
            <button class="nav-btn" @click="emit('menu')" v-if="isAuthenticated">
                <img :src="menu_thick" alt="menu">
            </button>
            <button class="nav-btn" @click="home">home</button>
            <button class="nav-btn" @click="learn">learn</button>
        </div>
        <div class="row spacer" id="main-search-row" @keypress.enter="handle_search">
            <img :src="search" alt="">
            <input type="text" class="spacer"  placeholder="search..." id="main-search-bar" v-model="query">
        </div>
        <AuthCorner/>
        </nav>
</template>