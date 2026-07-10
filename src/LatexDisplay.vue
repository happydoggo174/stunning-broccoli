<script setup>
    import { watch,useTemplateRef,onMounted } from 'vue';
    import { renderToString } from "katex";
    import dompurify from "dompurify";
    const prop=defineProps({
        content:String,
        plaintext:Boolean
    });
    
    function serialize_expression(text) {
        let out = "";
        for(let i=0;i<text.length;i++){
            if(text[i]=='$' && (!i || text[i-1]!='\\')){
                let found=false;
                let j=i+1;
                for(;j<text.length;j++){
                    if(text[j]=='$' && (!j || text[j-1]!='\\')){
                        found=true;
                        out+=renderToString(text.slice(i+1,j));
                        break;
                    }
                }
                if(!found){
                    out+=text.slice(i,text.length);
                    break;
                }
                i=j;
            }else{
                if(text[i]=='\\' && i<text.length-1 && text[i+1]=='$'){
                    out+='$';
                    i++;
                }else{
                    out+=text[i];
                }
            }
        }
        const cfg=Object.create(null);
        Object.assign(cfg,{
            USE_PROFILES:{html:true,mathMl:true,svg:false},//defend against namespace pollution
            FORBID_ATTR:["id"],//prevent dom clobbering
            FORBID_TAGS:["svg","form","dialog"],//prevent phising dialog
            RETURN_DOM_FRAGMENT:true//prevent mxss
        });//defend against prototype pollution
        return dompurify.sanitize(out,cfg);
    }
    const content_tag=useTemplateRef("content");
    onMounted(()=>{
        watch(()=>prop.content,c=>{
            if(prop.plaintext===true){
                content_tag.value.innerText=c;
                return;
            }
            content_tag.value.innerHTML='';
            try{
                const node=serialize_expression(c,true);
                content_tag.value.appendChild(node);
            }catch{
                content_tag.value.innerText=c;
            }
        },{immediate:true});
    });
</script>
<template>
    <div ref="content" style="word-break: break-all;word-wrap: break-word;padding: 8px;"></div>
</template>
