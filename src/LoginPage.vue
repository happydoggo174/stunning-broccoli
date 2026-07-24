<script setup>
    import { supabase } from './supabase';
    import { show_dialog } from './notificationdaemon';
    import eye_open from "@/assets/eye_open.svg";
    import eye_closed from "@/assets/eye_closed.svg";
    import router from './router';
    import {ref,computed} from "vue";
    import Menu from './Menu.vue';
    const email=ref("");
    const password=ref("");
    const input_type=ref("password");
    async function login(){
        try{
            const {data,error} =await supabase.auth.signInWithPassword({email:email.value,password:password.value});
            if(error){
                show_dialog("error",error.message);
                return;
            }
            router.push("/");
        } catch{
            show_dialog("error","wrong username or password");
        }  
    }
    function toggle_input(){
        if(input_type.value=='password'){
            input_type.value='text';
        }else{
            input_type.value='password';
        }
    }
    const eye_src=computed(()=>(input_type.value=='password'?eye_open:eye_closed));
</script>
<style scoped>
    .box{
        margin-top: 20vh;
        background-color: white;
        padding: 18px;
    }
    .login-btn{
        padding: 4px;
        border-radius: 12px;
        color: white;
        background-color: blue;
        border-radius: 8px;
        transition: 0.25s background-color ease-in-out,0.25s transform ease-in-out;
    }
    .login-btn:hover{
        transform: translateY(-6px);
        background-color: rgb(53, 210, 197);
    }
    .login-banner{
        font-size: 18px;
        color: black;
        margin-bottom: 12px;
    }
    .wrapper{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    .signup-banner{
        margin-top: 8px;
        color: black;
    }
    .signup-banner a{
        color: blue;
    }
    .social-btn{
        margin-bottom: 8px;
        padding: 4px;
        border-radius: 12px;
        background-color: unset;
        border: 1px solid rgba(0, 0, 0, 0.5);
    }
</style>
<template>
    <Menu> 
        <div class="wrapper">     
            <div class="column box">
                <div class="login-banner text-center">login</div>
                <input type="email" v-model="email" placeholder="email" style="padding: 4px;margin-bottom: 8px;">
                <div class="row spacer" style="margin-bottom: 16px;">
                    <input :type="input_type" v-model="password" placeholder="password" class="spacer" style="padding: 4px;">
                    <button @click="toggle_input" class="icon-btn" style="margin-left: 8px;">
                        <img :src="eye_src" alt="">
                    </button>
                </div>
                <button @click="login" class="login-btn">continue</button>
                <span class="signup-banner">don't have an account ?<RouterLink to="/register">sign up</RouterLink></span>
            </div>
        </div>
    </Menu>
</template>