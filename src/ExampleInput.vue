<script setup>
    import { ref,watch} from 'vue';
    import { show_dialog } from './notificationdaemon';
    import { serialize_percentage} from './tool';
    const prop=defineProps({
        name:String,
    });
    const emit=defineEmits(["value",]);
    const content=ref("");
    const is_frac=ref(false);
    const top=ref("");
    const bottom=ref("");
    const side=ref("");
    function save_value(){
        if(is_frac.value && serialize_percentage(bottom.value)==0){
            return show_dialog("error",`denominator can't be 0 for parameter ${prop.name}`);
        }
        const vtop=serialize_percentage(top.value);
        const vbottom=serialize_percentage(bottom.value);
        const vside=serialize_percentage(side.value);
        const value=is_frac.value?vside+vtop/vbottom:serialize_percentage(content.value);
        let display="";
        if(is_frac.value){
            if(!side.value){
                display=`${top.value}|${bottom.value}`;
            }else{
                display=`${side.value}|${top.value}|${bottom.value}`
            }
        }else{
            if(content.value.endsWith('%')){
                display=content.value;
            }else{
                display=value.toString();
            }
        }
        return {name:prop.name,value:value,display:display};
    }
    function handle_input(e){
        const data=e.data;
        const white=['+','-','.',',','e','%'];
        if((data<'0' || data>'9') && !white.find(v=>v==data)){
            content.value=content.value.replace(data,'');
        }
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
    .side-cell{
        border: none;
        text-align: right;
    }
    .side-cell:hover{
        border: 1px solid black;
    }
</style>
<template>
    <div class="row" style="margin-top: 14px;align-items: center;">
        <span>{{ prop.name }}</span>
        <input type="text" style="margin-left: 12px;" v-model="content" v-if="!is_frac" @input="handle_input">
        <div class="row" v-else style="align-items: center;margin-left: 12px;" >
            <input type="text" class="spacer side-cell" v-model="side" @input="handle_input" placeholder="0">
            <div class="column spacer" style="margin-left: 4px;">
                <input type="text" v-model="top" class="frac-cell" style="border-bottom: 1px solid black" 
                @input="handle_input" placeholder="0">
                <input type="text" v-model="bottom" class="frac-cell" @input="handle_input" placeholder="1">
            </div>
        </div>
        <div class="row" style="margin-left: 6px;align-items: center;">
            <input type="checkbox" v-model="is_frac">
            <span>fraction</span>
        </div>
    </div>
</template>