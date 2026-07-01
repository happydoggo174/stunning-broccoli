import { reactive } from "vue";
export const event_bridge=reactive({});
export const output_callback=new Map();
let idx=0;
export function show_dialog(title,msg,is_err=true){
    Object.assign(event_bridge,{"title":title,"msg":msg,"is_err":is_err,"type":"alert"});
}
export function show_custom(widget,data,fn){
    Object.assign(event_bridge,{"type":custom,"object":widget,"data":data,"id":++idx});
    output_callback[idx]=fn;
}
export function push_response(handle,resp){
    output_callback[handle]?.(resp);
    output_callback.delete(handle);
}
export function show_confirm(title,msg,fn){
    Object.assign(event_bridge,{"title":title,"msg":msg,"type":"confirm","id":++idx});
    output_callback[idx]=fn;
}