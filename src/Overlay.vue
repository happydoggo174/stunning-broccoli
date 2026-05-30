<script setup>
    import { event_bridge } from './notificationdaemon';
    function close_dialog(){
        event_bridge.title=null;
        event_bridge.is_err=false;
    }
</script>
<style scoped>
    #notification-outer-padding{
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    #notification-inner-padding{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    #notification-box{
        position: fixed;
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
            margin-top: 6px;
            margin-bottom: 12px;
        }
        button{
            padding: 4px;
        }
    }
</style>
<template>
    <div id="notification-outer-padding" v-if="event_bridge.title">
        <div id="notification-inner-padding">
            <div id="notification-box" >
                <span class="title">{{ event_bridge.title }}</span>
                <span class="msg">{{ event_bridge.msg }}</span>
                <button @click="close_dialog">ok</button>
            </div>
        </div>
    </div>
</template>