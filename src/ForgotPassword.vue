<style >
    .text-center{
        display: block;
        text-align: center;
    }
</style>
<script setup>
    import {ref} from "vue";
    import { show_dialog } from "./notificationdaemon";
    import router from "./router";
    import NavBar from "./NavBar.vue";
    const email=ref("");
    function handle_forgot(){
        const accounts=localStorage.getItem("accounts");
        if(accounts==null){
            show_dialog("error","email not found");
        }
        let found=false;
        JSON.parse(accounts).forEach(usr => {
            if(usr.email==email.value){
                sessionStorage.setItem("currUsr",JSON.stringify(usr));
                show_dialog("successs","account recovered");
                router.push("/");
            }
            found=true;
        });
        if(!found){
            show_dialog("error","email not found");
        }
    }
</script>
<template>
    <NavBar/>
    <div style="display: flex;flex-direction: row;color: black;justify-content: center;">
        <div style="height: 100vh;display: flex;flex-direction: column;justify-content: center;">
            <span class="text-center" style="margin-bottom: 12px;">forgot password</span>
            <div class="row">
                <span>email</span>
                <input type="email" v-model="email">
            </div>
            <button @click="handle_forgot" style="margin-top: 12px;">recover account</button>
        </div>
    </div>
</template>