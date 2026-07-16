<script setup>
    import { get_user_profile,get_favorite_problem } from './api';
    import { onMounted,reactive,ref,computed } from 'vue';
    import MathObject from './MathObject.vue';
    import Menu from './Menu.vue';
    const prop=defineProps({
        uid:String
    });
    const account=reactive({});
    const problem=ref([]);
    const favorite=ref(null);
    const page=ref(0);
    onMounted(()=>{
        get_user_profile(prop.uid).then((prof)=>{
            Object.assign(account,prof["account"]);
            problem.value=prof["problem"];
        });
    });
    async function load_favorite(){
        if(favorite.value==null){
            favorite.value=await get_favorite_problem();
        }
    }
    const completed=computed(()=>problem.value.filter(v=>v.status=='solved'));
    const display_problem=computed(()=>page.value?favorite.value:completed.value);
</script>
<style scoped>
    .user-info{
        margin: 16px;
    }
    .page-btn{
        margin-left: 8px;
        margin-right: 8px;
        padding: 6px;
        border-radius: 12px;
    }
    .page-btn:hover{
        background-color: rgba(0, 0, 0, 0.2);
    }
    .current{
        flex-grow: 2;
        color: white;
    }
    .empty-banner{
        display: block;
        text-align: center;
        margin-top: 36px;
    }
</style>
<template>
    <Menu>
        <div class="column" style="color: black;">
            <div class="row user-info">
                <img :src="account.profile" alt="" width="100px" height="100px" class="circle">
                <h1 class="spacer text-center">{{ account.username }}</h1>
            </div>
            <div class="column">
                <div class="row">
                    <button class="spacer page-btn borderless" @click="page=0"
                    :class="page?'':'current'" :style="!page?'background-color:green':''">completed problem</button>
                    <button class="spacer page-btn borderless" @click="()=>{load_favorite();page=1}" 
                    :class="page?'current':''" :style="page?'background-color:pink;color:black':''">favorite problem</button>
                </div>
                <div class="column">
                    <div v-if="!display_problem?.length" class="empty-banner">
                        nothing to see here
                    </div>
                    <MathObject
                        v-else
                        v-for="prob in display_problem"
                        :key="prob.id"
                        :title="prob.title"
                        :difficulty="prob.difficulty"
                        :reaction="prob.reaction"
                        :id="prob.id"
                        :problem_status="prob.status" 
                    />
                </div>
            </div>
        </div>
    </Menu> 
</template>