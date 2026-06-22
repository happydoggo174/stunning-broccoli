<style>
    #nav-bar{
        height:36px;
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
</style>
<script setup>
    import AuthCorner from './AuthCorner.vue';
    import router from './router';
    function home(){router.push("/");}
</script>
<template>
    <nav id="nav-bar" class="row">
        <div class="row">
            <button class="nav-btn" @click="home">home</button>
            <button class="nav-btn">favorite</button>
        </div>
        <AuthCorner/>
        </nav>
</template>