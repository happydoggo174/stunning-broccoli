<script setup>
    import { event_bridge } from './notificationdaemon';
    function close_dialog(){
        event_bridge.type=undefined;
    }
</script>
<style scoped>
    #notification-outer-padding{
        display: flex; 
        flex-direction: row;
        justify-content: center;
        position: fixed;
        top:0px;
        left: 0px;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.6);
    }
    #notification-inner-padding{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    #notification-box{
        display: flex;
        flex-direction: column;
        z-index: 1;
        background-color: white;
        padding: 20px;
        border-radius: 28px;
        color: black;
        .title{
            font-size: 18px;
            display: block;
            text-align: center;
        }
        .msg{
            display: flex;
            text-align: center;
            margin-top: 4px;
            margin-bottom: 14px;
        }
        button{
            padding: 4px;
        }
    }
</style>
<template>
    <div id="notification-outer-padding" v-if="event_bridge.type">
        <div id="notification-inner-padding" v-if="event_bridge.type=='alert'">
            <div id="notification-box" >
                <span class="title">{{ event_bridge.title }}</span>
                <span class="msg">{{ event_bridge.msg }}</span>
                <button @click="close_dialog">ok</button>
            </div>
        </div>
        <component v-else :is="event_bridge.object" :data="event_bridge.data"/>
    </div>
</template>