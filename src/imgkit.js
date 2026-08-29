import dompurify from "dompurify";
export function list_img(s){
    const img=[]
    dompurify.addHook("afterSanitizeElements",(node)=>{
        if(node.nodeName=="IMG"){
            img.push(node.getAttribute("src"));
        }
    });
    dompurify.sanitize(s);
    dompurify.removeAllHooks();
    return img;
}