<script setup>
    import NavBar from './NavBar.vue';
    import router from "./router";
    import {ref} from "vue";
    import { show_dialog } from './notificationdaemon';
    const username=ref("");
    const password=ref("");
    const email=ref("");
    function handle_register(e){
        e.preventDefault();
        const accounts=localStorage.getItem("accounts");
        if(accounts==null){
            localStorage.setItem("accounts",
                JSON.stringify([{username:username.value,password:password.value,email:email.value}]));
            sessionStorage.setItem("currUsr",JSON.stringify({username:username.value,email:email.value}));
        }else{
            const acc=JSON.parse(accounts);
            let fail=false;
            acc.forEach(account => {
                if(account.email==email.value){
                    fail=true;
                    show_dialog("error","this email has been taken");
                    return;
                }
            });
            if(!fail){
                acc.push({username:username.value,password:password.value,email:email.value});
            }
            localStorage.setItem("accounts",JSON.stringify(acc));
            sessionStorage.setItem("currUsr",JSON.stringify({username:username.value,email:email.value}));
        }
        router.push("/");
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
            <span style="display: block;text-align: center;font-size: 24px;margin-bottom: 12px;">register</span>
            <form action="" style="display: flex;flex-direction: column;">
                <div class="row" style="margin-bottom: 12px;gap: 8px;">
                    <label for="email-field">email</label>
                    <input type="email"  id="email-field" required  v-model="email">
                </div>
                <div class="row" style="margin-bottom: 12px;gap: 8px;">
                    <label for="username-field">username</label>
                    <input type="text" id="username-field" v-model="username">
                </div>
                <div class="row" style="margin-bottom: 12px;gap: 8px;" >
                    <label for="password-field">password</label>
                    <input type="password" id="password-field" v-model="password">
                </div>
                <button id="login-btn" @click="handle_register">register</button>
            </form>
        </div>
    </div>
</template>