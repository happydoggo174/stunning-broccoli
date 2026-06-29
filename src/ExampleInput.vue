<script setup>
    import { ref,watch} from 'vue';
    import { show_dialog } from './notificationdaemon';
    const prop=defineProps({
        name:String,
    });
    const emit=defineEmits(["value",]);
    const content=ref(0);
    const is_frac=ref(false);
    const top=ref(0);
    const bottom=ref(0);
    const side=ref(0);
    function save_value(){
        if(is_frac.value && bottom.value==0){
            return show_dialog("error",`denominator can't be 0 for parameter ${prop.name}`);
        }
        const value=is_frac.value?side.value+top.value/bottom.value:content.value;
        let display="";
        if(is_frac.value){
            if(!side.value){
                display=`${top.value}|${bottom.value}`;
            }else{
                display=`${side.value}|${top.value}|${bottom.value}`
            }
        }else{
            display=value.toString();
        }
        return {name:prop.name,value:value,display:display};
    }
    watch(is_frac,(v)=>{
        if(v && content.value && !top.value){
            side.value=content.value;
            top.value=0;
            bottom.value=1;
        }
    });
    defineExpose({"save":save_value});
</script>
<style scoped> 
    .frac-cell{
        border: none;
        display: block;
        text-align: center;
    }
</style>
<template>
    <div class="row" style="margin-top: 14px;align-items: center;">
        <span>{{ prop.name }}</span>
        <input type="number" style="margin-left: 12px;" v-model="content" v-if="!is_frac">
        <div class="row" v-else style="align-items: center;margin-left: 12px;" >
            <input type="number" class="spacer" v-model="side" style="border: none;text-align: right;">
            <div class="column spacer" style="margin-left: 4px;">
                <input type="number" v-model="top" class="frac-cell" style="border-bottom: 1px solid black">
                <input type="number" v-model="bottom" class="frac-cell">
            </div>
        </div>
        <div class="row" style="margin-left: 6px;align-items: center;">
            <input type="checkbox" v-model="is_frac">
            <span>fraction</span>
        </div>
    </div>
</template>