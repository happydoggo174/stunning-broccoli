<script setup>
    import { event_bridge,push_response } from './notificationdaemon';
    import error from "@/assets/error.svg";
    function close_dialog(){
        event_bridge.type=undefined;
    }
    function accept(){
        push_response(event_bridge.id,true);
        close_dialog();
    }
    function reject(){
        push_response(event_bridge.id,false);
        close_dialog();
    }
</script>
<style scoped>
    #noti-outer{
        z-index: 2;
        justify-content: center;
        position: fixed;
        top:0px;
        left: 0px;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.6);
    }
    .noti-inner{
        align-items: center;
        justify-content: center;
    }
    .noti-box{
        background-color: white;
        padding: 20px;
        border-radius: 28px;
        color: black;
    }
    .noti-box .title{
        font-size: 18px;
        display: block;
        text-align: center;
    }
    .noti-box .msg{
        display: flex;
        text-align: center;
        margin-top: 4px;
        margin-bottom: 14px;
    }
    .noti-box button{
        padding: 4px;
    }
    .yes-btn{
        padding: 4px;
        border-radius: 12px;
        border: 1px solid green;
    }
    .yes-btn:hover{
        background-color: green;
        color: black;
    }
    .no-btn{        
        padding: 4px;
        border-radius: 12px;
        margin-left: 8px;
        border: 1px solid red;
    }
    .no-btn:hover{
        background-color: red;
        color: white;
    }
</style>
<template>
    <div id="noti-outer" class="row" v-if="event_bridge.type">
        <div class="noti-inner column"  v-if="event_bridge.type=='alert'">
            <div class="noti-box column">
                <div class="row" style="justify-content: center;align-items: center;">
                    <img :src="error" width="24px" height="24px" style="margin-right: 6px;" v-show="event_bridge.is_err">
                    <span class="title">{{ event_bridge.title }}</span>
                </div>
                <span class="msg">{{ event_bridge.msg }}</span>
                <button @click="close_dialog">ok</button>
            </div>
        </div>
        <div class="noti-inner column" v-else-if="event_bridge.type='confirm'" >
            <div class="noti-box column">
                <div class="row" style="justify-content: center;align-items: center;">
                    <span class="title">{{ event_bridge.title }}</span>
                </div>
                <span class="msg">{{ event_bridge.msg }}</span>
                <div class="row">
                    <button @click="accept" class="yes-btn spacer">yes</button>
                    <button @click="reject" class="no-btn spacer">no</button>
                </div>
            </div>
        </div>
    </div>
</template>