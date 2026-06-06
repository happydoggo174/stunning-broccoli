<script setup>
    import NavBar from './NavBar.vue';
    import router from "./router";
    import {ref} from "vue";
    import { show_dialog } from './notificationdaemon';
    const email=ref("");
    const password=ref("");
    function handle_login(e){
        e.preventDefault();
        const accounts=localStorage.getItem("accounts");
        if(accounts==null){
            show_dialog("error","wrong username or password");
            return;
        }
        let found=false;
        JSON.parse(accounts).forEach(usr=>{
            if(usr.email==email.value && usr.password==password.value){
                sessionStorage.setItem("currUsr",JSON.stringify({username:usr.username,email:usr.email}));
                found=true;
                router.push("/");
            }
        });
        if(!found){
            show_dialog("error","wrong username or password");
        }  
    }
</script>
<style>
    .row{display: flex;flex-direction: row;}
    #login-btn{
    padding: 8px;
    border-radius: 12px;
    background-color: blue;
    transition: 0.2s background-color ease-in-out;
    &:hover{
        background-color: green;
    }
}
</style>
<template>
    <NavBar/>
    <div class="row" style="justify-content: center;color: black;">
        <div style="display: flex;flex-direction: column;justify-content: center;height: 100vh;">
            <span style="display: block;text-align: center;font-size: 24px;margin-bottom: 12px;">login</span>
            <form action="" style="display: flex;flex-direction: column;">
                <div class="row" style="margin-bottom: 12px;gap: 8px;">
                    <label for="email-field">email</label>
                    <input type="email"  id="email-field" v-model="email">
                </div>
                <div class="row" style="margin-bottom: 12px;gap: 8px;" >
                    <label for="password-field">password</label>
                    <input type="password" id="password-field" v-model="password">
                </div>
                <button id="login-btn" @click="handle_login">login</button>
            </form>
        </div>
    </div>
</template>