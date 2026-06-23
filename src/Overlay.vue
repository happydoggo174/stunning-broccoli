<script setup>
    import { event_bridge } from './notificationdaemon';
    import error from "@/assets/error.svg";
    function close_dialog(){
        event_bridge.type=undefined;
    }
</script>
<style scoped>
    #notification-outer-padding{
        justify-content: center;
        position: fixed;
        top:0px;
        left: 0px;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.6);
    }
    #notification-inner-padding{
        align-items: center;
        justify-content: center;
    }
    #notification-box{
        z-index: 1;
        background-color: white;
        padding: 20px;
        border-radius: 28px;
        color: black;
    }
    #notification-box .title{
        font-size: 18px;
        display: block;
        text-align: center;
    }
    #notification-box .msg{
        display: flex;
        text-align: center;
        margin-top: 4px;
        margin-bottom: 14px;
    }
    #notification-box button{
        padding: 4px;
    }
</style>
<template>
    <div id="notification-outer-padding" class="row" v-if="event_bridge.type">
        <div id="notification-inner-padding" class="column" v-if="event_bridge.type=='alert'">
            <div id="notification-box" class="column">
                <div class="row" style="justify-content: center;align-items: center;">
                    <img :src="error" width="24px" height="24px" style="margin-right: 6px;" v-show="event_bridge.is_err">
                    <span class="title">{{ event_bridge.title }}</span>
                </div>
                <span class="msg">{{ event_bridge.msg }}</span>
                <button @click="close_dialog">ok</button>
            </div>
        </div>
        <component v-else :is="event_bridge.object" :data="event_bridge.data"/>
    </div>
</template>