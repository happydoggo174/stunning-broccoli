<script setup>
    import { watch,useTemplateRef,onMounted } from 'vue';
    import { renderToString } from "katex";
    import morphdom from 'morphdom';
    import dompurify from "dompurify";
    const prop=defineProps({
        content:String,
        plaintext:Boolean,
        mutable:Boolean
    });
    class ce{
        constructor(s){
            this.s=s;
            this.used=true;
        }
    }
    /**
     * @type {Map<String,ce>}
     */
    const cache=new Map();
    function render(s){
        if(!prop.mutable){return renderToString(s);}
        const r=cache.get(s);
        if(r!==undefined){
            r.used=true;
            return r.s;
        }else{
            const out=renderToString(s);
            cache.set(s,new ce(out));
            return out;
        }
    }
    function flush(){
        if(!prop.mutable){return;}
        for(const [k,v] of cache){
            if(!v.used){
                cache.delete(k);
            }else{
                v.used=false;
            }
        }
    }
    function serialize_expression(text) {
        let out = "";
        let is_text=true;
        text.split("$").forEach(node=>{
            if(is_text){ 
                if(node.endsWith('\\')){
                    is_text=false;
                }
                out+=node;
            }else{
                try{
                    out+=render(node);
                }catch{
                    out+=node;
                }
            }
            is_text=!is_text;
        });
        const cfg=Object.create(null);
        Object.assign(cfg,{
            USE_PROFILES:{html:true,mathMl:true,svg:false},//defend against namespace pollution
            FORBID_ATTR:["id"],//prevent dom clobbering
            FORBID_TAGS:["svg","form","dialog"],//prevent phising dialog
            RETURN_DOM_FRAGMENT:true//prevent mxss
        });//defend against prototype pollution
        const s=dompurify.sanitize(out,cfg);
        const c=content_tag.value?.firstChild;
        if(c){
            morphdom(c,s,{
                onBeforeElUpdated:(f,t)=>!f.isEqualNode(t)
            });
        }else{
            content_tag.value.appendChild(s);
        }
        flush();
        return s;
    }
    const content_tag=useTemplateRef("content");
    onMounted(()=>{
        watch(()=>prop.content,c=>{
            if(c===undefined || c===null){
                return;
            }
            if(prop.plaintext===true){
                content_tag.value.innerText=c;
                return;
            }
            serialize_expression(c);
        },{immediate:true});
    });
</script>
<template>
    <div ref="content" style="word-break: break-all;word-wrap: break-word;padding: 8px;min-height:45px">
    </div>
</template>
