<script setup>
    import Menu from './Menu.vue';
    import { get_problem_detail,update_problem } from './api.js';
    import { reactive,onMounted,ref,useTemplateRef,computed } from 'vue';
    import loading from './loading.js';
    import LatexDisplay from './LatexDisplay.vue';
    import LatexInput from './LatexInput.vue';
    import HintEditor from './HintEditor.vue';
    import edit from "@/assets/edit.svg";
    import save from "@/assets/save.svg";
    import close from "@/assets/close_mini.svg";
    import more from "@/assets/more.svg";
    import less from "@/assets/less.svg";
    import router from './router';
    import { show_dialog,show_confirm } from './notificationdaemon.js';
    const prop=defineProps({
        id:Number
    });
    const detail=reactive({});
    const edited=reactive({title:"",description:"",hint:[],plain_desc:true,difficulty:"easy"});
    const loader=reactive(new loading());
    const editing_title=ref(false);
    const hovering_title=ref(false);
    const hvr_desc=ref(false);
    const edit_desc=ref(false);
    const show_hint=ref(false);
    const edit_hint=ref(false);
    const hint_ref=useTemplateRef("hint-edit");
    onMounted(async()=>{
        await loader.wrap(async()=>{
            const out=await get_problem_detail(prop.id);
            Object.assign(detail,out);
            edited.title=out.title;
            edited.description=out.description;
            edited.hint=out.hint;
            edited.plain_desc=out.plain_desc;
            edited.difficulty=out.difficulty;
        });
    });
    function toggle_title(){
        if(editing_title.value){
            detail.title=edited.title;
        }
        editing_title.value=!editing_title.value;
    }
    function cancel_title_edit(){
        edited.title=detail.title;
        editing_title.value=false;
    }
    function cancel_desc_edit(){
        edited.description=detail.description;
        edited.plain_desc=detail.plain_desc;
        edit_desc.value=false;
    }
    function save_desc(){
        detail.description=edited.description;
        detail.plain_desc=edited.plain_desc;
        edit_desc.value=false;
    }
    function save_hint(){
        detail.hint=hint_ref.value.get();
        edit_hint.value=false;
    }
    function cancel_hint_edit(){
        edit_hint.value=false;
    }
    async function save_edit() {
        if(edit_desc.value || editing_title.value || edit_hint.value){
            show_confirm("warning",'you have unsaved change,continue?',async(r)=>{
                if(!r){return;}
                try{
                    await update_problem(
                        prop.id,
                        detail.title,
                        detail.description,
                        detail.difficulty,
                        detail.plain_desc,
                        detail.hint
                    );
                    router.push('/');
                }catch(e){
                    console.log(e);
                    show_dialog('error','unable to edit problem',true);
                }
            });
            return;
        }
        try{
            await update_problem(
                prop.id,
                detail.title,
                detail.description,
                detail.difficulty,
                detail.plain_desc,
                detail.hint
            );
            router.push('/');
        }catch(e){
            console.log(e);
            show_dialog('error','unable to edit problem',true);
        }
    }
    const diff_color=computed(()=>{
        if(detail.difficulty=='easy'){
            return 'rgb(24,242,31)';
        }
        return detail.difficulty=='medium'?"rgb(255,240,31)":"rgb(234,51,35)";
    });
</script>
<style scoped>
    .title{
        font-size: 20px;
    }
    .act-btn{
        padding: 8px;
        border-radius: 12px;
        font-size: 16px;
    }
    .edit-btn{
        border: none;
        background-color: rgba(0,0,0,0);
        border-radius: 50%;
        padding: 4px;
    }
    .diff-circle{
        margin-left:8px;
        width:24px;
        height:24px;
        border-radius: 50%;
    }
    .hitem{
        margin-top: 4px;
    }
    .hitem:hover{
        background-color: rgba(0,0,0,0.1);
    }
