<script setup>
    import like_filled from "@/assets/like_filled.svg";
    import dislike_filled from "@/assets/dislike_filled.svg";
    import done from "@/assets/done.svg";
    import { computed } from 'vue';
    import green_circle from "@/assets/green_circle.svg";
    import yellow_circle from "@/assets/yellow_circle.svg";
    import red_circle from "@/assets/red_circle.svg";
    const prop=defineProps({
        id:Number,
        title:String,
        difficulty:String,
        reaction:Number,
        problem_status:String|null
    });
    const react_image=computed(()=>(prop.reaction>=0)?like_filled:dislike_filled);
    const react_alt=computed(()=>prop.reaction>=0?"like":"dislike");
    const circle_img=computed(()=>{
        if(prop.difficulty=="easy"){
            return green_circle;
        }
        if(prop.difficulty=="medium"){
            return yellow_circle;
        }
        return red_circle;
    });
    const bg_colors={
        easy:"green",
        medium:"yellow",
        hard:"red"
    }
</script>
<style scoped>
    .solved-img{
        background-color: white;
        border:1px solid black;
        margin-left: 12px;
        border-radius: 50%;
    }
</style>
<template>
    <RouterLink :to="`/problem/${id}`" :class="'math-problem '+`${bg_colors[difficulty]}-shadow`">
        <div class="difficult-cover">
            <div style="margin-right: 14px;align-items: center;width: 62px;" class="column">
                <img :src="circle_img" width="24px" height="24px">
                <span>{{ difficulty }}</span>
            </div>
            <h2 class="tilte" style="color: black;">{{title}}</h2>
            <img :src="done" alt="completed" v-if='problem_status=="solved"' class="solved-img">
        </div>
        <div class="stat">
            <div class="row" style="align-items: center;">
                <img :src="react_image" v-once :alt="react_alt" style="margin-right: 8px;">
                <span>{{reaction}}</span>
            </div>
        </div>
    </RouterLink>
</template>