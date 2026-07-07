<script setup>
    import { serialize_expression } from './tool';
    import { watch,useTemplateRef,onMounted } from 'vue';
    const prop=defineProps({
        content:String,
        plaintext:Boolean
    });
    const content_tag=useTemplateRef("content");
    onMounted(()=>{
        watch(()=>prop.content,c=>{
            if(prop.plaintext===true){
                content_tag.value.innerText=c;
                return;
            }
            try{
                const node=serialize_expression(c,true);
                content_tag.value.innerHTML='';
                content_tag.value.appendChild(node);
            }catch{
                content_tag.value.innerHTML='';
                content_tag.value.innerText=c;
            }
        },{immediate:true});
    });
</script>
<template>
    <div ref="content" style="word-break: break-all;word-wrap: break-word;padding: 8px;"></div>
</template>
