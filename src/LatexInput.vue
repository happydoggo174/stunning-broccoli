<script setup>
    import LatexDisplay from './LatexDisplay.vue';
    import {ref,watch} from "vue";
    const model=defineModel();
    const input_mode=ref("plain text");
    const mode=defineModel("is_plain");
    watch(input_mode,i=>mode.value=i=='plain text');
    function handle_input(e){
        if(input_mode.value=='latex'){
            model.value=e.target.value;
        }else{
            model.value=e.target.value.replace('$','\\$');
        }
        const field=e.target;
        field.style.height="auto";
        field.style.height=field.scrollHeight+'px';
    }
    const prop=defineProps({
        placeholder:String,
    });
    const font_size=ref(15);
</script>
<style scoped>
    .latex-preview{
        background-color: white;
        border-radius: 6px;
        margin-top: 8px;
        color: black;
    }
</style>
<template>
    <div class="column" style="color: black;">
        <div class="row" style="margin-bottom: 16px;">
            <span>input mode</span>
            <select v-model="input_mode" style="margin-left: 8px;">
                <option value="plain text">plain text</option>
                <option value="latex">latex</option>
            </select>
            <div v-if="input_mode=='latex'" style="color: black;margin-left: 8px;">
            tip: use $ latex expression $ to use latex,\$ to use a literal $</div>
        </div>
        <textarea :placeholder="placeholder" @input="handle_input" 
        style="font-size: 15px;scrollbar-width: none;resize: none;" ></textarea>
        <div class="column" v-if="input_mode=='latex'" style="color: black;">
            <div class="row" style="justify-content: space-between;">
                <span style="display: block;text-align: center;">preview</span>
                <div class="row">
                    <span style="margin-right: 8px;">font size</span>
                    <input type="range" v-model="font_size" min="15" max="50">
                </div>
            </div>
            <LatexDisplay :content="model" class="latex-preview" :style="`font-size:${font_size}px`"></LatexDisplay>
        </div>
    </div>
</template>