<script setup>
    import { get_user_profile } from './api';
    import { onMounted,reactive,ref,computed } from 'vue';
    import MathObject from './MathObject.vue';
    import Menu from './Menu.vue';
    const prop=defineProps({
        uid:String
    });
    const account=reactive({});
    const problem=ref([]);
    const page=ref(0);
    onMounted(()=>{
        get_user_profile(prop.uid).then((prof)=>{
            Object.assign(account,prof["account"]);
            problem.value=prof["problem"];
        });
    });
    const favorite=computed(()=>problem.value.filter(v=>v.reaction=='liked'));
    const completed=computed(()=>problem.value.filter(v=>v.status=='solved'));
    const display_problem=computed(()=>page.value?favorite:completed);
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
                    :class="page?'':'current'">completed problem</button>
                    <button class="spacer page-btn borderless" @click="page=1" 
                    :class="page?'current':''">favorite problem</button>
                </div>
                <div class="column">
                    <div v-if="!display_problem.value.length" class="empty-banner">
                        nothing to see here
                    </div>
                    <MathObject
                        v-else
                        v-for="prob in display_problem.value"
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