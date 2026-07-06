<script setup>
    import { make_problem } from './api';
    import { ref } from 'vue';
    import ExamplePopup from './ExamplePopup.vue';
    import add from "@/assets/add.svg"
    import add_mini from '@/assets/add_mini.svg';
    import HintInputWidget from './HintInputWidget.vue';
    import router from "./router"
    import Menu from './Menu.vue';
    import next from "@/assets/next.svg";
    import back from "@/assets/back.svg";
    import Parameter from './Parameter.vue';
    import Calculator from './Calculator.vue';
    import { calculate } from './calc';
    import { show_dialog } from './notificationdaemon';
    import TestSample from './TestSample.vue';
    import LatexInput from './LatexInput.vue';
    const page=ref(0);
    let count=3;
    const parameter=ref([{name:"x",id:0},{name:"y",id:1}]);
    const example=ref([]);
    const is_example=ref(false);
    const title=ref("");
    const description=ref("");
    const difficulty=ref("easy");
    const hint=ref([]);
    let refresh_handle=null;
    let expression="";
    function remove_parameter(id){
        parameter.value=parameter.value.filter((n)=>n.id!=id);
    }
    function add_parameter(){
        parameter.value.push({name:'z',id:++count});
    }
    function handle_add_example(param,display_name){
        try{
            const out=Object.assign({},{output:calculate(expression,param),id:++count},param);
            out['display_name']=display_name;
            example.value.push(out);
        }catch(e){
            show_dialog("error",e);
        }
    }
    async function handle_submit(){
        try{   
            if(!title.value.length){
                return show_dialog("error","a title is required for submission");
            }
            const desc=description.value;
            example.value.forEach((v)=>{delete v.output;delete v.id});
            await make_problem(title.value,desc,difficulty.value,expression,
            display_parameter.value.map(v=>v.name),example.value,example.value.map(e=>e.display_name),
            hint.value.map(v=>v.content));
            router.push('/').then();
        }catch(e){
            show_dialog("error",e);
        }
    }
    function refresh_example(){
        example.value.forEach((exp)=>{ 
            try{
                exp.output=calculate(expression,exp);
                exp.is_err=false;
            }catch{
                exp.is_err=true;
            }
        });
    }
    function edit_expression(new_expr){
        expression=new_expr;
        if(refresh_handle){
            clearTimeout(refresh_handle);
        }
        refresh_handle=setTimeout(refresh_example,1000);
    }
    function show_example_dialog(){
        const blacklist=["__proto__","__constructor__","prototype","output","is_err"];
        let valid=true;
        display_parameter.value.forEach((pr)=>{
            if(blacklist.find(v=>v==pr.name)){
                show_dialog("error",`invalid parameter name ${pr.name}`);
                valid=false;
            }
        });
        if(!valid){return;}
        is_example.value=true;
    }
    function remove_hint(idx){hint.value=hint.value.filter(v=>v.idx!=idx);}
    function add_hint(){hint.value.push({content:'',idx:++count})};
</script>
<style scoped>
    @import './css/MakeProblem.css';
</style>
<template>
    <Menu>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.17.0/dist/katex.min.css" 
        integrity="sha384-vlBdW0r3AcZO/HboRPznQNowvexd3fY8qHOWkBi5q7KGgqJ+F48+DceybYmrVbmB" 
        crossorigin="anonymous">
        <div class="example-bg" v-if="is_example">
            <ExamplePopup :parameter="parameter" @close="is_example=false" @added="handle_add_example"/>
        </div>
        <div style="margin-left: 14px;margin-right: 14px;">
            <div v-if="!page">
                <div class="row" style="justify-content: center;">
                    <input type="text" placeholder="problem title here" id="title" v-model="title">
                </div>
                <div class="column" style="margin-top: 14px;">
                    <span style="display: block;text-align: center;">description</span>
                    <LatexInput placeholder="your description here" v-model="description"></LatexInput>
                </div>
                <div class="row" style="justify-content: space-between;margin-top: 14px;margin-bottom: 14px;">
                    <span>difficulty</span>
                    <select name="" id="" style="flex-grow: 1;margin-left: 12px;" v-model="difficulty">
                        <option value="easy">easy</option>
                        <option value="medium">medium</option>
                        <option value="hard">hard</option>
                    </select>
                </div>
                <div class="column hint-row">
                    <div class="row" style="align-items: center;">
                        <span style="display: block;text-align: center;font-size: 18px;">hints</span>
                        <button class="add-hint-btn hover-shadow" @click="add_hint">
                            <img :src="add_mini" alt="">
                        </button>
                    </div>
                    <HintInputWidget v-for="h in hint" v-model="h.content" style="margin-top: 8px;" @remove="remove_hint" 
                    :idx="h.idx" :key="h.idx">
                    </HintInputWidget>
                </div>
                <div class="row">
                    <div class="spacer"></div>
                    <button class="page-btn hover-shadow" @click="page=1">
                        next
                        <img v-once :src="next" alt="next page" style="margin-left: 8px;">
                    </button>
                </div>
            </div>
            <div v-else>
                <div class="row" style="align-items: center;margin-bottom: 14px;margin-top: 12px;">
                    <span>input</span>
                    <Parameter v-for="param in parameter" :key="param.id" :name="param.name" :idx="param.id" 
                    @remove="remove_parameter" v-model="param.name"/>
                    <button style="margin-left: 14px;border-radius: 40%;padding: 4px;">
                        <img :src="add" v-once alt="" @click="add_parameter">
                    </button>
                </div>
                <Calculator :buttons="parameter.map((v)=>v.name)" @input="edit_expression"
                :init_content="expression"/>
                <div class="row" style="justify-content: space-between;margin-top: 14px;">
                    <button @click="page=0" class="page-btn hover-shadow">
                        <img :src="back" alt="previous page" style="margin-right: 8px;">
                        prev
                    </button>
                    <button @click="handle_submit" class=" submit-btn hover-shadow">submit</button>
                </div>
                <div class="column">
                    <div class="row example-row">
                        <span class="example-banner">example</span>
                        <button class="show-example-btn hover-shadow" @click="show_example_dialog">
                            <img :src="add" alt="add example" v-once style="margin-right: 8px;">
                            add example
                        </button>
                    </div>
                    <TestSample  v-for="exp in example" :parameter="display_parameter" :value="exp" @delete="
                        (id)=>example=example.filter((v)=>v.id!=id)
                    "/>
                </div>
            </div>
            <button class="action-btn" id="cancel-btn" @click="router.push('/').then()">cancel</button>
        </div>
    </Menu>
</template>