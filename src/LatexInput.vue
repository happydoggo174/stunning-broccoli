<script setup>
    import LatexDisplay from './LatexDisplay.vue';
    import {ref,watch,useTemplateRef,onMounted,onUnmounted,nextTick} from "vue";
    import morphdom from 'morphdom';
    import warning from "@/assets/warning.svg";
    import { show_dialog } from './notificationdaemon.js';
    const model=defineModel();
    const input_mode=ref("plain text");
    const show_preview=ref(true);
    const mode=defineModel("is_plain");
    const preview_tag=useTemplateRef("preview");
    const inp_field=useTemplateRef("inp-field");
    const hg_back=useTemplateRef("latex-hg");
    const inp_cov=useTemplateRef("inp-cov");
    watch(input_mode,i=>{
        if(i=="plain text"){
            hg_back.value.innerText="";
        }
        nextTick().then(handle_input);
        mode.value=(i=='plain text')
    });
    function handle_input() {
        const field = inp_field.value;
        field.style.height = "auto";
        const sh=field.scrollHeight;
        field.style.height = sh + "px";
        const cov=inp_cov.value;
        cov.style.height=sh+'px';
        handle_scroll(field);
    }
    function handle_scroll(field){
        const tag=preview_tag.value;
        if(tag && model.value.length-field.selectionStart<=100){
            tag.scrollTop=tag.scrollHeight;
        }
    }
    const prop=defineProps({
        placeholder:String,
        max_length:Number
    });
    const font_size=ref(15);
    watch(()=>[model.value,input_mode.value],()=>{
        if(input_mode.value!='latex'){return ;}
        const a=document.createElement("a");
        function escape(t){
            a.innerText=t;
            return a.innerHTML;
        }
        let is_text=true;
        const nodes=model.value.split("$");
        nodes.forEach((node,i)=>{
            if(is_text){
                if(node.endsWith("\\")){
                    is_text=false;
                }
                nodes[i]=escape(node);
            }else{
                nodes[i]=`<span class="green-hg">${escape(node)}</span>`;
            }
            is_text=!is_text;
        });
        const r=document.createElement("div");
        r.innerHTML=nodes.join("$");
        const fc=hg_back.value?.firstChild;
        if(fc){
            morphdom(fc,r,{onBeforeElUpdated:(f,t)=>!f.isEqualNode(t)});
        }else{
            hg_back.value?.appendChild(r);
        }
    });
    onMounted(()=>window.addEventListener('resize',handle_input));
    onUnmounted(()=>window.removeEventListener('resize',handle_input));
</script>
<style scoped>
    .latex-preview{
        background-color: white;
        border-radius: 6px;
        color: black;
    }
    .scroll-flow{
        max-height: 95vh;
        min-height: 48px;
        overflow-y: auto;
        position: relative;
    }
    .latex-inp,.latex-back{
        font-size: 15px;
        scrollbar-width: none;
        resize: none;
        line-height:1.6;
        position: absolute;
        width: 100%;
        background-color: rgba(255,255,255,0.2);
    }
    .latex-back{
        z-index: -1;
        overflow-wrap: break-word;
        letter-spacing: normal;
        font-family: monospace;
        color: rgba(0,0,0,0);
    }
</style>
<style>
    .green-hg{
        background-color: green;
        opacity: 0.3;
    }
    .green-hg:hover{
        opacity: 0.5;
    }
</style>
<template>
    <div class="column" style="color: black;">
        <div class="row" style="margin-bottom: 16px;justify-content: space-between;">
            <div class="row">
                <span>input mode</span>
                <select v-model="input_mode" style="margin-left: 8px;">
                    <option value="plain text">plain text</option>
                    <option value="latex">latex</option>
                </select>
                <div v-if="input_mode=='latex'" style="color: black;margin-left: 8px;">
                tip: use $ latex expression $ to use latex,\$ to use a literal $</div>
            </div>
            <span class="text-center" v-if="input_mode=='latex'">preview</span>
        </div>
        <div class="row" style="position: relative;">
            <button style="position: absolute;bottom: 0;z-index: 1;background-color: red;" 
            v-if="max_length && model.length>max_length" 
            :title="`content too long:${model.length}/${max_length} characters used`"
            @click="show_dialog('error',`your content is too long,${model.length}/${max_length} characters used`)">
                <img :src="warning" alt="">
            </button>
            <div :style="`width:${input_mode=='latex'?'50%':'100%'}`" class="scroll-flow" ref="inp-cov">
                <textarea :placeholder="placeholder" @input="handle_input" class="latex-inp" v-model="model" ref="inp-field">
                </textarea>
                <div class="latex-back">
                    <div ref="latex-hg"></div>
                </div>
            </div>
            <div style="width:50%;margin-left: 12px;" class="scroll-flow" 
            v-if="input_mode=='latex' && show_preview" ref="preview">
                <div class="column" style="color: black;">
                    <LatexDisplay :content="model" class="latex-preview" :mutable="true"
                    :style="`font-size:${font_size}px;white-space:pre-wrap;line-height:1.5`"></LatexDisplay>
                </div>
            </div>
        </div>
    </div>
</template>