import { reactive } from "vue";
export const event_bridge=reactive({});
export function show_dialog(title,msg,is_err=true){
    Object.assign(event_bridge,{"title":title,"msg":msg,"is_err":is_err,"type":"alert"});
}
export function show_custom(widget,data){
    Object.assign(event_bridge,{"type":custom,"object":widget,"data":data});
}