<script setup>
    import { computed, ref } from 'vue';
    import eye_open from "@/assets/eye_open.svg";
    import eye_closed from "@/assets/eye_closed.svg";
    import NavBar from './NavBar.vue';
    import {login} from "./api.js";
    import Banner from './banner.vue';
    let username=ref("");
    let password=ref("");
    let show_password=ref(false);
    const input_type=computed(()=>show_password?"text":"password");
    const btn_icon=computed(()=>show_password?eye_open:eye_closed);
    const btn_alt=computed(()=>show_password?"hide password":"show password");
    function toggle_pasword(){
        show_password.value=!show_password.value;
    }
    async function handle_login(evt){
        evt.preventDefault();
        const name=username.value;
        const pass=password.value;
        if(name=="" || pass==""){     
            return;
        }
        try{
            if(!(await login(name,pass))){
                alert("wrong username or password");
                return;
            }
            window.location.href="/";
        }catch{
            alert("network error");
        }
    }
</script>
<style scoped>
    @import "./index.css";
    .center{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    #login-form{
        background: white;
        padding: 16px;
        border-radius: 24px;
    }
    #login-btn{
        margin-top: 16px;
        padding: 18px;
        border-radius: 22px;
        background-color: green;
        width: 100%;
    }
</style>
<template>
    <NavBar/>
    <div class="center">
        <form id="login-form" @submit="handle_login">
            <input type="text" v-model="username">
            <div class="row">
                <input :type="input_type" v-model="password">
                <button type="button">
                    <img :src="btn_icon" :alt="btn_alt" @click="toggle_pasword">
                </button>
            </div>
            <button id="login-btn">login</button>
        </form>
    </div>
</template>