<script setup>
    import { ref,reactive} from "vue"
    import {calculate} from "./calc";
    import Sample from "./Sample.vue";
    import { show_dialog } from './notificationdaemon.js';
    import { mark_problem_status } from "./api";
    import { save_completion_local } from "./completion";
    import { isAuthenticated } from "./auth";
    import run from "@/assets/run.svg";
    import Calculator from "./Calculator.vue";
    import ErrorWidget from "./ErrorWidget.vue";
    const expr=ref("");
    const is_fail=ref(false);
    const fail_detail=reactive({});
    const param=defineProps({
        parameter:Array,
        output:Array,
        problem_id:Number,
        problem_status:String,
        example_name:Array
    });
    const solved=defineEmits(["solved","solved-offline"]);
    function html(s,...v){
        let o="";
        let n=document.createElement("a");
        for(let i=0;i<v.length;i++){
            n.innerText=v[i];
            o+=s[i]+n.innerHTML;
        }
        return o+(s.length>v.length?s[s.length-1]:"");
    }
    function serialize_display(output){
        return output.map(ln=>ln.map(n=>{
            console.log(n);
            if(n.indexOf('|')==-1){
                return n;
            }
            const pr=n.split('|');
            if(pr.length==2){
                return html`<div class="column"><span style="border-bottom:1px solid black;">${pr[0]}</span>
                    <span>${pr[1]}</span>
                </div>`;
            }
            return html`<div class="row" style="align-items: center;">
                <span style="margin-right: 4px;">${pr[0]}</span>
                <div class="column"><span style="border-bottom:1px solid black;">${pr[1]}</span>
                    <span>${pr[2]}</span>
                </div>
            </div>`;
        }));
    }
    function serialize_output(output,param,example_name){
        const out=[];
        const display=serialize_display(example_name);
        for(let i=0;i<output.length;i++){
            let output_string="f(";
            for(let name of display[i]){
                output_string+=name+",";
            }
            if(output_string.endsWith(",")){
                output_string=output_string.slice(0,output_string.length-1);
            }
            output_string+=`)=${output[i]["output"]}`;
            out.push({display:output_string,correct:output[i]["output"]});
        }
        return out;
    }
    const sample_input=ref(serialize_output(param.output,param.parameter,param.example_name));
    const buttons=ref(param.parameter);
    async function mark_solved() {
        if(param.problem_status!="solved"){
            if(!isAuthenticated.value){
                solved("solved-offline");
                save_completion_local(param.problem_id,"solved");
                return show_dialog("success","please login to save your progress",false);
            }
            try{
                await mark_problem_status(param.problem_id,"solved");
            }catch{
                solved("solved-offline");
                save_completion_local(param.problem_id,"solved");
                return show_dialog("error","can't mark problem as completed");
            }
        }
        solved("solved");
        show_dialog("passed","all test passed",false);
    }
    function undo_status(i){
        i++;
        for(;i<sample_input.value.length;i++){
            delete sample_input.value[i].status;
        }
    }
    function show_failure(idx,err,title,msg){
        sample_input.value[idx].status="fail";
        sample_input.value[idx].result=err;
        undo_status(idx);
        is_fail.value=true;
        show_dialog(title,msg);
    }
    async function parse_expr(){
        const exp=expr.value;
        for(let i=0;i<param.output.length;i++){
            const val=param.output[i];
            try{
                const res=calculate(exp,val);
                if(res!=val.output){
                    const params=[];
                    param.parameter.forEach((pr)=>{
                        params.push(val[pr]);
                    });
                    Object.assign(fail_detail,{param:params,correct:val.output,output:res});
                    return show_failure(i,res,'wrong answer','your answer is wrong');
                };
            }catch(e){
                const params=[];
                param.parameter.forEach((pr)=>{
                    params.push(val[pr]);
                });
                Object.assign(fail_detail,{param:params,correct:val.output,output:e.message});
                return show_failure(i,e.message,'error',e.message);
            }
            sample_input.value[i].status="pass";
        }
        is_fail.value=false
        await mark_solved();
    }
</script>
<style scoped>
    #submit-btn{
        background-color: blue;
        padding: 8px;
        border-radius: 14px;
        margin-top: 12px;
        margin-left: 18px;
        margin-right: 18px;
        transition: 0.27s ease-in-out background-color,0.27s ease-in-out color;
        color: white;
        display: flex;
        justify-content: center;
        font-size: 18px;
        overflow: hidden;
        align-items: center;
    }
    #submit-btn:hover{
        background-color: rgb(0, 217, 255);
        color: black;
    }
    .sample-area{
        color: black;
    }
    #sample-title{
        display: block;
        font-size: 18px;
        text-align: center;
    }
    #sample-list{
        margin-left: 12px;
        margin-right: 12px;
    }
    .run-img{
        transform: translateY(200%);
        transition: 0.27s ease-in-out transform;
    }
    #submit-btn:hover .run-img{
        transform: translateY(0);
    }
</style>
<template>
    <div class="column">
        <Calculator :buttons="buttons" @input="(v)=>expr=v"/>
        <div class="sample-area column">
            <span id="sample-title">example</span>
            <div id="sample-list" class="column">
                <Sample v-for="sample in sample_input" :text="sample.display" :test_status="sample.status" 
                :correct="sample.correct" :result="sample.result"/>
            </div>
            <ErrorWidget :params="fail_detail.param" :correct="fail_detail.correct" :output="fail_detail.output" 
            v-if="is_fail" @closed="is_fail=false;"/>
        </div>
        <button id="submit-btn" @click="parse_expr">
            run
            <img :src="run" class="run-img">    
        </button> 
    </div>
</template>