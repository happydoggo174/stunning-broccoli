<script setup>
    import { ref} from "vue"
    import {calculate,parse} from "./calc";
    import Sample from "./Sample.vue";
    import { show_dialog } from './notificationdaemon.js';
    import { mark_problem_status } from "./api";
    import { useAuth0 } from "@auth0/auth0-vue";
    import { save_completion_local } from "./completion";
    let expr=ref("");
    const expr_field=ref(null);
    const param=defineProps({
        parameter:Array,
        output:Array,
        problem_id:Number,
        problem_status:String,
    });
    const solved=defineEmits(["solved","solved-offline"]);
    function serialize_output(output,param){
        const out=[];
        for(let i=0;i<output.length;i++){
            let output_string="f(";
            for(let name of param){
                output_string+=output[i][name]+",";
            }
            if(output_string.endsWith(",")){
                output_string=output_string.slice(0,output_string.length-1);
            }
            output_string+=`)=${output[i]["output"]}`;
            out.push({display:output_string});
        }
        return out;
    }
    const sample_input=ref(serialize_output(param.output,param.parameter));
    const buttons=ref(param.parameter);
    const auth=useAuth0();
    async function mark_solved() {
        if(param.problem_status!="solved"){
            if(!auth || !auth.isAuthenticated.value){
                solved("solved-offline");
                save_completion_local(param.problem_id,"solved");
                return show_dialog("success","please login to save your progress");
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
        show_dialog("passed","all test passed");
    }
    function undo_status(i){
        i++;
        for(;i<sample_input.value.length;i++){
            delete sample_input.value[i].status;
        }
    }
    async function parse_expr(){
        const exp=expr.value;
        const base_object={"pi":Math.PI};
        for(let i=0;i<param.output.length;i++){
            const val=param.output[i];
            const total=Object.assign(val,base_object);
            try{
                if(calculate(exp,total)!=val.output){
                    sample_input.value[i].status="fail";
                    undo_status(i);
                    return show_dialog(`wrong answer`,'your answer is wrong');
                };
            }catch(e){
                sample_input.value[i].status="fail";
                undo_status(i);
                return show_dialog("error",e.message);
            }
            sample_input.value[i].status="pass";
        }
        await mark_solved();
    }
    function add_key(key){
        expr.value=expr.value+key;
        expr_field.value.focus();
    }
    function resize_field(){
        const field=expr_field.value;
        field.style.height="auto";
        field.style.height=`${field.scrollHeight}px`;
    }
</script>
<style scoped>
    #expr-field{
        padding: 4px;
        align-items: baseline;
        font-size: 18px;
        flex-grow: 1;
    }
    #submit-btn{
        background-color: blue;
        padding: 8px;
        border-radius: 14px;
        margin-top: 12px;
        margin-left: 18px;
        margin-right: 18px;
        transition: 0.27s ease-in-out background-color;
        &:hover{
            background-color: rgb(0, 217, 255);
        }
    }
    #data-key{
        display: grid;
        grid-template-columns: repeat(6,1fr);
        button{
            padding: 8px;
            font-size: 20px;
        }
    }
    .var-btn{
        flex-grow: 1;
        font-size: 20px;
        padding: 8px;
    }
    .formula-field{
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    #formula-label{
        color: black;
        font-size: 18px;
    }
    .sample-area{
        display: flex;
        flex-direction: column;
        color: black;
    }
    #sample-title{
        display: block;
        font-size: 18px;
        text-align: center;
    }
    #sample-list{
        display: flex;
        flex-direction: column;
        margin-left: 12px;
        margin-right: 12px;
    }
</style>
<template>
    <div style="display: flex;flex-direction: column;">
        <div class="formula-field">
            <span id="formula-label">{{ `f(${buttons.join(",")})=` }}</span>
            <textarea id="expr-field" type="text" v-model="expr" autofocus ref="expr_field" @input="resize_field"></textarea>
        </div>    
        <div class="row">
            <button v-for="btn in buttons" @click="add_key(btn)" class="var-btn">{{ btn }}</button>
        </div>
        <div id="data-key">
            <button @click="add_key('+')">+</button>
            <button @click="add_key('-')">-</button>
            <button @click="add_key('*')">*</button>
            <button @click="add_key('/')">/</button>
            <button @click="add_key('^()')">x<sup>y</sup></button>
            <button @click="add_key('√')">√</button>
            <button @click="add_key('!')">!</button>
            <button @click="add_key('%')">%</button>
            <button @click="add_key('||')">|x|</button>
            <button @click="add_key('log()')">log</button>
            <button @click="add_key('ln()')">ln</button>
            <button @click="add_key('min()')">min</button>
            <button @click="add_key('sin()')">sin</button>
            <button @click="add_key('cos()')">cos</button>
            <button @click="add_key('tan')">tan</button>
            <button @click="add_key('asin()')">asin</button>
            <button @click="add_key('acos()')">acos</button>
            <button @click="add_key('atan()')">atan</button>
        </div>
        <div class="sample-area">
            <span id="sample-title">sample input</span>
            <div id="sample-list">
                <Sample v-for="sample in sample_input" :text="sample.display" :test_status="sample.status"/>
            </div>
        </div>
        <button id="submit-btn" @click="parse_expr">submit</button> 
    </div>
</template>