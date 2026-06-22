<script setup>
    import { make_problem } from './api';
    import Parameter from './Parameter.vue';
    import { ref } from 'vue';
    import add from "@/assets/add.svg";
    import router from "./router"
    import NavBar from './NavBar.vue';
    import green_circle from "@/assets/green_circle.svg";
    import yellow_circle from "@/assets/yellow_circle.svg";
    import red_circle from "@/assets/red_circle.svg";
    const paramter=ref(["x","y"]);
    function resize_field(e){
        const field=e.target;
        field.style.height="auto";
        field.style.height=field.scrollHeight+'px';
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
    }
    @media (max-width:600px) {
        #title{
            width: 40vw;
        }
    }
</style>
<template>
    <NavBar/>
    <div class="row" style="justify-content: center;">
        <input type="text" placeholder="problem title here" id="title">
    </div>
    <span>description</span>
    <textarea name="" id="" placeholder="your description here" @input="resize_field" style="font-size: 15px;">
    </textarea>
    <div class="row" style="justify-content: space-between;margin-top: 14px;margin-bottom: 14px;">
        <span>difficulty</span>
        <select name="" id="" style="flex-grow: 1;margin-left: 12px;">
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="hard">hard</option>
        </select>
    </div>
    <span>f({{ paramter.join(",") }})=</span>
    <input type="text" placeholder="your function here">
    <div class="row" style="margin-top: 14px;">
        <span>parameter:</span>
        <Parameter v-for="param in paramter" :name="param"/>
        <button style="margin-left: 12px;">
            <img :src="add" alt="">
        </button>
    </div>
    <div class="row">
        <button class="action-btn">submit</button>
        <button class="action-btn" @click="router.push('/')">cancel</button>
    </div>
</template>