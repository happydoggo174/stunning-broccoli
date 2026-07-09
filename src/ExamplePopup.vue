<script setup>
    import {useTemplateRef,ref} from "vue";
    import { show_dialog } from "./notificationdaemon";
    import ExampleInput from "./ExampleInput.vue";
    const prop=defineProps({
        parameter:Array
    });
    const emits=defineEmits(["added","close"]);
    const param_list=useTemplateRef("param-list");
    const has_added=ref(false);
    function handle_add(){
        const params={};
        const display_name={};
        const elem=param_list.value;
        const blacklist=["__proto__","__constructor__","prototype","output","is_err"];
        try{
            Array.from(elem).forEach(ele=>{
                const {name,value,display}=ele.save();
                if(Number.isNaN(value)){
                    show_dialog("error",`invalid value for input ${name}`);
                    throw 1;
                }
                if(blacklist.find(v=>v==name)){
                    show_dialog("error",`invalid name ${name}`);
                    throw 0;
                }
                params[name]=value;
                display_name[name]=display;
            });
        }catch(e){
            console.log("error",e);
            return;
        }
        emits("added",params,display_name);
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
    .action-btn{
        padding: 4px;
        border-radius: 12px;
    }
</style>
<template>
    <div class="column" style="background-color: white;padding: 12px;border-radius: 16px;border: 1px solid black;color: black;">
        <h2 class="text-center">add an example</h2>
        <div class="column">
            <ExampleInput :name="param.name" v-for="param in parameter" ref="param-list"></ExampleInput>
        </div>
        <span v-if="has_added" id="example-added-banner">example added successfully</span>
        <div class="row" style="margin-top: 14px;width: 100%;">
            <button @click="emits('close')" class="spacer action-btn hover-shadow">close</button>
            <button @click="handle_add" class="spacer action-btn hover-shadow" style="margin-left: 8px;">add</button>
        </div>
    </div>
</template>