</style>
<template>
    <Menu>
        <div v-if="loader.resolved" style="color: black;margin-left: 16px;margin-right: 16px;" class="column">
            <div class="row" style="justify-content: center;min-height: 32px;" @mouseenter="hovering_title=true" 
            @mouseleave="hovering_title=false">
                <div class="title" v-show="editing_title==false">{{ detail.title }}</div>
                <input type="text" v-model="edited.title" v-show="editing_title" style="font-size: 20px;">
                <div class="row" :style="`margin-left:8px;${hovering_title?'opacity:1':'opacity:0'}`" >
                    <button  class="edit-btn hover-shadow" @click="toggle_title">
                        <img :src="edit" alt="">
                    </button>
                    <div class="row" v-show="editing_title">
                        <button @click="cancel_title_edit" class="edit-btn hover-shadow" style="margin-right: 4px;">
                            <img :src="close" alt="">
                        </button>
                        <button @click="toggle_title" class="edit-btn hover-shadow">
                            <img :src="save" alt="">
                        </button>
                    </div>
                </div>
            </div>
            <div @mouseenter="hvr_desc=true" @mouseleave="hvr_desc=false" class="column" style="margin-top: 16px;">
                <div class="row" style="justify-content: center;">
                    <h3>description</h3>
                    <div :style="`margin-left: 8px;${hvr_desc?'opacity:1':'opacity:0'}`">    
                        <button  v-show="!edit_desc" class="hover-shadow edit-btn" @click="edit_desc=true">
                            <img :src="edit" alt="" v-once>
                        </button>
                        <div class="row" v-show="edit_desc">
                            
                            <button @click="save_desc" class="edit-btn hover-shadow">
                                <img :src="save" alt="">
                            </button>
                            <button @click="cancel_desc_edit" class="edit-btn hover-shadow" style="margin-left: 4px;">
                                <img :src="close" alt="">
                            </button>
                        </div>
                    </div>
                </div>
                <LatexDisplay :content="detail.description" :plaintext="detail.plain_desc" v-if="!edit_desc"></LatexDisplay>
                <LatexInput v-model="edited.description" v-model:is_plain="edited.plain_desc" v-else></LatexInput>
            </div>
            <div class="row" style="margin-bottom: 16px;margin-left: 8px;">
                <span>difficulty</span>
                <div :style="`background-color:${diff_color}`" class="diff-circle"></div>
                <select name="" id="" class="spacer" style="margin-left: 12px;" v-model="detail.difficulty">
                    <option value="easy">easy</option>
                    <option value="medium">medium</option>
                    <option value="hard">hard</option>
                </select>
            </div>
            <div class="row" style="justify-content: center;">
                <span style="font-size: 20px;font-weight: bold;">hints</span>
                <button @click="show_hint=!show_hint" class="no-bg circle hover-shadow" style="margin-left: 8px;">
                    <img :src="show_hint?less:more" alt="">
                </button>
                <button  class="borderless no-bg circle hover-shadow" style="margin-left: 8px;padding: 4px;" 
                @click="edit_hint=!edit_hint" v-show="!edit_hint">
                    <img :src="edit" alt="">
                </button>
                <!--hint bar-->
                <div class="row" v-show="edit_hint" style="margin-left: 4px;">
                    <button @click="save_hint" class="edit-btn hover-shadow">
                        <img :src="save" alt="">
                    </button>
                    <button @click="cancel_hint_edit" class="edit-btn hover-shadow" style="margin-left: 4px;">
                        <img :src="close" alt="">
                    </button>
                </div>
            </div>
            <div v-if="show_hint" style="margin-left: 24px;">
                <ol v-if="!edit_hint">
                    <li v-for="hint in detail.hint" class="hitem">{{ hint }}</li>
                </ol>
                <HintEditor v-else :old_hint="detail.hint" ref="hint-edit"></HintEditor>
            </div>
            <div class="row" style="margin-top: 10px;padding: 8px;">
                <button class="act-btn spacer hover-shadow" style="margin-right: 8px;" 
                @click="router.push('/')">cancel</button>
                <button class="act-btn spacer hover-shadow" @click="save_edit">save</button>
            </div>
        </div>
    </Menu>
</template>