<script setup>
    import green_star from "@/assets/green_star.svg";
    import yellow_star from "@/assets/yellow_star.svg";
    import red_star from "@/assets/red_star.svg";
    import { computed } from "vue";
    import router from "./router";
    import CategoryLabel from "./CategoryLabel.vue";
    const prop=defineProps({
        title:String,
        category:Array,
        id:Number,
        author:String,
        difficulty:String
    });
    const star_table={
        "easy":[0],
        "medium":[0,0],
        "hard":[0,0,0]
    }
    const diff_level={
        "easy":"basic",
        "medium":"intermediate",
        "hard":"advanced"
    };
    const star_src=computed(()=>{
        if(prop.difficulty=='easy'){
            return green_star;
        } 
        return prop.difficulty=='medium'?yellow_star:red_star;  
    },)
    function open_learn(){
        router.push({path:`/learn/detail/${prop.id}`}).then();
    }
</script>
<style scoped>
    .widget{
        border: 1px solid black;
        padding: 6px;
        border-radius: 12px;
        margin-top: 8px;
    }
    .title{
        line-height: 1.4;
    }
    .diff{
        margin-right: 12px;
        align-items: center;
        border-right: 1px solid black;
        padding-right: 8px;
    }
</style>
<template>
    <div class="row widget hover-shadow" @click="open_learn">
        <div class="column diff">
            {{ diff_level[difficulty] }}
            <div class="column">
                <img :src="star_src" alt="" style="margin-left: 4px;" 
                v-for="_ in star_table[difficulty]" width="24px" height="24px">
            </div>
        </div>
        <div class="column">
            <span>{{ author }}</span>
            <h2 class="title">{{ title }}</h2>
            <div class="row">
                <CategoryLabel v-for="tag in category" :tag="tag"></CategoryLabel>
            </div>
        </div>
    </div>
</template>