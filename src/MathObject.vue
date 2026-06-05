<script setup>
    import like_filled from "@/assets/like_filled.svg";
    import dislike_filled from "@/assets/dislike_filled.svg";
    import done from "@/assets/done.svg";
    import { computed } from 'vue';
    const prop=defineProps({
        id:Number,
        title:String,
        difficulty:String,
        reaction:Number,
        problem_status:String|null
    });
    const react_image=computed(()=>(prop.reaction>=0)?like_filled:dislike_filled);
    const tilte_style=computed(()=>(prop.difficulty=="medium")?"color:rgb(7,0,80)":"");
    const react_alt=computed(()=>prop.reaction>=0?"like":"dislike");
    const bg_colors={
        easy:"green",
        medium:"yellow",
        hard:"red"
    }
</script>
<template>
    <RouterLink :to="`/problem/${id}`" :class="'math-problem '+`${bg_colors[difficulty]}-shadow`">
        <div class="difficult-cover" :style="`background-color:${bg_colors[difficulty]}`">
            <h2 class="tilte" :style="tilte_style">{{title}}</h2>
            <img :src="done" alt="completed" v-if='problem_status=="solved"' style='background-color: white;border:1px solid black;margin-left: 12px;border-radius: 50%;'>
        </div>
        <div class="stat">
            <div class="row" style="align-items: center;">
                <img :src="react_image" :alt="react_alt" style="margin-right: 8px;">
                <span>{{reaction}}</span>
            </div>
        </div>
    </RouterLink>
</template>