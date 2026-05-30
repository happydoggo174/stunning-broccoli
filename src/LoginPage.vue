<script setup>
    import { computed, ref } from 'vue';
    import eye_open from "@/assets/eye_open.svg";
    import eye_closed from "@/assets/eye_closed.svg";
    import NavBar from './NavBar.vue';
    import {login} from "./api.js";
    import Banner from './Banner.vue';
    let username=ref("");
    let password=ref("");
    let show_password=ref(false);
    const input_type=computed(()=>show_password?"text":"password");
    const btn_icon=computed(()=>show_password?eye_open:eye_closed);
    const btn_alt=computed(()=>show_password?"hide password":"show password");
    function toggle_password(){
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
        height: 100%;
    }
    #login-form{
        background: white;
        padding: 16px;
        border-radius: 24px;
        display: flex;
        flex-direction: column;
    }
    #login-btn{
        margin-top: 16px;
        padding: 18px;
        border-radius: 22px;
        background-color: green;
        width: 100%;
    }
    .center-item{
        display: flex;
        flex-direction: column;
        align-items: center;
        height: calc(100vh-24px);
    }
    #username-field{
        margin-bottom: 12px;
    }
    #name-label{
        color: black;
        margin-right: 8px;
    }
    #password-label{
        color: black;
        margin-right: 8px;
    }
</style>
<template>
    <NavBar/>
    <div class="center">
        <div class="center-item">
            <form id="login-form" @submit="handle_login">
                <div class="row">
                    <label for="username-field" id="name-label">username</label>
                    <input type="text" v-model="username" id="username-field">
                </div>
                <div class="row">
                    <label for="password-field" id="password-label">password</label>
                    <input :type="input_type" v-model="password" id="password-field">
                    <button type="button">
                        <img :src="btn_icon" :alt="btn_alt" @click="toggle_password">
                    </button>
                </div>
                <button id="login-btn">login</button>
            </form>
        </div>
    </div>
</template>