<script setup>
    import { make_problem } from './api';
    import { ref } from 'vue';
    import ExamplePopup from './ExamplePopup.vue';
    import add from "@/assets/add.svg"
    import router from "./router"
    import NavBar from './NavBar.vue';
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
</script>
<style scoped>
    span{
        color: black;
    }
    .action-btn{
        flex-grow: 1;
        padding: 4px;
        border-radius: 10px;
        margin-left: 6px;
        margin-right: 6px;
        margin-top: 8px;
    }
    #title{
        margin-top: 8px;
        font-size: 24px;
        width: 30vw;
        word-wrap: break-word;
        text-align: center;
    }
    #cancel-btn{
        color: red;
        border: 1px solid red;
        font-size: 18px;
        transition: 0.12s background-color ease-in-out,0.12s color ease-in-out;
        width: 100%;
    }
    #cancel-btn:hover{
        color: white;
        background-color: red;
    }
    @media (max-width:600px) {
        #title{
            width: 40vw;
        }
    }
    .page-btn{
        display: flex;
        align-items: center;
        padding: 4px;
        border-radius: 12px;
    }
    .example-row{
        justify-content: center;
        align-items: center;
        margin-top: 14px;
    }
    .example-banner{
        display: block;
        text-align: center;
        font-size: 18px;
    }
    .example-bg{
        width: 100vw;
        height: 100vh;
        z-index: 1;
        position: absolute;
        left: 0;
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
<template>
    <NavBar/>
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
                style="font-size: 15px;scrollbar-width: none;"></textarea>
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
                <button class="page-btn" @click="page=1">
                    next
                    <img v-once :src="next" alt="next page">
                </button>
            </div>
        </div>
        <div v-else>
            <div class="row" style="align-items: center;margin-bottom: 14px;margin-top: 12px;">
                <span>input</span>
                <Parameter v-for="param in parameter" :key="param.id" :name="param.name" :idx="param.id" 
                @remove="remove_parameter" @update="handle_update"/>
                <button style="margin-left: 14px;">
                    <img :src="add" v-once alt="" @click="add_parameter">
                </button>
            </div>
            <Calculator :buttons="display_parameter.map((v)=>v.name)" @input="(v)=>expression=v"/>
            <div class="row" style="justify-content: space-between;margin-top: 14px;">
                <button @click="page=0" class="page-btn">
                    <img :src="back" alt="previous page">
                    prev
                </button>
                <button style="padding: 6px;border-radius: 8px;" @click="handle_submit">submit</button>
            </div>
            <div class="column">
                <div class="row example-row">
                    <span class="example-banner">example</span>
                    <button style="margin-left: 12px;" @click="is_example=true">add example</button>
                </div>
                <TestSample  v-for="exp in example" :parameter="display_parameter" :value="exp" @delete="
                    (id)=>example=example.filter((v)=>v.id!=id)
                "/>
            </div>
        </div>
        <button class="action-btn" id="cancel-btn" @click="router.push('/')">cancel</button>
    </div>
</template>