<script setup>
    import { make_problem } from './api';
    import { ref } from 'vue';
    import ExamplePopup from './ExamplePopup.vue';
    import add from "@/assets/add.svg"
    import router from "./router"
    import Menu from './menu.vue';
    import next from "@/assets/next.svg";
    import back from "@/assets/back.svg";
    import Parameter from './Parameter.vue';
    import Calculator from './Calculator.vue';
    const page=ref(0);
    import { calculate } from './calc';
    import { show_dialog } from './notificationdaemon';
    import TestSample from './TestSample.vue';
    let count=3;
    const data=[{name:"x",id:0},{name:"y",id:1}]
    const parameter=ref(data.map(v=>v));
    const display_parameter=ref(data.map(v=>v));
    const example=ref([]);
    const is_example=ref(false);
    const title=ref("");
    const description=ref("");
    const difficulty=ref("easy");
    let refresh_handle=null;
    let expression="";
    function resize_field(e){
        const field=e.target;
        field.style.height="auto";
        field.style.height=field.scrollHeight+'px';
    }
    function remove_parameter(id){
        parameter.value=parameter.value.filter((n)=>n.id!=id);
        display_parameter.value=display_parameter.value.filter((n)=>n.id!=id);
    }
    function handle_update(old_id,next){
        //don't write back to parameter or it'll cascade into an infinitive loop
        display_parameter.value=display_parameter.value.map((v)=>{
            return v.id==old_id?{name:next,id:old_id}:v;
        });
    }
    function add_parameter(){
        const idx=++count;
        parameter.value.push({name:'z',id:idx});
        display_parameter.value.push({name:'z',id:idx})
    }
    function handle_add_example(param){
        try{
            const out=Object.assign({},{output:calculate(expression,param),id:++count},param);
            example.value.push(out);
        }catch(e){
            show_dialog("error",e);
        }
    }
    async function handle_submit(){
        try{   
            await make_problem(title.value,description.value,difficulty.value,expression,
            display_parameter.value.map(v=>v.name),example.value.map((v)=>{delete v.output;delete v.id;return v;}));
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
        if(!refresh_handle){
            refresh_handle=setTimeout(refresh_example,1000);
        }else{
            clearTimeout(refresh_handle);
            refresh_handle=setTimeout(refresh_example,1000);
        }
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
</script>
<style scoped>
    @import './MakeProblem.css';
</style>
<template>
    <Menu>
        <div class="example-bg" v-if="is_example">
            <ExamplePopup :parameter="display_parameter" @close="is_example=false" @added="handle_add_example"/>
        </div>
        <div style="margin-left: 14px;margin-right: 14px;">
            <div v-if="!page">
                <div class="row" style="justify-content: center;">
                    <input type="text" placeholder="problem title here" id="title" v-model="title">
                </div>
                <div class="column" style="margin-top: 14px;">
                    <span style="display: block;text-align: center;">description</span>
                    <textarea placeholder="your description here" @input="resize_field" v-model="description"
                    style="font-size: 15px;scrollbar-width: none" ></textarea>
                </div>
                <div class="row" style="justify-content: space-between;margin-top: 14px;margin-bottom: 14px;">
                    <span>difficulty</span>
                    <select name="" id="" style="flex-grow: 1;margin-left: 12px;" v-model="difficulty">
                        <option value="easy">easy</option>
                        <option value="medium">medium</option>
                        <option value="hard">hard</option>
                    </select>
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
                    @remove="remove_parameter" @update="handle_update"/>
                    <button style="margin-left: 14px;border-radius: 40%;padding: 4px;">
                        <img :src="add" v-once alt="" @click="add_parameter">
                    </button>
                </div>
                <Calculator :buttons="display_parameter.map((v)=>v.name)" @input="edit_expression"/>
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
            <button class="action-btn" id="cancel-btn" @click="router.push('/')">cancel</button>
        </div>
    </Menu>
</template>