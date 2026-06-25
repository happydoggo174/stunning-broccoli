<script setup>
    import { ref} from "vue"
    import {calculate} from "./calc";
    import Sample from "./Sample.vue";
    import { show_dialog } from './notificationdaemon.js';
    import { mark_problem_status } from "./api";
    import { save_completion_local } from "./completion";
    import { isAuthenticated } from "./auth";
    import Calculator from "./Calculator.vue";
    let expr=ref("");
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
</style>
<template>
    <div class="column">
        <Calculator :buttons="buttons" @input="(v)=>expr=v"/>
        <div class="sample-area column">
            <span id="sample-title">example</span>
            <div id="sample-list" class="column">
                <Sample v-for="sample in sample_input" :text="sample.display" :test_status="sample.status"/>
            </div>
        </div>
        <button id="submit-btn" @click="parse_expr">submit</button> 
    </div>
</template>