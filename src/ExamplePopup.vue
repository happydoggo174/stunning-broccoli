<script setup>
    import {useTemplateRef,ref} from "vue";
    import { show_dialog } from "./notificationdaemon";
    const prop=defineProps({
        parameter:Array
    });
    const emits=defineEmits(["added","close"]);
    const param_list=useTemplateRef("param-list");
    const has_added=ref(false);
    function handle_add(){
        const params={};
        const elem=param_list.value;
        const blacklist=["__proto__","__constructor__","prototype","output","is_err"];
        try{
            Array.from(elem).forEach(ele=>{
                const name=ele.querySelector("span").innerText;
                const value=parseFloat(ele.querySelector("input").value);
                if(Number.isNaN(value)){
                    show_dialog("error",`invalid value for input ${name}`);
                    throw 1;
                }
                if(blacklist.find(v=>v==name)){
                    show_dialog("error",`invalid name ${name}`);
                    throw 0;
                }
                params[name]=value;
            });
        }catch(e){
            console.log("error",e);
            return;
        }
        emits("added",params);
        has_added.value=true;
    }
</script>
<style>
    #example-added-banner{
        color: green;
        display: block;
        text-align: center;
        margin-top: 12px;
    }
</style>
<template>
    <div class="column" style="background-color: white;padding: 12px;border-radius: 16px;border: 1px solid black;color: black;">
        <h2>add an example</h2>
        <div v-for="param in parameter" ref="param-list" class="column">
            <div class="row" style="margin-top: 14px;">
                <span>{{ param.name }}</span>
                <input type="number" style="margin-left: 12px;">
            </div>
        </div>
        <span v-if="has_added" id="example-added-banner">example added successfully</span>
        <div class="row" style="margin-top: 14px;width: 100%;">
            <button @click="emits('close')" class="spacer">close</button>
            <button @click="handle_add" class="spacer" style="margin-left: 8px;">add</button>
        </div>
    </div>
</template>