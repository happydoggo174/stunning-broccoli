<script setup>
    import { watch,useTemplateRef,onMounted } from 'vue';
    import { renderToString,render } from "katex";
    import morphdom from 'morphdom';
    import dompurify from "dompurify";
    import { show_dialog } from './notificationdaemon';
    const prop=defineProps({
        content:String,
        plaintext:Boolean,
        mutable:Boolean
    });
    class ce{
        constructor(s){
            this.s=s;
            this.used=1;
        }
    }
    const cfg=Object.create(null);
    Object.assign(cfg,{
        USE_PROFILES:{html:true,mathMl:true,svg:false},//defend against namespace pollution
        FORBID_ATTR:["id"],//prevent dom clobbering
        FORBID_TAGS:["svg","form","dialog"],//prevent phising dialog
        RETURN_DOM_FRAGMENT:true,//prevent mxss
        CUSTOM_ELEMENT_HANDLING:{
            tagNameCheck:n=>n==='cite-src'
        }
    });//defend against prototype pollution
    Object.freeze(cfg);
    /**
     * @type {Map<String,ce>}
     */
    const cache=new Map();
    /**
     * @type {Map<String,ce>}
     */
    const tcache=new Map();
    function render_cached(s){
        const r=cache.get(s);
        if(r!==undefined){
            r.used++;
            return r.s.cloneNode(true);
        }else{
            const out=renderToString(s);
            const res=dompurify.sanitize(out,cfg);
            cache.set(s,new ce(res.cloneNode(true)));
            return res;
        }
    }
    function flush(){
        for(const [k,v] of cache){
            if(!v.used){
                cache.delete(k);
            }else{
                v.used=0;
            }
        }
        for(const [k,v] of tcache){
            if(!v.used){
                tcache.delete(k);
            }else{
                v.used=0;
            }
        }
    }
    function open_url(url){
        const a=document.createElement("a");
        a.href=url;
        a.setAttribute("target","_blank");
        a.click();
    }
    function make_citation(name,url){
        const node=document.createElement("span");
        render(`^{${name.replace(/[^a-zA-Z0-9]/g, '')}}`,node);
        node.setAttribute("data-cite",name);
        node.setAttribute("data-url",url);
        node.addEventListener('click',(e)=>{
            let url;
            try{
                url=new URL(e.currentTarget.getAttribute("data-url"));
            }catch{
                return show_dialog("error",`invalid url ${url.href}`,true);;
            }
            if(url.protocol!="http:" && url.protocol!="https:"){
                return show_dialog("error",`invalid url ${url.href}`,true);
            }
            open_url(url);
        });
        return node;
    }
    dompurify.addHook("afterSanitizeElements",(node)=>{
        if(node.tagName==='CITE-SRC'){
            const div=make_citation(node.getAttribute("src")  ?? "1",node.getAttribute("url"));
            node.innerText='';
            node.appendChild(div);
        }
    });
    function serialize_expression_once(text) {
        let out = "";
        let is_text=true;
        text.split("$").forEach(node=>{
            if(is_text){ 
                if(node.endsWith('\\')){
                    is_text=false;
                }
                out+=node
            }else{
                try{
                    out+=renderToString(node);
                }catch{
                    out+=node;
                }
            }
            is_text=!is_text;
        });
        const res=dompurify.sanitize(out,cfg);
        content_tag.value?.appendChild(res);
    }
    
    function sanitize(text){
        if(text.length<500){return dompurify.sanitize(text,cfg);}
        const r=tcache.get(text);
        if(r===undefined){
            const out=dompurify.sanitize(text,cfg);
            tcache.set(text,new ce(out));
            return out;
        }else{
            r.used++;
            return r.s;
        }
    }
    function serialize_expression(text) {
        if(!prop.mutable){
            return serialize_expression_once(text);
        }
        const out = document.createElement("div");
        let is_text=true;
        text.split("$").forEach(node=>{
            if(is_text){ 
                if(node.endsWith('\\')){
                    is_text=false;
                }
                out.appendChild(sanitize(node,cfg));
            }else{
                try{
                    out.appendChild(render_cached(node));
                }catch{
                    out.appendChild(sanitize(node,cfg));
                }
            }
            is_text=!is_text;
        });
        const c=content_tag.value?.firstChild;
        if(c){
            morphdom(c,out,{
                onBeforeElUpdated:(f,t)=>!f.isEqualNode(t)
            });
        }else{
            content_tag.value.appendChild(out);
        }
        flush();
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
<style>
    cite-src{
        color: green;
    }
    cite-src:hover{
        background-color: rgba(0,128,0,0.3);
    }
</style>
<template>
    <div ref="content" style="word-break: break-all;word-wrap: break-word;padding: 8px;min-height:45px">
    </div>
</template>
