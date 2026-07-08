import { renderToString } from "katex";
import dompurify from "dompurify";
export function parse_percentage(n){
    if(n===null || n===undefined){return undefined;}
    return n.endsWith('%')?parseFloat(n.slice(0,n.length-1))+'%':parseFloat(n);
}
export function serialize_percentage(n){
    if(n==null){return undefined;}
    if(n==""){return 0;}
    return n.endsWith('%')?parseFloat(n.slice(0,n.length-1))/100:parseFloat(n);
}
export function serialize_display_row(output){
    return output.map(n=>{
        if(n.indexOf('|')==-1){
            return n;
        }
        let pr=n.split('|').map(n=>parse_percentage(n));
        if(pr.length==2 || (pr.length==3 && !pr[0])){
            if(pr.length==3){
                pr=pr.slice(1,pr.length);
            }
            return `<div class="column" style="align-items:center">
                <span style="border-bottom:1px solid black">${pr[0]}</span>
                <span>${pr[1]}</span>
            </div>`;
        }
        return `<div class="row" style="align-items: center;">
            <span style="margin-right: 4px;">${pr[0]}</span>
            <div class="column" style="align-items:center"><span style="border-bottom:1px solid black">${pr[1]}</span>
                <span>${pr[2]}</span>
            </div>
        </div>`;
    });
}
export function serialize_display(output){
    return output.map(row=>serialize_display_row(row));
}
export function serialize_expression(text,return_dom=false) {
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
        RETURN_DOM_FRAGMENT:return_dom//prevent mxss
    });//defend against prototype pollution
    return dompurify.sanitize(out,cfg);
}